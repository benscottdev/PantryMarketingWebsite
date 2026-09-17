import { ICONS, renderSvg } from './icons.mjs';
import { writeFileSync, mkdirSync } from 'node:fs';
mkdirSync('svg', { recursive: true });
const hero = ['apple','milk','egg','bread','greens','carrot'];
const tones = { apple:'soon', milk:'soon', egg:'fresh', bread:'urgent', greens:'urgent', carrot:'fresh' };
let heroRow = '', grid = '';
for (const k of Object.keys(ICONS)) {
  const svg = renderSvg(ICONS[k]);
  writeFileSync(`svg/${k}.svg`, svg);
  grid += `<div class="tile"><div class="big">${svg}</div><div class="row"><span class="box">${svg}</span><span class="box sm">${svg}</span></div><span class="lbl">${ICONS[k].label}<small>${k}</small></span></div>`;
}
for (const k of hero) heroRow += `<div class="orb" data-tone="${tones[k]}">${renderSvg(ICONS[k])}</div>`;
writeFileSync('sheet.html', `<!doctype html><meta charset="utf-8"><title>Pantry icon set</title><style>
:root{--ink:#0f2619;--cream:#f4f0e4}
body{margin:0;background:var(--cream);color:var(--ink);font:14px/1.4 -apple-system,system-ui,sans-serif;padding:32px 40px 60px}
h1{font-size:22px;margin:0 0 4px}h2{font-size:15px;margin:36px 0 12px}p{margin:0 0 20px;opacity:.7}
.hero{display:flex;gap:28px;align-items:center}
.orb{position:relative;width:86px;aspect-ratio:1;border-radius:50%;padding:10px;background:linear-gradient(180deg,#fff,#fbf8f0);box-shadow:0 1px 2px rgba(15,38,25,.06),0 14px 26px -10px rgba(15,38,25,.3),inset 0 1px 0 #fff}
.orb::before{content:'';position:absolute;inset:-3px;border:2px solid var(--tone);border-radius:50%;opacity:.35}
.orb svg{width:76%;height:76%;display:block;margin:12% auto}
[data-tone=fresh]{--tone:#257b3c}[data-tone=soon]{--tone:#c98a1a}[data-tone=urgent]{--tone:#c8503a}
.grid{display:grid;grid-template-columns:repeat(6,1fr);gap:18px 14px}
.tile{background:#fff;border-radius:16px;padding:14px 12px 10px;display:flex;flex-direction:column;align-items:center;gap:8px;box-shadow:0 1px 2px rgba(15,38,25,.05)}
.big svg{width:72px;height:72px;display:block}
.row{display:flex;gap:8px;align-items:center}
.box{display:inline-flex;width:40px;height:40px;border-radius:12px;background:#e7f7dc;align-items:center;justify-content:center}.box svg{width:26px;height:26px}
.box.sm{width:30px;height:30px;border-radius:9px}.box.sm svg{width:18px;height:18px}
.lbl{font-size:12px;font-weight:600;text-align:center}.lbl small{display:block;font-weight:400;opacity:.5;font-family:ui-monospace,monospace;font-size:10px}
</style>
<h1>Pantry icon set — offset ink</h1><p>Clean line (no wobble), flat colour misregistered behind. Hero six in the live orb, then the full set at 72px, and inside the app's 40px and 30px icon boxes.</p>
<h2>Hero</h2><div class="hero">${heroRow}</div>
<h2>Full set (${Object.keys(ICONS).length})</h2><div class="grid">${grid}</div>`);
console.log('ok', Object.keys(ICONS).length);
