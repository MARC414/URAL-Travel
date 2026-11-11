#!/usr/bin/env python3
"""Whole-site internal-link audit over dist/ (rendered static HTML).

Run after `npm run build`:
    python3 docs/02-content/audit-internal-links.py

Checks (each prints PASS/FAIL; exit code = number of FAILs):
  BROKEN     internal hrefs that resolve to no dist/*.html file
  ORPHANS    real pages with 0 editorial inbound links (excludes verification files)
  TWIN       pages whose locale twin is not linked in body HTML
  G4         blog posts: >=4 internal links, >=2 blog->blog, >=1 hub/money, >=2 posts linking in
  HUB-CHILD  hub pages linking every child page (per locale)
  OWN-HUB    child pages linking back to their own section hub
  DIRECTORY  EN site-directory (/sitemap) coverage of EN pages; BN directory of BN pages
  SITEMAP    public/sitemap.xml vs dist/sitemap.xml (scheduled posts are dist-only BY DESIGN)

Static HTML contains body/editorial links only (site chrome hydrates client-side),
so inbound counts are editorial by construction.
"""
import os, re, sys, io, html as H
from urllib.parse import urlparse, unquote
from collections import defaultdict

DIST = os.path.join(os.path.dirname(__file__), "..", "..", "dist")
DIST = os.path.abspath(DIST)
HOST = "uraltravel.co.uk"

HUBS = {"/flights", "/hotels", "/costs", "/visa", "/destinations", "/umrah",
        "/blog", "/tools", "/visa-free-countries", "/banking", "/attractions",
        "/experiences", "/pre-departure", "/sitemap"}
# Non-content verification files: their orphan status is expected.
VERIFY_OK = re.compile(r"^/(404|google[a-z0-9]*|yandex_[a-z0-9]*|travelpayouts-wl|sitemap\.html)$")

pages = set()
for root, _, files in os.walk(DIST):
    for f in files:
        if f.endswith(".html"):
            rel = os.path.relpath(os.path.join(root, f), DIST)
            r = "/" + rel[:-5]
            if r.endswith("/index"):
                r = r[:-6] or "/"
            pages.add(r)
pages.add("/")

def resolve(src, href):
    href = H.unescape(href).strip()
    if not href or href.startswith(("#", "mailto:", "tel:", "javascript:", "data:", "//")):
        return None
    if href.startswith("http"):
        u = urlparse(href)
        if u.netloc and u.netloc.replace("www.", "") != HOST:
            return None
        path = u.path
    else:
        path = href
    path = unquote(path.split("#")[0].split("?")[0])
    if not path or path == "/":
        return "/"
    if not path.startswith("/"):
        path = src.rsplit("/", 1)[0] + "/" + path
    if "." in path.rsplit("/", 1)[-1] and not path.endswith(".html"):
        return None
    if path.endswith(".html"):
        path = path[:-5]
    return path.rstrip("/") or "/"

anchor_re = re.compile(r'<a\s[^>]*?href="([^"]+)"[^>]*>(.*?)</a>', re.S)
tag_re = re.compile(r"<[^>]+>")
graph = {}
for route in sorted(pages):
    f = os.path.join(DIST, "index.html") if route == "/" else os.path.join(DIST, route.lstrip("/")) + ".html"
    if not os.path.exists(f):
        continue
    h = io.open(f, encoding="utf-8").read()
    graph[route] = [(t, " ".join(tag_re.sub(" ", tm).split()))
                    for hm, tm in anchor_re.findall(h)
                    if (t := resolve(route, hm))]

inbound = defaultdict(set)
for src, links in graph.items():
    for tgt, _ in set(links):
        if tgt != src:
            inbound[tgt].add(src)

posts_en = {r for r in pages if r.startswith("/blog/") and r != "/blog"}
posts_bn = {r for r in pages if r.startswith("/bn/blog/")}
posts = posts_en | posts_bn
def slug(r): return r.rsplit("/", 1)[-1]
def strip_bn(r): return r[3:] if r.startswith("/bn/") else r
def is_hub(t): return strip_bn(t) in HUBS
def is_money(t):
    t = strip_bn(t)
    return t.startswith(("/costs/", "/visa/", "/flights/", "/hotels/", "/tools/", "/attractions/"))

fails = defaultdict(list)

# BROKEN
for src, links in graph.items():
    for tgt, _ in links:
        if tgt not in pages:
            fails["BROKEN"].append(f"{src} -> {tgt}")

# ORPHANS
for r in sorted(pages):
    if r == "/" or VERIFY_OK.match(r):
        continue
    if not inbound.get(r):
        fails["ORPHANS"].append(r)

# TWIN
for r in sorted(pages):
    twin = ("/bn" + r) if not r.startswith("/bn/") else r[3:]
    if twin in pages and twin not in {t for t, _ in graph.get(r, [])}:
        fails["TWIN"].append(r)

