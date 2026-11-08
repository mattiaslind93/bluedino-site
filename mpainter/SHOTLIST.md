# Image shot list — bluedino.se/mpainter

**Three of the five pictures are now clean captures** — the spider shots carry feature 01 and
feature 02, and the UV shot carries the texture sets card. They came from the screenshots added
in `cursor/mpainter-preview-3be1`.

**Two are still frames pulled out of the launch demo video**
(`mPainter/docs/marketing/2026-11-06-mpainter-launch.mp4`): the materials shot and the bake
shot, plus the video poster. They are real screenshots, so the page is honest today — but they
are video-compressed and framed for video. Those two, and a beauty render, are what is left.

**General rules for every capture**

- Capture at **2× the display size** listed below, then save as JPEG quality 82–86 (or PNG if it
  lands under ~400 KB). Keep the file name exactly as listed so nothing in the HTML has to change.
- **Dark UI theme**, default Turquoise Dark. No OS menu bar, no dock, no desktop wallpaper.
- Hide the console panel unless the shot is about it. An idle console full of warnings reads as
  "unfinished" to a buyer.
- Use a model that looks like production work. The hydrant is good. A hero prop, a weapon or a
  vehicle part would be better.
- Leave the viewport background as it is — the flat grey reads cleanly against the page.

---

## 1. `assets/demo-poster.jpg` — the hero video poster

| | |
|---|---|
| **Where** | First thing under the headline. The single most important image on the page. |
| **Size** | **1920 × 1080** — must match the video frame *exactly*, watermark bar included, or the picture jumps when playback starts. |
| **Now** | Frame at 1:13 — the finished red hydrant with the full layer stack. |

**What it needs to show:** the finished model, big in the viewport, with a deep layer stack
visible on the right. It is a still of the video, so it has to be a frame *from* the video.
If you re-record the demo, grab the poster from the new file with:

```bash
ffmpeg -ss 73 -i launch.mp4 -frames:v 1 -vf scale=1600:-2 -q:v 3 demo-poster.jpg
```

---

## 2. `assets/shots/stack.jpg` — "Every decision stays editable" — **done**

| | |
|---|---|
| **Where** | Feature 01, image on the right. |
| **Size** | 2000 × 1066 |
| **Now** | The spider on the rusted blade, with brushed iron and coarse rust folders open. |

This one works: folders, mixed blend modes, opacities that are not all 100, and a model that
looks like finished work. Nothing to do unless you want a different subject.

---

## 3. `assets/shots/wear.jpg` — "Let the model do the aging" — **good enough**

| | |
|---|---|
| **Where** | Feature 02, image on the left. |
| **Size** | 2000 × 1066 |
| **Now** | The spider close up, grunge edge wear and rust spot generators stacked in the list. |

The wear on the model is clearly generated rather than hand-painted, which is the argument.

**Would be better:** a **before / after pair** at the same camera angle — clean material on the
left, generators on top on the right. Save them as `masks-before.jpg` / `masks-after.jpg` at
1200 × 1272 each and I will build the split into the page.

---

## 3b. `assets/shots/uv-sets.jpg` — "Texture sets, UDIMs and a UV view" — **done**

| | |
|---|---|
| **Where** | Wide card in the "And there's more" grid. |
| **Size** | 1700 × 1054 |
| **Now** | The character split between the 3D viewport and the UV view. |

One thing to decide: the model in this shot — and in `2026-11-06-viewport-character-*.png` — is
a recognisable film character. It is fine as a work-in-progress screenshot; it is a different
thing on a page selling a product. If the sculpt is not yours to show, swap it for the spider or
anything of your own and tell me which file to use.

---

## 4. `assets/shots/materials.jpg` — "Your Blender material, now a brush"

| | |
|---|---|
| **Where** | Feature 03, image on the right. |
| **Size** | 2400 × 1272 |
| **Now** | Frame at 0:45 — material library beside a grey hydrant. **Weakest image on the page.** |

**The problem:** the current frame shows the stock material library. The section is about *your
own Blender node material* walking in, and the picture does not say that at all.

**What I actually want:** a two-app shot, or two shots I can place side by side —

1. Blender with a node material open in the Shader Editor (a graph with enough nodes to look
   like real work, and the preview sphere showing the result).
2. The same material in mPainter, sitting in Material presets, applied to the model.

Either compose it yourself as one 2400 × 1272 image (Blender left, mPainter right, matched
heights), or give me two separate 1200 × 1272 captures named `material-blender.jpg` and
`material-mpainter.jpg` and I will build the pair.

---

## 5. `assets/shots/bake.jpg` — "Bake your mesh maps in the app"

| | |
|---|---|
| **Where** | Wide card at the top of the "And there's more" grid. |
| **Size** | 2400 × 1350 (4:3-ish crop, displays ~720 px wide) |
| **Now** | Frame at 0:11 — the bake dialog at 7/7 complete. |

**What it needs:** the baking dialog is the right subject, but it is small and lost in grey
viewport. Capture it zoomed in — the dialog filling roughly the middle third, the seven map names
legible, the Mesh Maps slots on the right showing as assigned rather than "Not assigned".

**Better still:** a grid of the baked maps themselves — curvature, AO, thickness, world-space
normal as four tiles. That is a picture that says "this is a real baker" to anyone who knows what
they are looking at.

---

## 6. Optional but high value — a beauty render

There is no picture on the page of **finished work that is not a screenshot of the app**. One
great render of an asset textured in mPainter, at 2400 × 1200 or wider, would let me add a
full-bleed band between sections — which is the single most Apple-product-page thing the layout
is missing.

If you have two or three, even better: I would build a small gallery strip with the artist
credited under each.

---

## 7. `assets/cover-1280x720.png` — the share card

Already fine, and already in use as the Open Graph image — this is what shows up when the link is
pasted into Discord, X, Mastodon, Slack or Blender Artists. Worth checking it still reads at
small size. If you want it to carry the new headline, the text to use is:

> **3D texturing that already feels like home**
> Layer-based 3D texture painting · Built on Blender · Windows, macOS, Linux

---

## Unused files left in place

`assets/placeholders/screenshot-layer-stack.png`, `assets/placeholders/video-demo-poster.png`,
`assets/preview-dark.png` and `assets/wordmark.png` are not linked from the page any more — the
header uses the app icon. `assets/shots/layers.jpg`, `assets/shots/masks.jpg` are the video
frames the spider shots replaced. The five full-size `2026-11-*.png` captures (about 17 MB
together) are kept as the originals the web-sized JPEGs were made from. Nothing has been
deleted; remove them yourself whenever you are sure.

`assets/shots/paint.jpg` is a spare frame (0:26 — flat red fill layer with the colour ramp open).
Nothing links to it; it is there in case you want a "painting" image in one of the cards.
