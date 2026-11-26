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
| Logo | inline `<svg>` in the header, hero and footer |

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