# G4
for p in sorted(posts):
    links = graph.get(p, [])
    tg = {t for t, _ in links if t != p}
    b2b = {t for t in tg if t in posts}
    hm = {t for t in tg if is_hub(t) or is_money(t)}
    inb = {s for s in inbound.get(p, set()) if s in posts and slug(s) != slug(p)}
    bad = []
    if len(tg) < 4: bad.append(f"out={len(tg)}")
    if len(b2b) < 2: bad.append(f"b2b={len(b2b)}")
    if len(hm) < 1:  bad.append("hub/money=0")
    if len(inb) < 2: bad.append(f"inbound={len(inb)}<-{sorted(inb)}")
    if bad:
        fails["G4"].append(f"{p}: " + "; ".join(bad))

# HUB-CHILD
children = {
    "/flights": [r for r in pages if r.startswith("/flights/")],
    "/visa": [r for r in pages if r.startswith("/visa/")],
    "/costs": [r for r in pages if r.startswith("/costs/")],
    "/hotels": [r for r in pages if r.startswith("/hotels/")],
    "/destinations": [r for r in pages if r.startswith("/destinations/")],
    "/attractions": [r for r in pages if r.startswith("/attractions/") and ":" in r],
    "/tools": [r for r in pages if r.startswith("/tools/")],
    "/blog": [r for r in pages if r.startswith("/blog/") and r != "/blog"],
}
for hub, kids in children.items():
    for loc in ("en", "bn"):
        hp = hub if loc == "en" else "/bn" + hub
        hl = {t for t, _ in graph.get(hp, [])}
        for k in kids:
            if k.startswith("/bn/"):
                continue
            want = k if loc == "en" else "/bn" + k
            alt = "/bn" + k if loc == "en" else k
            if want not in hl and alt not in hl:
                fails["HUB-CHILD"].append(f"{hp} missing {want}")

# OWN-HUB backlinks (sections only — posts are governed by G4, not own-hub)
for hub, kids in children.items():
    if hub == "/blog":
        continue
    for k in kids:
        for v in (k, "/bn" + k):
            if v in graph and hub not in {t for t, _ in graph[v]} and ("/bn" + hub) not in {t for t, _ in graph[v]}:
                fails["OWN-HUB"].append(v)

# DIRECTORY coverage (raw href comparison)
def raw_anchors(path):
    if not os.path.exists(path):
        return set()
    s = io.open(path, encoding="utf-8").read()
    return set(re.findall(r'<a\s[^>]*?href="([^"]+)"', s))

en_dir = {a.split("#")[0] for a in raw_anchors(os.path.join(DIST, "sitemap.html"))}
for p in sorted(pages):
    if not p.startswith("/bn/") and p in graph and p not in en_dir \
            and not VERIFY_OK.match(p) and p != "/sitemap":
        fails["DIRECTORY"].append("EN dir missing " + p)
bn_dir = {a.split("#")[0] for a in raw_anchors(os.path.join(DIST, "bn", "sitemap.html"))}
for p in sorted(pages):
    if p.startswith("/bn/") and p in graph and p not in bn_dir and p != "/bn/sitemap" \
            and not p.startswith(("/bn/404", "/bn/google", "/bn/yandex", "/bn/travelpayouts")):
        fails["DIRECTORY"].append("BN dir missing " + p)

# SITEMAP (informational: scheduled posts are dist-only by design)
import xml.etree.ElementTree as ET
try:
    dist_sm = {loc.text.replace("https://uraltravel.co.uk", "") or "/" for loc in ET.parse(os.path.join(DIST, "sitemap.xml")).getroot().iter("{http://www.sitemaps.org/schemas/sitemap/0.9}loc")}
    pub_sm = {loc.text.replace("https://uraltravel.co.uk", "") or "/" for loc in ET.parse(os.path.abspath(os.path.join(DIST, "..", "public", "sitemap.xml"))).getroot().iter("{http://www.sitemaps.org/schemas/sitemap/0.9}loc")}
    only_dist = dist_sm - pub_sm
    # every dist URL must exist as a file; public must be a subset of dist
    for u in pub_sm - dist_sm:
        fails["SITEMAP"].append(f"public-only URL (stale snapshot?): {u}")
    if only_dist:
        print(f"  INFO SITEMAP: {len(only_dist)} URLs dist-only (scheduled-posts design — expect exactly 24 = 12 posts x 2 locales)")
except Exception as e:  # noqa
    fails["SITEMAP"].append(f"parse error: {e}")

total_fails = 0
print(f"pages={len(pages)} posts={len(posts)} edges={sum(len(v) for v in graph.values())}")
for check in ["BROKEN", "ORPHANS", "TWIN", "G4", "HUB-CHILD", "OWN-HUB", "DIRECTORY", "SITEMAP"]:
    items = fails.get(check, [])
    total_fails += len(items)
    print(f"{check}: {'PASS' if not items else f'FAIL x{len(items)}'}")
    for i in items[:60]:
        print("   ", i)
sys.exit(min(total_fails, 120))
