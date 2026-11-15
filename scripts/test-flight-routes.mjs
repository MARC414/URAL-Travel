// Real lazy-loaded App in a DOM emulator; visual layout needs a real browser.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { Window } from 'happy-dom';
import { createServer } from 'vite';
const win = new Window({ url: 'http://localhost:3000/flights' });
for (const name of ['window','document','location','history','HTMLElement','Element','Node','Event','CustomEvent','MutationObserver','localStorage','sessionStorage']) globalThis[name] = name === 'window' ? win : win[name];
win.scrollTo = () => {};
win.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
globalThis.requestAnimationFrame = (cb) => setTimeout(cb, 1);
globalThis.cancelAnimationFrame = clearTimeout;
const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
const React = await import('react');
const { createRoot } = await import('react-dom/client');
const { default: App } = await vite.ssrLoadModule('/src/App.tsx');
const { FLIGHT_ROUTES } = await vite.ssrLoadModule('/src/data/flightRoutes.ts');
const { getLocalizedFlights } = await vite.ssrLoadModule('/src/data/bengaliContent.ts');
// Independent expectations: never allow a new route to inherit Kathmandu defaults.
const expected = {
  'dhaka-kathmandu': ['DAC','KTM','/visa/nepal-visa','/hotels/kathmandu-hotels'],
  'ktm-dhaka': ['KTM','DAC','/visa','/hotels'],
  'dhaka-bangkok': ['DAC','BKK','/visa/thailand-visa','/hotels/bangkok-hotels'],
  'dhaka-kuala-lumpur': ['DAC','KUL','/visa/malaysia-visa','/hotels/kuala-lumpur-hotels'],
  'dhaka-dubai': ['DAC','DXB','/visa/dubai-visa','/hotels/dubai-hotels'],
  'dhaka-singapore': ['DAC','SIN','/visa/singapore-visa','/hotels/singapore-hotels'],
  'dhaka-maldives': ['DAC','MLE','/visa/maldives-visa','/hotels/maldives-hotels'],
  'dhaka-los-angeles': ['DAC','LAX','/visa','/hotels'],
  'dhaka-madinah': ['DAC','MED','/visa/saudi-arabia-visa','/blog/where-to-stay-madinah-markazia-gate-guide'],
};
assert.deepEqual(Object.keys(FLIGHT_ROUTES).sort(), Object.keys(expected).sort());
assert.deepEqual(getLocalizedFlights('en').map(r=>r.id).sort(), Object.keys(expected).sort());
for (const [id, values] of Object.entries(expected)) {
  const route = FLIGHT_ROUTES[id];
  assert.deepEqual([route.origin,route.destination,route.visaPath,route.hotelPath], values, `${id} mapping`);
  for (const target of values.slice(2)) for (const prefix of ['', 'bn/']) assert.ok(fs.existsSync(`dist/${prefix}${target.slice(1)}.html`), `${id}: ${prefix}${target} must exist`);
}
const container = document.createElement('div'); document.body.append(container);
const root = createRoot(container); root.render(React.createElement(App));
async function waitFor(predicate, label) { for (let i=0;i<240;i++) { if (predicate()) return; await new Promise(r=>setTimeout(r,50)); } throw new Error(`Timeout: ${label}`); }
function faqNodes(node) { return node && typeof node === 'object' ? [...(node['@type']==='FAQPage' ? [node] : []), ...Object.values(node).flatMap(faqNodes)] : []; }
function faq(doc) { return [...doc.querySelectorAll('script[type="application/ld+json"]')].flatMap(el => faqNodes(JSON.parse(el.textContent))); }
try {
  for (const lang of ['en','bn']) {
    const prefix = lang === 'bn' ? '/bn' : '';
    for (const route of getLocalizedFlights(lang)) {
      const info = FLIGHT_ROUTES[route.id]; assert.ok(info, `${route.id} must have explicit mapping`);
      history.pushState({}, '', `${prefix}/flights/${route.id}`); win.dispatchEvent(new win.PopStateEvent('popstate'));
      await waitFor(() => document.querySelector(`#lnk-view-visa-from-flight-${route.id}`)?.getAttribute('href') === `${prefix}${info.visaPath}` && document.querySelector('main')?.textContent.includes(route.faqs[0].question), `${lang}/${route.id} route and locale`);
      await waitFor(() => {
        const inputs = document.querySelectorAll('#flight-search input[role="combobox"]');
        return inputs.length === 2 && inputs[0].value.includes(`(${info.origin})`) && inputs[1].value.includes(`(${info.destination})`);
      }, `${lang}/${route.id} search defaults`);
      assert.equal(document.querySelector(`#lnk-view-visa-from-flight-${route.id}`).getAttribute('href'), `${prefix}${info.visaPath}`);
      assert.equal(document.querySelector(`#lnk-view-hotel-from-flight-${route.id}`).getAttribute('href'), `${prefix}${info.hotelPath}`);
      await waitFor(() => {
        const href = document.querySelector('#flight-search [data-testid="search-flights-submit-btn"]')?.href;
        return href && new URL(href).searchParams.get('currency') === (info.origin === 'DAC' ? 'BDT' : 'USD');
      }, `${lang}/${route.id} origin currency`);
      const link = document.querySelector('#flight-search [data-testid="search-flights-submit-btn"]');
      assert.ok(link?.href, `${route.id} hosted handoff`);
      const url = new URL(link.href);
      assert.equal(url.origin, 'https://flights.uraltravel.co.uk');
      assert.match(url.searchParams.get('flightSearch'), new RegExp(`^${info.origin}\\d{4}${info.destination}`));
      assert.equal(url.searchParams.get('currency'), info.origin === 'DAC' ? 'BDT' : 'USD');
      assert.equal(url.searchParams.get('locale'), lang);
      for (const item of route.faqs) assert.ok(document.querySelector('main').textContent.includes(item.question), `${lang}/${route.id} visible FAQ`);
      await waitFor(() => faq(document).some(f => f.mainEntity?.[0]?.name === route.faqs[0].question), `${lang}/${route.id} live FAQ schema`);
      const html = fs.readFileSync(`dist/${prefix ? 'bn/' : ''}flights/${route.id}.html`, 'utf8');
      const saved = new Window(); saved.document.write(html);
      assert.doesNotMatch(html, /১ ঘণ্টা ২৫ মিনিট|this is not Visa on Arrival|৪ থেকে ৮ সপ্তাহ আগে বুকিং করাই সেরা/i, `${lang}/${route.id} stale claims`);
      assert.ok(saved.document.querySelector('h1')?.textContent, `${lang}/${route.id} heading`);
      assert.equal(saved.document.querySelector('link[rel="canonical"]').href, `https://uraltravel.co.uk${prefix}/flights/${route.id}`);
      assert.ok(saved.document.querySelector(`a[href="${prefix}${info.visaPath}"]`), `saved visa ${lang}/${route.id}`);
      assert.ok(saved.document.querySelector(`a[href="${prefix}${info.hotelPath}"]`), `saved hotel ${lang}/${route.id}`);
      assert.deepEqual(faq(saved.document)[0].mainEntity.map(q=>[q.name,q.acceptedAnswer.text]), route.faqs.map(q=>[q.question,q.answer]));
      saved.happyDOM.abort();
    }
  }
  console.log('All nine flight routes: EN/BN search defaults, hosted handoff, currency, localized links and saved/live FAQ schema passed.');
} finally { root.unmount(); await new Promise(r=>setTimeout(r,1000)); await vite.close(); win.happyDOM.abort(); }
