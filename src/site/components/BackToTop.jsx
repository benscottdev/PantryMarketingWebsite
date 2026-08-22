import { useEffect, useState } from 'react';
import { useLenis } from 'lenis/react';

// Desktop-only floating tab, rotated on its side. Hidden until the 3D
// fridge has unpinned and scrolled away, then fades/rises into place.
// On mobile this is hidden entirely in favour of the plain link in the footer.
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const sceneEl = document.querySelector('.threejs');
    if (!sceneEl) return undefined;

    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(sceneEl);

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
