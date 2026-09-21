// Review sheet for a subset: node review.mjs key key ... > review.html
import { ICONS, renderSvg } from './icons.mjs';
import { writeFileSync } from 'node:fs';
const keys = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(ICONS);
const tiles = keys.map((k) => {
  const svg = renderSvg(ICONS[k]);
  return `<section class="tile" id="${k}">
  <div class="art">${svg}</div>
  <div class="boxes"><span class="box">${svg}</span><span class="box sm">${svg}</span></div>
  <h3>${k}<small>${ICONS[k].label} · svg/${k}.svg</small></h3>
</section>`;
}).join('\n');
writeFileSync('review.html', `<!doctype html><meta charset="utf-8"><title>Icon review</title><style>
body{margin:0;background:#f4f0e4;color:#0f2619;font:14px/1.4 -apple-system,system-ui,sans-serif;padding:32px 40px 60px}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.tile{background:#fff;border-radius:16px;padding:16px;display:flex;flex-direction:column;align-items:center;gap:10px}
.art svg{width:128px;height:128px;display:block}
.boxes{display:flex;gap:8px;align-items:center}
.box{display:inline-flex;width:40px;height:40px;border-radius:12px;background:#e7f7dc;align-items:center;justify-content:center}.box svg{width:26px;height:26px}
.box.sm{width:30px;height:30px;border-radius:9px}.box.sm svg{width:18px;height:18px}
h3{margin:0;font-size:14px;text-align:center}h3 small{display:block;font-weight:400;opacity:.55;font-family:ui-monospace,monospace;font-size:11px;margin-top:2px}
</style><h1>Icon review (${keys.length})</h1><p>Each icon's source is <code>svg/&lt;key&gt;.svg</code> next to this file; the master definitions are in <code>icons.mjs</code>.</p><div class="grid">${tiles}</div>`);
console.log('wrote review.html', keys.length);
