# The Arx – Real Estate Website

A static, responsive real estate website built with HTML, CSS and JavaScript.

## Structure
- `index.html` Home · `about.html` · `properties.html` (search + filters) · `property.html?id=…` (details) · `services.html` · `contact.html`
- `css/style.css` all styling
- `js/data.js` **company contact details + all property listings (edit this)**
- `js/main.js` header/footer, search/filter logic, gallery, forms, saved properties
- `js/effects.js` + `css/animations.css` animations and interactive features (see below)
- `images/` favicon, social image, and `images/properties/` for your photos

## Update contact details
Open `js/data.js` and edit the `config` block (WhatsApp number, phone, email, address, social links). Also replace `www.thearx.com` in the HTML `<link rel="canonical">`, `sitemap.xml` and `robots.txt` with the real domain.

## Add or edit a property
In `js/data.js`, copy an object in the `properties` array and change its values. Use a unique `id` (lowercase, hyphens). Add photos:
```js
images: ["images/properties/lekki-1.jpg", "images/properties/lekki-2.jpg"]
```
Leave `images: []` to show an illustrated placeholder. Resize photos to about 1600px wide and compress them (e.g. squoosh.app) before uploading. Prefer `.webp` or `.jpg`.

## Run locally
Open `index.html` in a browser, or run `python3 -m http.server 8000` in this folder and visit http://localhost:8000.

## Deploy with GitHub + Cloudflare Pages
1. Create a GitHub repository and push this folder (`git init`, `git add .`, `git commit`, `git push`).
2. In Cloudflare: Workers & Pages → Create → Pages → Connect to Git → pick the repo.
3. Framework preset: **None**. Build command: *(leave empty)*. Output directory: `/` (root).
4. After the first deploy, add the custom domain under Custom domains.

## Contact forms
This is a static site, so the form opens the visitor's email app, and the WhatsApp button opens a chat with the message pre-filled. To receive messages directly in an inbox, a form service (e.g. Formspree) can be added later.

## Animations & interactive features
- Animated hero: typing headline (edit the words in `data-words` on `#typed` in `index.html`), floating shapes, parallax, quick-search chips
- Count-up stats and a scrolling "Areas we cover" strip, both generated automatically from `js/data.js`
- Scroll-reveal with staggered and directional entrances, scroll progress bar, auto-hiding header, back-to-top button
- Card spotlight/shine effects, button shine + ripple, pulsing WhatsApp button, smooth page transitions
- Save properties with the heart button (kept in the visitor's browser; header shows the count and links to the saved list)
- Property page: photo lightbox (click the main photo), animated gallery, and a payment estimator (sale) / rent breakdown (rent)
- All motion is switched off automatically for visitors who have "reduce motion" enabled on their device
