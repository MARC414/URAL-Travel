"""HarfBuzz + FreeType text rendering to PIL masks.

Pillow here is built without libraqm, so Bangla would render with broken
conjuncts and misplaced vowel signs. This module shapes with HarfBuzz and
rasterises with FreeType directly, including 1/64px sub-pixel positioning so
the slow pans don't cause the text layer to shimmer.
"""
import freetype
import numpy as np
import uharfbuzz as hb
from PIL import Image


class ShapedFont:
    def __init__(self, path: str):
        self.path = path
        with open(path, "rb") as f:
            data = f.read()
        self.hb_face = hb.Face(hb.Blob(data))
        self.hb_font = hb.Font(self.hb_face)
        self.upem = self.hb_face.upem
        self.ft = freetype.Face(path)

    def shape(self, text: str, size: float, tracking: float = 0.0):
        """Return (glyph_records, advance_width) in pixels at `size`."""
        self.hb_font.scale = (int(size * 64), int(size * 64))
        buf = hb.Buffer()
        buf.add_str(text)
        buf.guess_segment_properties()
        hb.shape(self.hb_font, buf, {"kern": True, "liga": True})
        return buf.glyph_infos, buf.glyph_positions

    def measure(self, text: str, size: float, tracking: float = 0.0) -> float:
        infos, poss = self.shape(text, size, tracking)
        return sum(p.x_advance for p in poss) / 64.0 + tracking * max(0, len(text) - 1)

    def draw(self, text: str, size: float, fill=(255, 255, 255, 255),
             tracking: float = 0.0, ss: int = 3):
        """Render text to an RGBA image tightly cropped to its ink.

        Rasterises at `ss`x and downsamples; the supersampling gives clean
        edges and makes sub-pixel glyph placement exact without fiddling with
        FreeType transforms.
        """
        infos, poss = self.shape(text, size, tracking)
        self.ft.set_char_size(int(size * 64 * ss))

        pen_x = 0.0
        baseline = size * 1.15
        glyphs = []
        for info, pos in zip(infos, poss):
            gx = pen_x + pos.x_offset / 64.0
            gy = baseline - pos.y_offset / 64.0
            glyphs.append((info.codepoint, gx, gy))
            pen_x += pos.x_advance / 64.0 + tracking

        width = int(pen_x * ss) + int(size * 0.7 * ss) + 4
        height = int(size * 2.0 * ss) + 4
        mask = Image.new("L", (width, height), 0)

        for gid, gx, gy in glyphs:
            self.ft.load_glyph(gid, freetype.FT_LOAD_RENDER | freetype.FT_LOAD_NO_HINTING)
            slot = self.ft.glyph
            bmp = slot.bitmap
            if bmp.width == 0 or bmp.rows == 0:
                continue
            arr = np.array(bmp.buffer, dtype=np.uint8).reshape(bmp.rows, bmp.pitch)
            arr = arr[:, : bmp.width]
            x = int(round(gx * ss)) + slot.bitmap_left
            y = int(round(gy * ss)) - slot.bitmap_top
            if x + bmp.width < 0 or y + bmp.rows < 0 or x > width or y > height:
                continue
            tile = Image.fromarray(arr, "L")
            crop = mask.crop((x, y, x + bmp.width, y + bmp.rows))
            mask.paste(Image.composite(tile, crop, tile), (x, y))

        mask = mask.resize((width // ss, height // ss), Image.LANCZOS)
        bbox = mask.getbbox()
        if bbox is None:
            return Image.new("RGBA", (1, 1), (0, 0, 0, 0))
        out = Image.new("RGBA", (bbox[2] - bbox[0], bbox[3] - bbox[1]), fill[:3] + (0,))
        out.putalpha(mask.crop(bbox))
        if len(fill) == 4 and fill[3] != 255:
            alpha = out.getchannel("A").point(lambda v: v * fill[3] // 255)
            out.putalpha(alpha)
        return out
