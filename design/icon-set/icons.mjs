// Pantry "offset ink" icon set. 64x64 viewBox. Each icon is a list of parts:
//   { d, fill: 'main'|'second'|null, line: true|false, w?: strokeWidth, o?: opacity }
// The renderer draws every part with a fill as a flat colour shape shifted
// down-left, then draws every part with line:true as a clean ink line on top.

export const INK = '#14382a';
export const OFFSET = { dx: -2.4, dy: 2.2 };

export const C = {
  red: '#e8695a', orange: '#f0913e', gold: '#e9bd4e', paleGold: '#f3d98c',
  green: '#8cc472', deepGreen: '#5aa552', blue: '#bfe0f2', sky: '#a6d3ee',
  pink: '#f2a7a0', brown: '#d3a66c', cream: '#f6e9c9', tan: '#e6c79a',
  purple: '#cdb5e6', grey: '#dad5c8', teal: '#a3dccb', cooked: '#c27b4b', mint: '#b9ffa4', rose: '#e88c8c',
};

const F = (d, fill = 'main', extra = {}) => ({ d, fill, line: true, ...extra });   // filled + outlined
const L = (d, w = 2.4, extra = {}) => ({ d, fill: false, line: true, w, ...extra }); // ink line only
const B = (d, fill = 'main', extra = {}) => ({ d, fill, line: false, ...extra });                          // colour blob only, no line

// Six spokes with a small outward V two-thirds of the way along each.
const _sp = (r, a) => `${(32 + r * Math.cos(a)).toFixed(1)} ${(32 + r * Math.sin(a)).toFixed(1)}`;
const SNOW_SPOKES = [0,1,2,3,4,5].map(i => { const a = i * Math.PI / 3 - Math.PI / 2; return `M${_sp(0,a)}L${_sp(21,a)}`; }).join('');
const SNOW_BRANCHES = [0,1,2,3,4,5].map(i => { const a = i * Math.PI / 3 - Math.PI / 2, d = Math.PI / 5;
  const bx = 32 + 13 * Math.cos(a), by = 32 + 13 * Math.sin(a);
  const e = (t) => `${(bx + 6 * Math.cos(t)).toFixed(1)} ${(by + 6 * Math.sin(t)).toFixed(1)}`;
  return `M${e(a - d)}L${bx.toFixed(1)} ${by.toFixed(1)}L${e(a + d)}`; }).join('');

// Almond, pointed end up, centred on the origin.
const ALMOND = 'M0 -13c5 0 10 9 10 15 0 7-4 11-10 11S-10 9-10 2c0-6 5-15 10-15z';

