# Portfolio Website

Personal portfolio built with React, TypeScript, Vite and Tailwind CSS v4.

## Getting started

Requires Node.js 20.19+ or 22.12+.

```bash
npm install       # first time only
npm run dev       # dev server with hot reload → http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build → http://localhost:4173
```

## Editing content

All copy, links and projects live in **`src/content.ts`**. Every value marked
`PLACEHOLDER` is a stand-in to replace before publishing:

- `site.email`, `site.socials` — your email, GitHub and LinkedIn URLs
- `about.intro`, `about.moreHref`, `about.photo` — intro text, "read more" link, portrait
- `projects` — titles, categories, links and images

To use real images, put them in `public/` (e.g. `public/images/me.jpg`) and set
the path, e.g. `photo: '/images/me.jpg'`. Projects without an `image` show a
solid card in their `color` (`'accent'` or `'sky'`).

## Structure

```
src/
  content.ts            editable content
  index.css             design tokens (colours, fonts, easings) + custom CSS
  App.tsx               page composition
  components/
    Hero.tsx            nav, name, tagline, flower, CTA
    SelectedWork.tsx    project grid  (ProjectCard)
    About.tsx           portrait + intro
    Contact.tsx         headline, email, socials, footer
    Flower.tsx          generated SVG flower
    WavyLine.tsx        the continuous pink line
    WavePoint.tsx       invisible anchors the line passes through
    PillButton.tsx, ArrowIcon.tsx, Logo.tsx
```

### The wavy line

`<WavyLine />` draws one smooth curve through every `<WavePoint order={n} />` on
the page, re-measuring when the layout changes. To reshape the line, move the
points' Tailwind position classes in each section. They support responsive
variants, and `hidden md:block` uses a point only on larger screens.

The line is revealed by scroll using Motion (`useScroll` + `useSpring`). Its
drawing progress follows a soft, overdamped spring, so it trails slightly on
fast scrolls and eases to a stop. It starts at 0% at the top of the page, and
the tip settles about 58% down the viewport. Tune `TIP_VIEWPORT_RATIO`,
`SPRING` and `RAMP_VIEWPORTS` at the top of `WavyLine.tsx`. With
`prefers-reduced-motion` enabled, the full line is shown statically.
