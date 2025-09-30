# Portfolio (Modular Split)

This is a clean split of your single-file portfolio into a maintainable structure:

```
portfolio-split/
├─ index.html
├─ assets/
│  ├─ css/
│  │  └─ site.css
│  └─ js/
│     ├─ main.js
│     ├─ utils/
│     │  ├─ dom.js
│     │  └─ env.js
│     ├─ components/
│     │  ├─ back-to-top.js
│     │  ├─ carousel.js
│     │  ├─ contact-modal.js
│     │  ├─ nav.js
│     │  ├─ reveal.js
│     │  ├─ resume.js
│     │  └─ smooth-scroll.js
│     └─ effects/
│        ├─ magnet.js
│        ├─ parallax.js
│        ├─ starfield.js
│        └─ tilt.js
```

- **index.html**: Uses Tailwind CDN + a single module entrypoint `assets/js/main.js` and the external stylesheet.
- **site.css**: All custom CSS extracted from the original `<style>` block.
- **JS modules**: Each feature is encapsulated in its own module and initialized from `main.js`.

> Note: I also removed duplicate mobile drawer logic and fixed stray closing tags around the nav/drawer that were present in the original single-file version.

## Local usage

1. Open `index.html` directly in a modern browser, or serve the folder with any static server.
2. Keep your images (e.g., `DP.png`, `ontic_technologies_logo.jpeg`, `antino_labs_logo.png`) in the project root as referenced by the HTML.
3. You can continue to use the Tailwind CDN, or replace it with a local build if you prefer (not required for this split).
