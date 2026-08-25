import Legal from '../Legal'
import { PATHS } from '../launch'

export default function NotFound() {
  return (
    <Legal
      title="Page not found"
      eyebrow="404"
      updated={false}
      description="That page is not on the Pantry site."
    >
      <p>
        That URL does not exist. Head <a href={PATHS.home}>home</a>, browse{' '}
        <a href={PATHS.resources}>resources</a>, run the{' '}
        <a href={PATHS.calculator}>waste calculator</a>, check the{' '}
        <a href={PATHS.changelog}>changelog</a>, or try{' '}
        <a href={PATHS.support}>support</a>.
      </p>
    </Legal>
  )
}
