// Builds index.html: five hero-interaction prototypes in one tabbed page.
// Run: node design/hero-options/build.mjs
import { ICONS, renderSvg } from '../icon-set/icons.mjs';
import { readFileSync, writeFileSync } from 'node:fs';

const FOODS = [
  { id: 'apple', name: 'Apples', days: 5, price: 4.2 },
  { id: 'milk', name: 'Milk 2L', days: 6, price: 3.1 },
  { id: 'egg', name: 'Eggs 12pk', days: 12, price: 6.5 },
  { id: 'fish', name: 'Salmon', days: 2, price: 12.9 },
  { id: 'greens', name: 'Spinach', days: 3, price: 3.5 },
  { id: 'carrot', name: 'Carrots', days: 14, price: 2.4 },
  { id: 'drumstick', name: 'Chicken', days: 3, price: 9.5 },
  { id: 'banana', name: 'Bananas', days: 4, price: 2.8 },
  { id: 'cheese', name: 'Cheddar', days: 21, price: 7.0 },
  { id: 'bread', name: 'Sourdough', days: 4, price: 6.0 },
];
const art = Object.fromEntries(FOODS.map((f) => [f.id, renderSvg(ICONS[f.id]).replace(/ width="64" height="64"/, '')]));

const tpl = readFileSync(new URL('./template.html', import.meta.url), 'utf8');
writeFileSync(
  new URL('./index.html', import.meta.url),
  tpl.replace('/*__DATA__*/', `const FOODS = ${JSON.stringify(FOODS)};\nconst ART = ${JSON.stringify(art)};`),
);
console.log('wrote index.html');
