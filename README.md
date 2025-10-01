# Portfolio (Modular Split)

This is a clean split of my portfolio into a maintainable structure:

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
