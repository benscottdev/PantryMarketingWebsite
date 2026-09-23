import WaitlistForm from './WaitlistForm'
import PhoneFrame from './PhoneFrame'
import homeShot from '../../static/home.png'

export default function Landing() {
  return (
    <section className="landing" data-landing aria-label="Pantry">
      <div className="landing__copy">

        <h1 className="landing__title">
          Stop throwing out the
          <br />
          <em>food you already paid for.</em>
        </h1>
        <p className="landing__sub">
          Photograph your receipt. Pantry tracks<br />every expiry date and tells you what to
          <strong> cook first</strong>.
        </p>
        <WaitlistForm variant="hero" />
      </div>

      <div className="landing__stage">
        <div className="landing__phone">
          <PhoneFrame variant="hero">
            <img className="landing__shot" src={homeShot} alt="Pantry home screen" draggable="false" />
          </PhoneFrame>
        </div>
      </div>
    </section>
  )
}
