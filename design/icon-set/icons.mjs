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
  purple: '#cdb5e6', grey: '#dad5c8', teal: '#a3dccb', cooked: '#c27b4b', choc: '#8a5a3b', lime: '#d8e98e', mint: '#b9ffa4', rose: '#e88c8c',
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
  cheese: { label: 'Cheese', pal: { main: C.gold }, tf: 'rotate(-8 32 32)', parts: [
    // a single slice of swiss: rounded square with holes, a couple cut by the edge
    F('M14 14h36a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4z'),
    L('M20 26a4 4 0 1 0 8 0 4 4 0 1 0-8 0M35 22a3 3 0 1 0 6 0 3 3 0 1 0-6 0M38 38a4.5 4.5 0 1 0 9 0 4.5 4.5 0 1 0-9 0M24 40a2.6 2.6 0 1 0 5.2 0 2.6 2.6 0 1 0-5.2 0', 2.2),
    L('M50 22a3 3 0 0 1 4 1M13 43a3 3 0 0 1 3-3', 2.2),
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
  pasta: { label: 'Pasta & noodles', pal: { main: C.paleGold, second: C.red, plate: C.blue }, parts: [
    // spaghetti and meatballs on a plate, with a fork: the chopsticks made it read as ramen
    F('M8 44h48c0 6-10 10-24 10S8 50 8 44z', 'plate'),
    F('M12 44c0-10 8-16 20-16s20 6 20 16z'),
    L('M17 42c3-6 8-10 15-10M22 43c2-5 6-8 11-8M39 42c-1-6-4-9-8-10M46 43c-2-5-5-9-9-10', 1.8, { o: .45 }),
    F('M23 30a5 5 0 1 0 0 10 5 5 0 1 0 0-10z', 'second', { face: 'second' }),
    F('M37 28a5 5 0 1 0 0 10 5 5 0 1 0 0-10z', 'second', { face: 'second' }),
    L('M52 10v10a4 4 0 0 1-8 0V10M48 10v13M48 23v17', 2.4),
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

  // ---------- name-rule extras (app resolveFoodIconMeta) ----------
  berries: { label: 'Berries / Grapes', pal: { main: C.purple, second: C.green }, parts: [
    // strawberry-ish cluster: three round berries with a leaf cap
    F('M22 34a8 8 0 1 0 0 16 8 8 0 1 0 0-16z'),
    F('M42 34a8 8 0 1 0 0 16 8 8 0 1 0 0-16z'),
    F('M32 22a9 9 0 1 0 0 18 9 9 0 1 0 0-18z'),
    F('M32 22c-5-4-10-4-14-1 4 3 9 3 14 1z', 'second'),
    L('M32 22c0-4 1-7 3-10', 2.6),
  ]},
  tomato: { label: 'Tomato / Produce', pal: { main: C.red, second: C.green }, parts: [
    F('M32 20c12 0 20 8 20 18s-8 18-20 18-20-8-20-18 8-18 20-18z'),
    F('M32 22c-2-5-7-7-12-6 2 4 6 6 12 6z', 'second'),
    F('M32 22c2-5 7-7 12-6-2 4-6 6-12 6z', 'second'),
    F('M32 22c-3-3-4-7-2-11 3 2 5 6 2 11z', 'second'),
    L('M22 34c1-3 3-5 6-6', 2, { o: .5 }),
  ]},
  coffee: { label: 'Coffee', pal: { main: C.brown, second: C.cream }, parts: [
    // takeaway cup with lid and sleeve
    F('M17 24h30l-3 30H20z', 'second'),
    F('M19 32h26l-1 10H20z'),
    F('M15 18h34v6H15z', null),
    L('M21 18l2-5h18l2 5', 2.4),
    L('M27 10c0-3 3-3 3 0s3 3 3 0', 1.8, { o: .5 }),
  ]},
  wine: { label: 'Wine', pal: { main: C.rose, second: C.deepGreen }, parts: [
    // bottle with foil neck and label
    F('M27 8h10v14c0 3 6 6 6 12v20a4 4 0 0 1-4 4H25a4 4 0 0 1-4-4V34c0-6 6-9 6-12z', 'second'),
    F('M21 36h22v12H21z', null),
    B('M27 8h10v6H27z'),
    L('M27 8h10v6H27z', 2.4),
    L('M26 42h12', 2, { o: .5 }),
  ]},
  beer: { label: 'Beer / Cider', pal: { main: C.gold, second: C.cream }, parts: [
    // pint mug: bumpy head spilling over, ring handle, a few bubbles
    F('M18 24h26v28a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4z'),
    F('M14 24c-1-5 3-8 7-7 1-5 7-7 11-4 4-3 10-1 11 4 4-1 7 3 5 7z', 'second'),
    F('M20 24v6a3 3 0 0 0 6 0v-6zM36 24v4a3 3 0 0 0 6 0v-4z', 'second'),
    F('M44 30h5a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5h-5v-5h4a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-4z', null),
    L('M25 37a1.2 1.2 0 1 0 2.4 0 1.2 1.2 0 1 0-2.4 0M32 45a1.2 1.2 0 1 0 2.4 0 1.2 1.2 0 1 0-2.4 0M27 48a1.2 1.2 0 1 0 2.4 0 1.2 1.2 0 1 0-2.4 0', 2, { o: .5 }),
  ]},
  waterBottle: { label: 'Water', pal: { main: C.blue, second: C.sky }, parts: [
    F('M26 18h12v4c0 3 5 5 5 10v20a4 4 0 0 1-4 4H25a4 4 0 0 1-4-4V32c0-5 5-7 5-10z'),
    F('M21 34h22v10H21z', 'second'),
    F('M27 10h10v8H27z', null),
    L('M25 40c3 2 11 2 14 0', 1.8, { o: .5 }),
  ]},
  chips: { label: 'Chips / Crisps', pal: { main: C.red, second: C.gold }, parts: [
    // pillow packet: sides bow out between the two crimped seams
    F('M18 12h28c-2 3-2 5 0 8-3 8-3 16 0 24-2 3-2 5 0 8H18c2-3 2-5 0-8 3-8 3-16 0-24 2-3 2-5 0-8z'),
    L('M15 12h34M15 52h34', 3.2),
    F('M25 32c0-4 3-7 7-7s7 3 7 7-3 7-7 7-7-3-7-7z', 'second'),
    L('M29 31c1-1 3-2 5-1M28 35c2 1 5 1 7-1', 1.8, { o: .5 }),
  ]},
  chocolate: { label: 'Chocolate / Sweets', pal: { main: C.choc, second: C.brown }, parts: [
    // six-square bar with a bite out of the top-right corner
    F('M14 16h26a5 5 0 0 0 5 5 5 5 0 0 0 5 5v22H14z'),
    B('M17 19h6v10h-6zM29 19h6v10h-6zM17 35h6v10h-6zM29 35h6v10h-6zM41 35h6v10h-6z', 'second'),
    L('M17 19h6v10h-6zM29 19h6v10h-6zM17 35h6v10h-6zM29 35h6v10h-6zM41 35h6v10h-6z', 1.6, { o: .45 }),
  ]},
  sandwich: { label: 'Sandwich / Deli', pal: { main: C.gold, second: C.green, red: C.red, cheese: C.paleGold }, parts: [
    // side view of a square sandwich: toast, lettuce, tomato, cheese, toast
    F('M10 31v-6c0-3 2-5 5-5h34c3 0 5 2 5 5v6z'),
    B('M10 31h44v3l-4 3-4-3-4 3-4-3-4 3-4-3-4 3-4-3-4 3-4-3-4 3-4-3z', 'second'),
    L('M10 34l4 3 4-3 4 3 4-3 4 3 4-3 4 3 4-3 4 3 4-3 4 3', 2.2),
    F('M12 37h40v4H12z', 'red'),
    F('M8 41h48v3H8z', 'cheese'),
    F('M10 44h44v5a3 3 0 0 1-3 3H13a3 3 0 0 1-3-3z'),
  ]},
  pizza: { label: 'Pizza', pal: { main: C.gold, second: C.red }, parts: [
    // slice, point down
    F('M14 16c12-6 24-6 36 0L32 54z'),
    L('M14 16c12-6 24-6 36 0', 3),
    B('M22 26a3 3 0 1 0 6 0 3 3 0 1 0-6 0M36 24a3 3 0 1 0 6 0 3 3 0 1 0-6 0M30 36a3 3 0 1 0 6 0 3 3 0 1 0-6 0', 'second'),
    L('M22 26a3 3 0 1 0 6 0 3 3 0 1 0-6 0M36 24a3 3 0 1 0 6 0 3 3 0 1 0-6 0M30 36a3 3 0 1 0 6 0 3 3 0 1 0-6 0', 2),
  ]},
  soup: { label: 'Soup / Stock', pal: { main: C.orange, second: C.grey }, parts: [
    // bowl with steam
    F('M10 30h44c0 12-8 20-22 20S10 42 10 30z', 'second'),
    F('M12 30h40c-2 4-6 6-20 6S14 34 12 30z'),
    L('M8 30h48', 2.4),
    L('M26 22c-2-3-2-6 0-9M32 22c-2-3-2-6 0-9M38 22c-2-3-2-6 0-9', 2, { o: .5 }),
    L('M52 36h4a4 4 0 0 1 0 8h-6', 2.2),
  ]},

  // ---------- generic fallbacks ----------
  vegBasket: { label: 'Vegetables (generic)', pal: { main: C.tan, second: C.green, red: C.red, orange: C.orange }, parts: [
    // wooden crate with a carrot top, a leafy bunch and a tomato showing over the rim
    F('M32 10c5 4 7 9 5 18H27c-2-9 0-14 5-18z', 'second'),
    F('M16 30c0-5 2-9 5-9s5 4 5 9z', 'orange'),
    F('M21 21c-2-4-5-6-9-6 1 4 5 6 9 6z', 'second'),
    F('M21 21c2-4 5-6 9-6-1 4-5 6-9 6z', 'second'),
    F('M44 16a8 8 0 1 0 0 16 8 8 0 1 0 0-16z', 'red'),
    L('M44 16c-1-3 0-5 2-7', 2.4),
    F('M10 30h44v18a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4z'),
    L('M10 38h44M10 46h44', 1.8, { o: .45 }),
    L('M17 30v22M47 30v22', 1.8, { o: .45 }),
  ]},
  fruitBowl: { label: 'Fruit (generic)', pal: { main: C.blue, red: C.red, orange: C.orange, gold: C.gold, green: C.green }, parts: [
    // banana across the back, apple and orange in front, in a shallow bowl
    F('M14 26c8-10 24-12 38-4-14-1-26 2-33 8-3 2-6 0-5-4z', 'gold'),
    F('M23 18a9 9 0 1 0 0 18 9 9 0 1 0 0-18z', 'red', { face: 'red' }),
    L('M23 18c0-3 1-5 3-6', 2.4),
    F('M42 18a9 9 0 1 0 0 18 9 9 0 1 0 0-18z', 'orange', { face: 'orange' }),
    F('M44 18c1-4 4-6 8-6-1 4-4 6-8 6z', 'green'),
    F('M8 34h48c0 10-8 18-24 18S8 44 8 34z'),
    L('M14 42c4 2 32 2 36 0', 1.8, { o: .4 }),
  ]},

  // ---------- produce, tier A ----------
  onion: { label: 'Onion', pal: { main: C.tan, second: C.paleGold }, parts: [
    // brown onion: pointed neck, layer lines, roots
    F('M32 10c2 6 16 12 16 26 0 10-7 18-16 18S16 46 16 36c0-14 14-20 16-26z'),
    L('M26 22c-4 6-5 14-3 22M38 22c4 6 5 14 3 22', 1.9, { o: .5 }),
    L('M28 54l-2 5M32 54v6M36 54l2 5', 2),
    L('M32 10V5', 2.6),
  ]},
  garlic: { label: 'Garlic', pal: { main: C.cream, second: C.purple }, parts: [
    // squat bulb with clove segments and a stubby neck
    F('M32 22c11 0 18 8 18 17 0 8-8 13-18 13S14 47 14 39c0-9 7-17 18-17z'),
    L('M32 22c-8 4-11 12-9 22M32 22c8 4 11 12 9 22M32 22v30', 1.8, { o: .5 }),
    F('M27 22c0-5 2-9 5-12 3 3 5 7 5 12z', 'second'),
    L('M27 22h10', 2.2),
  ]},
  potato: { label: 'Potato', pal: { main: C.tan }, tf: 'rotate(-18 32 32)', parts: [
    // oblong tuber, eyes as short dashes so it stops reading as a cookie
    F('M13 34c-1-9 7-17 19-18 11-1 20 5 21 14 1 9-7 17-19 18-11 1-20-5-21-14z'),
    L('M22 29l3 1M35 24l3 1M40 37l3 1M27 40l3 1', 2.6, { o: .55 }),
  ]},
  capsicum: { label: 'Capsicum / Pepper', pal: { main: C.red, second: C.green }, parts: [
    // bell pepper: dipped shoulders, three lobes at the base
    F('M18 28c0-7 5-10 9-7 2-2 3-3 5-3s3 1 5 3c4-3 9 0 9 7v12c0 7-3 12-7 12-2 0-3-2-5-2s-3 2-5 2c-4 0-7-5-7-12z'),
    L('M27 22v28M37 22v28', 2, { o: .45 }),
    F('M32 20c-1-5 0-9 3-12 2 4 1 8-3 12z', 'second'),
  ]},
  broccoli: { label: 'Broccoli', pal: { main: C.deepGreen, second: C.green }, parts: [
    F('M28 38h8v14a4 4 0 0 1-8 0z', 'second'),
    L('M32 40v10', 1.8, { o: .5 }),
    F('M20 22a8 8 0 0 1 12-6 8 8 0 0 1 12 6 7 7 0 0 1 4 12 7 7 0 0 1-8 6H22a7 7 0 0 1-6-6 7 7 0 0 1 4-12z'),
    L('M24 30a3 3 0 1 0 6 0 3 3 0 1 0-6 0M34 27a3 3 0 1 0 6 0 3 3 0 1 0-6 0', 2, { o: .5 }),
  ]},
  lettuce: { label: 'Lettuce / Cabbage', pal: { main: C.green, second: C.deepGreen }, parts: [
    // ruffled head with a leaf heart
    F('M32 12c4 0 6 3 8 4 3-1 7 0 9 4 3 1 5 5 4 9 2 3 2 7 0 10 0 4-3 7-6 8-2 3-6 5-10 4-3 2-7 2-10 0-4 1-8-1-10-4-3-1-6-4-6-8-2-3-2-7 0-10-1-4 1-8 4-9 2-4 6-5 9-4 2-1 4-4 8-4z'),
    L('M19 30c4 8 8 12 13 14 5-2 9-6 13-14', 2.2, { o: .6 }),
    L('M26 21c2 6 4 10 6 12 2-2 4-6 6-12', 2, { o: .6 }),
  ]},
  mushroom: { label: 'Mushroom', pal: { main: C.tan, second: C.cream }, parts: [
    F('M26 36h12v14a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3z', 'second'),
    F('M12 34c0-12 9-20 20-20s20 8 20 20a3 3 0 0 1-3 3H15a3 3 0 0 1-3-3z'),
    L('M22 26a2 2 0 1 0 4 0 2 2 0 1 0-4 0M36 22a2 2 0 1 0 4 0 2 2 0 1 0-4 0', 2.2, { o: .5 }),
  ]},
  cucumber: { label: 'Cucumber / Zucchini', pal: { main: C.deepGreen, second: C.green, flesh: C.lime }, tf: 'rotate(-40 32 32)', parts: [
    F('M12 32a6 6 0 0 1 6-6h24a8 8 0 0 1 0 16H18a6 6 0 0 1-6-6z'),
    L('M20 29v6M28 29v6M36 29v6', 1.8, { o: .4 }),
    L('M50 32h4', 3),
    // a slice beside it, which is what says cucumber rather than zucchini or a pickle
    F('M30 43a7 7 0 1 0 0 14 7 7 0 1 0 0-14z', 'flesh'),
    L('M30 46a4 4 0 1 0 0 8 4 4 0 1 0 0-8z', 1.8, { o: .5 }),
  ]},
  avocado: { label: 'Avocado', pal: { main: C.green, second: C.brown }, tf: 'rotate(-14 32 32)', parts: [
    // half, skin-side out: pear outline, pale flesh, pit sitting just below centre
    F('M32 10c8 0 12 9 14 18 2 10-2 26-14 26S16 38 18 28c2-9 6-18 14-18z'),
    B('M32 22c5 0 8 6 9 12 1 8-3 14-9 14s-10-6-9-14c1-6 4-12 9-12z', 'second'),
    L('M32 22c5 0 8 6 9 12 1 8-3 14-9 14s-10-6-9-14c1-6 4-12 9-12z', 2.2),
    B('M32 30a5.5 5.5 0 1 0 0 11 5.5 5.5 0 1 0 0-11z', 'main'),
    L('M32 30a5.5 5.5 0 1 0 0 11 5.5 5.5 0 1 0 0-11z', 2.2),
  ]},
  citrus: { label: 'Citrus', pal: { main: C.orange, second: C.cream, leaf: C.green }, parts: [
    // whole orange behind, half slice in front
    F('M40 14a14 14 0 1 0 0 28 14 14 0 1 0 0-28z'),
    F('M42 14c1-5 5-8 10-8-1 5-5 8-10 8z', 'leaf'),
    F('M8 46a14 14 0 0 1 28 0z'),
    B('M11 46a11 11 0 0 1 22 0z', 'second'),
    L('M11 46a11 11 0 0 1 22 0z', 2),
    L('M22 46V35M22 46l-8-8M22 46l8-8', 1.8, { o: .55 }),
  ]},
  grapes: { label: 'Grapes', pal: { main: C.purple, second: C.green }, parts: [
    F('M24 24a5 5 0 1 0 0 10 5 5 0 1 0 0-10z'), F('M40 24a5 5 0 1 0 0 10 5 5 0 1 0 0-10z'),
    F('M32 22a5 5 0 1 0 0 10 5 5 0 1 0 0-10z'),
    F('M28 32a5 5 0 1 0 0 10 5 5 0 1 0 0-10z'), F('M36 32a5 5 0 1 0 0 10 5 5 0 1 0 0-10z'),
    F('M32 40a5 5 0 1 0 0 10 5 5 0 1 0 0-10z'),
    L('M32 22c0-4 1-7 3-10', 2.6),
    F('M35 12c4-3 9-2 12 2-4 2-9 1-12-2z', 'second'),
  ]},
  strawberry: { label: 'Strawberry', pal: { main: C.red, second: C.green }, parts: [
    F('M32 22c9 0 15 5 15 12 0 10-8 20-15 20S17 44 17 34c0-7 6-12 15-12z'),
    L('M26 32l1 1M36 30l1 1M30 40l1 1M38 40l1 1M32 48l1 1', 2.4, { o: .5 }),
    F('M32 22c-6-3-12-3-16 0 4 3 10 4 16 0z', 'second'),
    F('M32 22c6-3 12-3 16 0-4 3-10 4-16 0z', 'second'),
    L('M32 22v-8', 2.6),
  ]},

  // ---------- meat, tier A ----------
  bacon: { label: 'Bacon', pal: { main: C.pink, second: C.cream }, tf: 'rotate(-30 32 32)', parts: [
    F('M10 26c6-6 12 6 18 0s12 6 18 0 6 4 8 6c-6 6-12-6-18 0s-12-6-18 0-6-4-8-6z'),
    L('M12 34c6-6 12 6 18 0s12 6 18 0', 2.2, { o: .55 }),
    F('M10 38c6-6 12 6 18 0s12 6 18 0 6 4 8 6c-6 6-12-6-18 0s-12-6-18 0-6-4-8-6z'),
  ]},
  sausage: { label: 'Sausage', pal: { main: C.cooked }, tf: 'rotate(-26 32 32)', parts: [
    F('M14 25h36a7 7 0 0 1 0 14H14a7 7 0 0 1 0-14z'),
    L('M7 32h5M52 32h5', 3),
    L('M24 29l-2 6M33 29l-2 6M42 29l-2 6', 2, { o: .5 }),
  ]},
  mince: { label: 'Mince', pal: { main: C.rose }, parts: [
    // mound of mince on a plate, granular texture
    F('M12 40c0-10 9-17 20-17s20 7 20 17z'),
    L('M19 35c1-2 3-2 4 0M27 30c1-2 3-2 4 0M35 30c1-2 3-2 4 0M42 35c1-2 3-2 4 0M23 39c1-2 3-2 4 0M31 36c1-2 3-2 4 0M39 39c1-2 3-2 4 0', 1.8, { o: .55 }),
    F('M6 40h52c0 5-6 8-12 8H18c-6 0-12-3-12-8z', null),
  ]},
  lamb: { label: 'Lamb', pal: { main: C.pink, second: C.red, bone: C.grey }, parts: [
    // lamb chop: teardrop cut, fat band down the outer edge and round the bottom, two eyes of meat, grey bone
    F('M34 12c10 10 20 24 18 35-2 11-16 15-28 11-12-4-16-16-9-24 7-7 15-12 19-22z'),
    F('M34 12c10 10 20 24 18 35-2 11-16 15-28 11-3-1-6-3-8-5l4-4c8 5 20 4 25-4 1-9-6-19-13-27z', 'second', { face: 'second' }),
    L('M17 40c9-3 19 0 27 4', 2.4),
    { d: 'M30 17l-6-12 6-3 6 12z', fill: false, line: true, face: 'bone' },
  ]},

  // ---------- dairy, tier A ----------
  butter: { label: 'Butter', pal: { main: C.paleGold, second: C.cream, side: C.gold }, parts: [
    // pale block with a butter knife resting across the corner, on a small plate
    F('M10 30h28v16H10z'),
    F('M10 30l8-8h28l-8 8z', 'second'),
    F('M38 30l8-8v16l-8 8z', 'side'),
    F('M34 44l14-14 5 3-13 15z', null),
    L('M53 30l6-6', 4),
    F('M6 48h52c0 4-4 6-8 6H14c-4 0-8-2-8-6z', null),
  ]},
  spiceJar: { label: 'Spices', pal: { main: C.orange, second: C.red }, parts: [
    // MasterFoods-style shaker: tall narrow jar of ground spice, red flip cap, white label
    F('M22 16h20v38a3 3 0 0 1-3 3H25a3 3 0 0 1-3-3z'),
    F('M22 30h20v12H22z', null),
    F('M21 8h22v8H21z', 'second'),
    L('M26 12h1M32 12h1M38 12h1', 2.6),
    L('M26 22h12', 1.8, { o: .4 }),
    L('M26 48h12', 1.8, { o: .4 }),
  ]},
  yoghurt: { label: 'Yoghurt', pal: { main: C.blue, second: C.cream }, parts: [
    // pot with the foil lid peeled back
    F('M16 22h32l-3 26a4 4 0 0 1-4 4H23a4 4 0 0 1-4-4z'),
    L('M20 28c3 2 21 2 24 0', 2, { o: .45 }),
    F('M30 22h21c2-6 0-12-4-16-2 6-7 10-17 12z', 'second'),
    L('M40 20c3-3 5-6 6-10', 1.6, { o: .4 }),
    L('M13 22h38', 3),
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