export const ICONS = {
  // ---------- hero six ----------
  apple: { label: 'Apple / Fruit', pal: { main: C.red, second: C.green }, parts: [
    F('M32 21c4-6 14-6 18 2s0 22-8 30c-4 4-8 2-10 2s-6 2-10-2c-8-8-12-22-8-30s14-8 18-2z'),
    L('M32 21c-1-4 0-8 3-11', 3),
    F('M34 15c4-6 12-6 14-2-4 6-10 6-14 2z', 'second'),
  ]},
  milk: { label: 'Milk / Dairy', pal: { main: C.blue, second: C.sky }, parts: [
    F('M25 17h14v4c0 3 6 6 6 12v20a4 4 0 0 1-4 4H23a4 4 0 0 1-4-4V33c0-6 6-9 6-12z'),
    F('M19 34h26v9H19z', 'second'),
    F('M24 11h16a1.5 1.5 0 0 1 1.5 1.5V17H22.5v-4.5A1.5 1.5 0 0 1 24 11z', null),
  ]},
  egg: { label: 'Eggs', pal: { main: C.paleGold, second: C.cream }, parts: [
    F('M24 17c7 0 11 9 11 17 0 7-5 12-11 12S13 41 13 34c0-8 4-17 11-17z', 'second'),
    F('M38 23c7 0 12 9 12 18 0 7-5 12-12 12s-12-5-12-12c0-9 5-18 12-18z'),
  ]},
  bread: { label: 'Bread', pal: { main: C.gold, second: C.cream }, parts: [
    F('M14 29c0-9 8-14 18-14s18 5 18 14c0 4-3 6-3 8v13a3 3 0 0 1-3 3H20a3 3 0 0 1-3-3V37c0-2-3-4-3-8z'),
    F('M20 30c0-6 6-9 12-9s12 3 12 9c0 3-2 4-2 7v10H22V37c0-3-2-4-2-7z', 'second'),
  ]},
  greens: { label: 'Spinach / Herbs', pal: { main: C.green }, parts: [
    F('M32 11c12 6 18 18 14 30-3 8-9 13-14 14-5-1-11-6-14-14C14 29 20 17 32 11z'),
    L('M32 60V20'),
    L('M32 30c-4-1-7-4-9-8M32 40c4-1 7-4 9-8M32 47c-4-1-7-4-9-8M32 33c4-1 7-4 9-8', 2, { o: .7 }),
  ]},
  carrot: { label: 'Carrot / Vegetables', pal: { main: C.orange, second: C.green }, tf: 'rotate(-24 32 38)', parts: [
    F('M32 60c-4-6-12-18-11-30 1-8 5-12 11-12s10 4 11 12c1 12-7 24-11 30z'),
    L('M26 31h7M27 41h6', 2.2),
    F('M32 18c-4-6-10-8-14-6 3 4 8 7 14 6z', 'second'),
    F('M32 18c4-6 10-8 14-6-3 4-8 7-14 6z', 'second'),
    F('M32 18c-1-6 0-11 3-14 2 5 1 10-3 14z', 'second'),
  ]},

  // ---------- produce extras ----------
  banana: { label: 'Banana', pal: { main: C.gold }, parts: [
    F('M12 16A25.5 25.5 0 0 0 52 46A90 90 0 0 1 12 16Z'),
    L('M12 16l-3-4', 3.4),
    L('M52 46l3 3', 3.4),
  ]},
  cheese: { label: 'Cheese', pal: { main: C.gold, second: C.paleGold }, parts: [
    F('M8 34h48v12H8z'),
    F('M8 34 50 16l6 14z', 'second'),
    L('M17 40a2.6 2.6 0 1 0 5.2 0 2.6 2.6 0 1 0-5.2 0M31 41a2 2 0 1 0 4 0 2 2 0 1 0-4 0M44 39a2.2 2.2 0 1 0 4.4 0 2.2 2.2 0 1 0-4.4 0M38 27a2 2 0 1 0 4 0 2 2 0 1 0-4 0', 2.2),
  ]},
  chilli: { label: 'Chilli / Spices', pal: { main: C.red, second: C.green }, parts: [
    F('M46 14c3 8-1 20-9 30-5 6-11 10-17 11-2 0-3-2-2-4 6-8 11-15 15-23 3-7 5-11 8-15 2-2 5-1 5 1z'),
    F('M46 14c-1-3-5-5-9-3 2 3 5 4 9 3z', 'second'),
    L('M46 14c2-3 5-4 8-3', 2.4),
  ]},

  // ---------- protein ----------
  steak: { label: 'Steak / Meat', pal: { main: C.cooked, second: C.cream }, parts: [
    F('M12 31c0-9 8-15 19-15 8 0 12 4 18 4 5 0 9 4 9 9 0 10-10 19-22 19-6 0-9-3-13-3-6 0-11-5-11-14z'),
    L('M21 25l10 16M30 21l10 16M40 22l8 11', 2.2, { o: .6 }),
  ]},
  drumstick: { label: 'Drumstick / Poultry', pal: { main: C.brown, second: C.cream }, parts: [
    F('M41 12c9 3 13 13 9 22-3 7-10 10-17 9l-7-7c-2-7 2-14 8-19 2-2 4-4 7-5z'),
    F('M26 36l7 7-10 10a4 4 0 1 1-5-1 4 4 0 1 1-1-5z', 'second'),
    L('M40 22c2 1 3 3 3 5', 2.2, { o: .6 }),
  ]},
  ham: { label: 'Ham / Pork', pal: { main: C.pink, second: C.cream }, parts: [
    F('M14 34c0-11 9-18 20-18h10c6 0 10 4 10 10v6c0 8-8 14-18 14H26c-7 0-12-5-12-12z'),
    F('M14 34c0-5 2-9 5-12 3 3 5 7 5 12s-2 9-5 12c-3-3-5-7-5-12z', 'second'),
    L('M19 34a1.8 1.8 0 1 0 3.6 0 1.8 1.8 0 1 0-3.6 0', 2.4),
    L('M32 22c4 0 8 1 11 4', 2, { o: .6 }),
  ]},
  fish: { label: 'Fish / Seafood', pal: { main: C.sky, second: C.blue }, parts: [
    F('M14 32c6-10 14-14 24-14 6 0 11 5 16 14-5 9-10 14-16 14-10 0-18-4-24-14z'),
    F('M14 32l-8-9v18z', 'second'),
    L('M40 27a2 2 0 1 0 4 0 2 2 0 1 0-4 0', 2.2),
    L('M30 22c-2 6-2 14 0 20', 2, { o: .6 }),
  ]},
  shrimp: { label: 'Shrimp', pal: { main: C.orange, second: C.pink }, parts: [
    F('M17.3 24.5A17 17 0 1 1 23.5 47.7L28 39.9A8 8 0 1 0 25.1 29Z'),
    F('M19 22l-9-5 3 8-6 5 9 1z', 'second'),
    L('M36.5 25.2l3.5-6.1M41 33h7M36.5 40.8l3.5 6.1', 2, { o: .6 }),
    L('M24 45c-6 2-9 6-11 11', 2.2),
    L('M29 44.5a1.6 1.6 0 1 0 3.2 0 1.6 1.6 0 1 0-3.2 0', 2.4),
  ]},

  // ---------- bakery, grains ----------
  croissant: { label: 'Loaf / Bakery', pal: { main: C.gold, second: C.paleGold }, parts: [
    F('M10 38c0-9 9-16 22-16s22 7 22 16v8a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4z'),
    F('M14 46h36v4H14z', 'second'),
    L('M22 28l6 6M32 26l6 6M42 28l4 4', 2.4),
  ]},
  pasta: { label: 'Pasta & noodles', pal: { main: C.blue, second: C.paleGold }, parts: [
    F('M17 33c1-8 7-13 15-13s14 5 15 13z', 'second'),
    L('M22 33c2-4 3-8 3-11M32 33c0-4 0-8 1-12M42 33c-2-4-3-8-3-11', 2, { o: .6 }),
    F('M10 33h44c0 12-10 21-22 21S10 45 10 33z'),
    L('M44 10L30 34M50 12L36 34', 2.4),
  ]},
  rice: { label: 'Rice & grains', pal: { main: C.blue, second: C.cream }, parts: [
    F('M17 34c2-8 8-12 15-12s13 4 15 12z', 'second'),
    F('M12 34h40c0 12-9 20-20 20s-20-8-20-20z'),
    L('M25 28l1-2M32 26l1-2M39 28l1-2', 2.4),
  ]},
  wheat: { label: 'Cereal / Wheat', pal: { main: C.paleGold }, tf: 'rotate(10 32 32)', parts: [
    L('M32 58V14', 2.4),
    F('M32 20c-5-1-9 2-10 7 5 1 9-2 10-7z'), F('M32 20c5-1 9 2 10 7-5 1-9-2-10-7z'),
    F('M32 30c-5-1-9 2-10 7 5 1 9-2 10-7z'), F('M32 30c5-1 9 2 10 7-5 1-9-2-10-7z'),
    F('M32 40c-5-1-9 2-10 7 5 1 9-2 10-7z'), F('M32 40c5-1 9 2 10 7-5 1-9-2-10-7z'),
    F('M32 8c3 3 3 8 0 12-3-4-3-9 0-12z'),
  ]},
  cupcake: { label: 'Baking', pal: { main: C.pink, second: C.tan }, parts: [
    F('M18 36h28l-3 18H21z', 'second'),
    L('M26 36l-1 18M32 36v18M38 36l1 18', 2, { o: .5 }),
    F('M16 36c0-10 8-14 16-14s16 4 16 14z'),
    F('M32 22c-4-4-2-9 0-12 2 3 4 8 0 12z', 'second'),
  ]},
  flourSack: { label: 'Dry goods', pal: { main: C.cream, second: C.tan }, parts: [
    F('M20 22c-6 8-8 16-8 22 0 6 4 10 20 10s20-4 20-10c0-6-2-14-8-22H20z'),
    F('M20 18h24v4H20z', 'second'),
    L('M24 18l-4-6M40 18l4-6', 2.4),
    L('M24 40c4 3 12 3 16 0', 2, { o: .6 }),
  ]},

  // ---------- pantry, packaged ----------
  tin: { label: 'Tinned & jarred', pal: { main: C.grey, second: C.red }, parts: [
    F('M18 16h28v34a3 3 0 0 1-3 3H21a3 3 0 0 1-3-3z'),
    F('M18 27h28v12H18z', 'second'),
    L('M18 16c0 2 6 4 14 4s14-2 14-4', 2.2),
  ]},
  oilBottle: { label: 'Oils & vinegars', pal: { main: C.paleGold, second: C.green }, parts: [
    F('M27 16h10v6c0 3 7 6 7 13v17a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4V35c0-7 7-10 7-13z'),
    F('M22 38h20v9H22z', 'second'),
    F('M27 8h10v8H27z', null),
  ]},
  sauceBottle: { label: 'Condiments', pal: { main: C.red, second: C.cream }, parts: [
    F('M23 24h18v26a4 4 0 0 1-4 4H27a4 4 0 0 1-4-4z'),
    F('M27 24l2-8h6l2 8z', null),
    F('M23 34h18v10H23z', 'second'),
    L('M32 16v-6', 3),
  ]},
  peanut: { label: 'Nuts & seeds', pal: { main: C.tan }, parts: [
    // peanut in the shell: two lobes with a pinched waist, tilted
    F('M0 -21c6 0 11 5 11 11 0 5-3 7-3 10s3 5 3 10c0 6-5 11-11 11s-11-5-11-11c0-5 3-7 3-10s-3-5-3-10c0-6 5-11 11-11z', 'main', { tf: 'translate(32 32) rotate(-38)' }),
    L('M-6 -13c4 3 8 3 12 0M-6 -6c4 3 8 3 12 0M-6 6c4 3 8 3 12 0M-6 13c4 3 8 3 12 0', 1.9, { o: .5, tf: 'translate(32 32) rotate(-38)' }),
  ]},
  cookie: { label: 'Snacks', pal: { main: C.tan, second: C.brown }, parts: [
    F('M32 14a18 18 0 1 0 0 36 18 18 0 1 0 0-36z'),
    L('M24 26a2 2 0 1 0 4 0 2 2 0 1 0-4 0M36 24a2 2 0 1 0 4 0 2 2 0 1 0-4 0M38 36a2 2 0 1 0 4 0 2 2 0 1 0-4 0M27 38a2 2 0 1 0 4 0 2 2 0 1 0-4 0M32 30a1.6 1.6 0 1 0 3.2 0 1.6 1.6 0 1 0-3.2 0', 2.4),
  ]},
  cup: { label: 'Drinks', pal: { main: C.sky, second: C.blue }, parts: [
    F('M18 18h28l-3 34H21z'),
    F('M19 30h26l-1 10H20z', 'second'),
    L('M40 8l-8 14', 2.6),
    L('M18 18h28', 2.4),
  ]},
  box: { label: 'Other', pal: { main: C.tan, second: C.cream }, parts: [
    F('M14 24h36v26a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4z'),
    F('M14 24l4-10h28l4 10z', 'second'),
    L('M32 14v40', 2.2),
  ]},

  // ---------- meals ----------
  cloche: { label: 'Ready meals', pal: { main: C.grey, second: C.teal }, parts: [
    F('M14 40c0-11 8-19 18-19s18 8 18 19z'),
    L('M10 40h44', 3),
    L('M32 21v-4', 3),
    B('M16 46h32c0 4-6 6-16 6s-16-2-16-6z', 'second'),
    L('M16 46h32', 2.4),
  ]},
  chefHat: { label: 'Cooked meal', pal: { main: C.cream, second: C.blue }, parts: [
    F('M18 34c-6-1-9-6-7-11 2-4 6-5 9-4 1-6 6-9 12-9s11 3 12 9c3-1 7 0 9 4 2 5-1 10-7 11v10H18z'),
    F('M18 44h28v6a3 3 0 0 1-3 3H21a3 3 0 0 1-3-3z', 'second'),
    L('M26 34v8M32 34v8M38 34v8', 2, { o: .5 }),
  ]},
  takeaway: { label: 'Leftovers', pal: { main: C.blue, second: C.sky }, parts: [
    // meal-prep tub: snap lid with side tabs, tapered body, two compartments
    F('M11 28h42l-3 21a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4z'),
    F('M6 28h52v-5a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3z', 'second'),
    L('M6 28H3M58 28h3', 3),
    L('M32 28v25', 2.2, { o: .6 }),
    L('M20 38h6M38 38h6', 2, { o: .5 }),
  ]},
  utensils: { label: 'Meal prep', pal: { main: C.teal }, parts: [
    B('M32 14a18 18 0 1 0 0 36 18 18 0 1 0 0-36z'),
    L('M22 10v10a5 5 0 0 0 10 0V10M27 25v29', 2.4),
    L('M42 10c-4 2-6 8-6 14h6v30', 2.4),
  ]},

  // ---------- zones ----------
  fridge: { label: 'Fridge', pal: { main: C.blue, second: C.sky }, parts: [
    F('M18 8h28a3 3 0 0 1 3 3v42a3 3 0 0 1-3 3H18a3 3 0 0 1-3-3V11a3 3 0 0 1 3-3z'),
    F('M15 26h34v27a3 3 0 0 1-3 3H18a3 3 0 0 1-3-3z', 'second'),
    L('M15 26h34', 2.4),
    L('M41 14v6M41 32v10', 2.6),
  ]},
  shelves: { label: 'Pantry', pal: { main: C.tan, second: C.gold }, parts: [
    F('M14 10h36v44H14z'),
    L('M14 24h36M14 40h36', 2.4),
    B('M20 16h6v8h-6zM30 18h8v6h-8zM22 32h8v8h-8zM36 30h6v10h-6z', 'second'),
    L('M20 16h6v8h-6zM30 18h8v6h-8zM22 32h8v8h-8zM36 30h6v10h-6z', 2),
  ]},
  snowflake: { label: 'Freezer / Frozen', pal: { main: C.blue }, parts: [
    B('M32 15a17 17 0 1 0 0 34 17 17 0 1 0 0-34z'),
    L(SNOW_SPOKES, 2.4),
    L(SNOW_BRANCHES, 2.2),
  ]},
  iceCream: { label: 'Ice cream', pal: { main: C.pink, second: C.tan }, parts: [
    F('M20 30h24L32 58z', 'second'),
    L('M24 36l14 4M22 42l8 2M28 32l12 2', 1.8, { o: .5 }),
    F('M20 30c-2-9 4-16 12-16s14 7 12 16z'),
  ]},
};

