import { useEffect, useState } from 'react';
import { useLenis } from 'lenis/react';

// Desktop-only floating tab, rotated on its side. Hidden until the landing
// hero has scrolled away, then fades/rises into place. (Used to key off the
// 3D fridge scene instead of `.landing` — that scene is disabled for now, see
// Home.jsx, but `.landing` is the more durable anchor either way since it's
// always present regardless of whether the fridge scene comes back.)
// On mobile this is hidden entirely in favour of the plain link in the footer.
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const heroEl = document.querySelector('.landing');
    if (!heroEl) return undefined;

    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(heroEl);

    return () => observer.disconnect();
  }, []);

  return (
    <button
      type="button"
      className={`back-to-top${visible ? ' back-to-top--visible' : ''}`}
      onClick={() => {
        if (lenis) lenis.scrollTo(0);
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      BACK TO TOP
    </button>
  );
}
