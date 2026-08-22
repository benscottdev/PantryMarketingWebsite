import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { ReactLenis, useLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger)

function LenisGsapBridge({ enabled }) {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return undefined

    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)

    // Lenis eases against wall-clock time, so one long frame — a shader
    // compile, a tab coming back to the foreground — advances it most of the way
    // to its target in a single step. Worse, the wheel events that queued up
    // while the main thread was busy all land at once beforehand, so the target
    // is already far down the page. Feed Lenis a clock that cannot jump, and
    // after a real stall drop the banked input rather than flinging the page.
    const MAX_STEP_MS = 50
    const STALL_MS = 250
    let clock = 0
    let prev = 0

    const update = (time) => {
      const now = time * 1000
      const step = prev ? now - prev : 0
      prev = now
      if (step > STALL_MS) lenis.reset()
      clock += Math.min(step, MAX_STEP_MS)
      lenis.raf(clock)
    }
    // Prioritised, so scroll position is advanced before anything else on the
    // ticker reads it: GSAP's own tween rendering, and the fridge scene's draw.
    // Without this the order depends on which effect registered first, and this
    // one waits for `lenis` to exist.
    gsap.ticker.add(update, false, true)
    // Lenis drives the frame loop, so GSAP must not try to compensate for
    // "lag" by clamping delta time — that desyncs scrubbed timelines.
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', onScroll)
      gsap.ticker.remove(update)
    }
  }, [lenis])

  useEffect(() => {
    if (!lenis) return
    if (enabled) lenis.start()
    else lenis.stop()
  }, [lenis, enabled])

  return null
}

export default function SmoothScroll({ children, enabled = true }) {
  const [reduceMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  
  const [isMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 900
  )

  if (reduceMotion) return children

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        anchors: true,
        duration: isMobile ? 1.2 : 1.1,
        // Smoother easing on mobile to prevent snapping
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        // More gradual orientation on mobile
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        // Smooth wheel multiplier - lower on mobile for finer control
        wheelMultiplier: isMobile ? 0.8 : 1,
        touchMultiplier: isMobile ? 1.5 : 2,
        // Prevent infinite scroll
        infinite: false,
        // Smoother lerp on mobile
        lerp: isMobile ? 0.08 : 0.1
      }}
    >
      <LenisGsapBridge enabled={enabled} />
      {children}
    </ReactLenis>
  )
}
