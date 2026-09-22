# Iconiq Creatives — Creative Agency Site

Single-page site for **Iconiq Creatives**, a creative agency covering Website Design,
Social Media Management, Graphic Design, and Video Editing. Built with the same dark,
electric aesthetic and interactions as the Joshua Lescano portfolio (hover + scroll
reveals, story-ring social cards, growth charts), rebranded and trimmed for the agency.

## Sections
1. **Home** — animated gradient-mesh hero, rotating service subtitle
2. **Website Design** — browser-mockup cards linking to live sites (new tab)
3. **Social Media Management** — story-ring brand cards + growth charts
4. **Graphic Design** — masonry gallery with lightbox
5. **Video Editing** — featured long-form carousel + short-form reels
6. **Footer** — contact + socials

## Editing content
All dynamic content lives in `/data`. Joshua only needs to edit these files:
- `data/websites.json` — Website Design cards. Each entry: `name`, `category`,
  `url` (full `https://`, opens in a new tab), optional `thumb` image, and `accent`
  colour. If a `thumb` image is missing, the card shows a branded gradient mockup.
  Put screenshots in `assets/images/websites/`.
- `data/projects.json` — Social Media brands + follower growth charts.
- `data/design.json` — Graphic Design gallery folders/images.
- `data/videos.json` — Video Editing entries.

## Structure
- `index.html` — markup
- `styles/` — one CSS file per section
- `scripts/` — one JS file per major function
- `assets/` — images and video thumbnails

## Run locally
```bash
python3 -m http.server 8777
```
Then open http://localhost:8777

## Brand colors
- Black base `#000000`
- Electric Blue `#41BDFE`
- Electric Pink `#E111FB`
- Gradient `#41BDFE → #E111FB`
- White `#FFFFFF`
