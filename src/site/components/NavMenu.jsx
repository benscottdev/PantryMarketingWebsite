import { useEffect, useId, useRef, useState } from 'react'
import { PATHS } from '../launch'

export const HOME_MENU_ITEMS = [
  { label: 'How it works', href: '#how', hash: true },
  { label: 'Features', href: '#features', hash: true },
  { label: 'Resources', href: PATHS.resources },
  { label: 'Changelog', href: PATHS.changelog },
  { label: 'Support', href: PATHS.support },
]

export const PAGE_MENU_ITEMS = [
  { label: 'Home', href: PATHS.home },
  { label: 'How it works', href: `${PATHS.home}#how` },
  { label: 'Features', href: `${PATHS.home}#features` },
  { label: 'Resources', href: PATHS.resources },
  { label: 'Changelog', href: PATHS.changelog },
  { label: 'Support', href: PATHS.support },
]

export default function NavMenu({ items = HOME_MENU_ITEMS, onHashNavigate }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const btnRef = useRef(null)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
        btnRef.current?.focus()
      }
    }

    const onPointer = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false)
    }

    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  const onItemClick = (e, item) => {
    if (item.hash && onHashNavigate) {
      e.preventDefault()
      setOpen(false)
      onHashNavigate(item.href)
      return
    }
    setOpen(false)
  }

  return (
    <div ref={rootRef} className={`nav__menu${open ? ' is-open' : ''}`}>
      <button
        ref={btnRef}
        type="button"
        className="nav__burger"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="nav__burger-lines" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      {open ? (
        <div id={panelId} className="nav-tray" role="menu" aria-label="Site">
          {items.map((item) => (
            <a
              key={item.href + item.label}
              href={item.href}
              className="nav-tray__link"
              role="menuitem"
              onClick={(e) => onItemClick(e, item)}
            >
              <span className="nav-tray__chev" aria-hidden="true">
                &gt;
              </span>
              {item.label}
            </a>
          ))}
          <div className="nav-tray__meta">
            <a href={PATHS.privacy} className="nav-tray__sub">
              Privacy
            </a>
            <span aria-hidden="true">·</span>
            <a href={PATHS.terms} className="nav-tray__sub">
              Terms
            </a>
          </div>
        </div>
      ) : null}
    </div>
  )
}
