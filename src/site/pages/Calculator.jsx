import Legal from '../Legal'
import Calc from '../components/Calculator'

export default function Calculator() {
  return (
    <Legal
      wide
      title="Waste calculator"
      heading={
        <>
          Run your own <em>numbers.</em>
        </>
      }
      eyebrow="THE MATHS"
      updated={false}
      lede="Three questions. Everything else comes from Australia’s own food-waste research, including the uncomfortable finding that the more you spend, the bigger the share you bin. Every figure is sourced at the bottom."
      description="Estimate what your household bins each year, from how often you shop, who you feed, and what you spend. Built from published Australian food-waste research."
    >
      <Calc />
    </Legal>
  )
}
