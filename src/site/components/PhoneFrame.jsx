// Shared iPhone shell: screenshots and in-phone UI sit in the screen hole,
// and `phoneFrame.avif` is the bezel / Dynamic Island / side buttons on top.

import frameUrl from '../../static/phoneFrame.avif?url'

export default function PhoneFrame({ variant, screenClass = '', children, ...rest }) {
  return (
    <div className={`device device--${variant}`} {...rest}>
      <div className={`device__screen ${screenClass}`.trim()}>{children}</div>
      <img className="device__frame" src={frameUrl} alt="" aria-hidden="true" draggable="false" />
    </div>
  )
}
