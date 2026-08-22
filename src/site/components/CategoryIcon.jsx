import { Leaf, LeafyGreen, Drumstick, Milk, Wheat, Egg, Croissant, Cookie, Beef } from 'lucide-react';

// Fallback glyph per storage category, used when an item doesn't name a
// more specific one of its own.
const categoryIcons = {
  produce: Leaf,
  meat: Drumstick,
  dairy: Milk,
  bakery: Wheat,
  pantry: Cookie,
};

// Per-item glyphs, opted into with an `icon` key in data.js. Lucide has no
// garlic, mushroom or cheese icon, so anything without a real match is left
// to fall back to its category rather than mapped to something misleading.
const itemIcons = {
  leaf: Leaf,
  leafyGreen: LeafyGreen,
  drumstick: Drumstick,
  beef: Beef,
  milk: Milk,
  egg: Egg,
  wheat: Wheat,
  croissant: Croissant,
  cookie: Cookie,
};

export default function CategoryIcon({ category, icon, size = 18 }) {
  const Icon = itemIcons[icon] || categoryIcons[category] || Leaf;
  return (
    <span className={`category-icon category-icon--${category}`}>
      <Icon size={size} strokeWidth={2} />
    </span>
  );
}
