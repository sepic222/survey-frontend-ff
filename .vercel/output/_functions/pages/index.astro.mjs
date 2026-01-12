/* empty css                                 */
import { e as createComponent, f as createAstro, h as addAttribute, k as renderHead, l as renderComponent, r as renderTemplate } from '../chunks/astro/server_B_TnjHmk.mjs';
import 'piccolore';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>FateFlix Cinematic Survey</title>${renderHead()}</head> <body class="bg-black min-h-screen"> ${renderComponent($$result, "FateFlixSurvey", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/Users/saraellenpicard/Documents/fateflix-code/fateflix-frontend/src/components/FateFlixSurvey.jsx", "client:component-export": "default" })} </body></html>`;
}, "/Users/saraellenpicard/Documents/fateflix-code/fateflix-frontend/src/pages/index.astro", void 0);

const $$file = "/Users/saraellenpicard/Documents/fateflix-code/fateflix-frontend/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
