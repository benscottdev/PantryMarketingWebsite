import { tickerItems } from '../data';
import CategoryIcon from './CategoryIcon';

export default function Ticker({ speed = 40 }) {
  const items = [...tickerItems, ...tickerItems];

  return (
    <div className="ticker">
      <div className="ticker__track" style={{ '--ticker-duration': `${speed}s` }}>
        {items.map((it, i) => (
          <div className="ticker__item" key={i}>
            <CategoryIcon category={it.category} size={14} />
            <span className="ticker__name">{it.name}</span>
            <span className="ticker__price">{it.price}</span>
            <span className="ticker__tag">{it.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