export function renderSvg(icon, { size = 64, offset = OFFSET } = {}) {
  const fills = [], lines = [];
  for (const p of icon.parts) {
    const tf = p.tf ? ` transform="${p.tf}"` : '';
    if (p.fill) fills.push(`<path d="${p.d}" fill="${icon.pal[p.fill] || icon.pal.main}"${tf}/>`);
    if (p.line) lines.push(`<path d="${p.d}" fill="${p.face ? icon.pal[p.face] : p.fill === null ? '#fff' : 'none'}" stroke="${INK}" stroke-width="${p.w ?? 2.4}" stroke-linecap="round" stroke-linejoin="round"${p.o ? ` opacity="${p.o}"` : ''}${tf}/>`);
  }
  const open = icon.tf ? `<g transform="${icon.tf}">` : '<g>';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">${open}<g transform="translate(${offset.dx} ${offset.dy})">${fills.join('')}</g>${lines.join('')}</g></svg>`;
}

// Inner markup only (no <svg>), with JSX attribute names, for pasting into React.
export function renderJsx(icon, { offset = OFFSET } = {}) {
  const fills = [], lines = [];
  for (const p of icon.parts) {
    const tf = p.tf ? ` transform="${p.tf}"` : '';
    if (p.fill) fills.push(`<path d="${p.d}" fill="${icon.pal[p.fill] || icon.pal.main}"${tf} />`);
    if (p.line) lines.push(`<path d="${p.d}" fill="${p.face ? icon.pal[p.face] : p.fill === null ? '#fff' : 'none'}" stroke="${INK}" strokeWidth="${p.w ?? 2.4}" strokeLinecap="round" strokeLinejoin="round"${p.o ? ` opacity="${p.o}"` : ''}${tf} />`);
  }
  const open = icon.tf ? `<g transform="${icon.tf}">` : '<g>';
  return `${open}<g transform="translate(${offset.dx} ${offset.dy})">${fills.join('')}</g>${lines.join('')}</g>`;
}
