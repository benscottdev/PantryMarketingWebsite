import { useLenis } from 'lenis/react'
import WaitlistForm from './WaitlistForm'
import { FooterLegal, SiteMap } from './SiteMap'
import { APP_LIVE } from '../launch'

export default function Footer() {
  const lenis = useLenis()

  const toTop = (e) => {
    e.preventDefault()
    if (lenis) lenis.scrollTo(0)
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="waitlist" className="footer">
      <div className="footer__inner">
        <div className="footer__waitlist">
          <h2 className="footer__title">
            {APP_LIVE ? 'Pantry is live.' : 'Get in before launch.'}
          </h2>
          <WaitlistForm variant="cta" />
          {/* <p className="footer__note">
            {APP_LIVE ? 'FREE ON THE APP STORE.' : 'ONE EMAIL WHEN WE LAUNCH. MAYBE TWO.'}
          </p> */}
        </div>

        <SiteMap home onBrandClick={toTop} />
        <FooterLegal onTop={toTop} />
      </div>
    </footer>
  )
}
