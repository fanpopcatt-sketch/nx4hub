# NX4 Hub — website

Static storefront for NX4 Hub. No framework, no build step: plain HTML, CSS and JS.

## Structure

```
index.html          the site
404.html            custom not-found page
_headers            security + cache headers (Cloudflare Pages / Netlify)
robots.txt
sitemap.xml
assets/css/style.css
assets/js/main.js
assets/img/logo.svg · favicon.svg
```

## Editing

Everything lives in `index.html`: prices, payment methods, FAQ, Discord invite.

| What | Where |
|---|---|
| Prices | `.price-card` blocks, `.price-tag` and `.tier` values |
| Discord invite | search `discord.gg/3zqqSwCRGQ` |
| Payment handles | `#payments`, the `.pay-sub` lines |
| Colors | `assets/css/style.css`, the `:root` block |
| Fonts | Google Fonts link in `<head>` + `--font-display` / `--font-body` / `--font-mono` |
| Logo | inline `<svg>` in the header, hero and footer |

### Icons and game logos

All marks live in one inline sprite at the top of `<body>` — the `<svg class="sprite">`
block, one `<symbol id="...">` each. Nothing is fetched at runtime, so icons inherit
`currentColor` and can be recoloured from CSS.

| Prefix | Used for |
|---|---|
| `g-` | game logos (`g-fortnite`, `g-minecraft`, `g-robrun`, `g-roblox`, `g-cs2`, `g-valorant`) |
| `p-` | payment marks (`p-cashapp`, `p-paypal`, `p-venmo`, `p-binance`, `p-phantom`, `p-crypto`, `p-robux`) |
| `i-` | UI icons (`i-bolt`, `i-shield`, `i-gamepad`, `i-wrench`, `i-chat`, `i-wallet`, `i-discord`) |

Reference one with `<svg aria-hidden="true"><use href="#g-cs2"/></svg>` and size it
from CSS. Brand paths are from Simple Icons (CC0); RobRun, the CS2 crosshair, the
Phantom ghost, the coin stack and the Venmo V are drawn by hand in the same grid.

### Game cards

Each `.price-card` carries a `game-<name>` class and two images:

| Path | What it is |
|---|---|
| `assets/img/games/<name>.png` | official wordmark, trimmed to its bounding box, transparent, 96px tall (4× the 24px display height) |
| `assets/img/covers/<name>.jpg` | cover art, 700×860, brightness-normalised so every card sits under the same scrim |

Both are decorative duplicates of the heading, so the `<img>` inside `h3.game-logo`
carries the accessible name and the cover is `alt=""`.

The cover sits in `.card-cover` at `z-index:-1`. **`.price-card` needs
`isolation: isolate`** — without it the negative z-index drops the image behind the
card's own background and the art is invisible. The scrim in `.card-cover::after`
keeps the art readable only in the top third; everything under the price is
near-solid so text never fights the picture.

Logos are sized by height, not width, so all six share one optical cap height and
the widths fall where they fall. The CS2 lockup ships as dark grey plus white, so
`.game-cs2 .game-logo img` flattens it with `brightness(0) invert(1)`.


Open `index.html` in a browser to preview. Nothing to install.

## Deploying

Cloudflare Pages, connected to this repo:

- Framework preset: **None**
- Build command: *(leave empty)*
- Build output directory: `/`

Every push to `main` deploys. Pull requests get their own preview URL.

## Publishing access

Repo → **Settings → Collaborators → Add people**.

- **Write** — push code (deploys)
- **Maintain** — code + settings and domains
- **Admin** — everything, including removing collaborators

Give Write unless the person is a co-owner.

## Notes

- Keep the repo **private**; the site is public through Pages regardless.
- Nobody needs your Discord, payment or hosting-password credentials to edit this repo.
- `sitemap.xml` points at `https://nx4hub.org/` — update it if the domain changes.
