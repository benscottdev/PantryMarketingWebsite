import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { onLoadProgress, onSceneReady } from '../loadingManager'

/** Flip to false to skip the loader and enter the site immediately. */
export const LOADER_ON = true

/**
 * Whether the 3D fridge scene is mounted in Home.jsx and therefore driving
 * this loader. Flip it in the same commit as the `<Three>` import, never on
 * its own — the two paths below are mutually exclusive:
 *
 *  - true:  the doors wait for markSceneReady(), and the bar tracks real asset
 *           progress. This is what the loader was built for.
 *  - false: nothing ever calls markSceneReady(), so waiting on it would hang
 *           until the MAX_WAIT_MS ceiling. Progress and exit come from the
 *           document instead: creep the bar, open on window load.
 */
const SCENE_DRIVEN = false

/** How long the first fact stays readable before we can exit. */
const MIN_FACT_MS = 2000

/**
 * Ceiling on the wait, whatever the network is doing. Reaching this means the
 * scene never reported itself ready, so the doors open on a half-built room
 * rather than stranding someone behind them. It sits well past a cold first
 * load — the bytes are only half the wait, the Draco decode and shader compile
 * that follow are the rest.
 */
const MAX_WAIT_MS = 20000

/**
 * The same ceiling for the page-driven path. Far shorter, because there is no
 * multi-megabyte decode to wait on — only the document reaching `load`, and a
 * slow image or webfont should not hold the doors shut.
 */
const PAGE_WAIT_MS = 6000

/**
 * The bar can't sit still while several megabytes of Draco decode, but there is
 * no progress to report during it either, so it creeps to here and waits.
 */
const CREEP_TO = 0.97
const CREEP_MS = 9000

/**
 * The doors are the one animation nobody can miss, and they used to be kicked
 * off while the main thread was still busy — which left them frozen part-open,
 * for as long as the work took. So don't start until frames are actually being
 * delivered on time: three in a row inside a normal frame budget, or give up
 * waiting after this long and open anyway.
 */
const SMOOTH_FRAMES = 3
const SMOOTH_FRAME_MS = 34
const SETTLE_CAP_MS = 3000

/** Resolves on the first frame the main thread is keeping up. */
function whenFramesFlow(run) {
    let calm = 0
    let prev = performance.now()
    const startedAt = prev
    let raf = 0
    let done = false

    const finish = () => {
        if (done) return
        done = true
        cancelAnimationFrame(raf)
        clearTimeout(capTimer)
        run()
    }

    const tick = (now) => {
        const gap = now - prev
        prev = now
        calm = gap <= SMOOTH_FRAME_MS ? calm + 1 : 0
        if (calm >= SMOOTH_FRAMES || now - startedAt > SETTLE_CAP_MS) {
            finish()
            return
        }
        raf = requestAnimationFrame(tick)
    }

    // The cap inside tick() can only be reached if frames are being delivered
    // at all — and a browser pauses rAF entirely in a background tab. Opening
    // the site in one and coming back later would otherwise find the loader
    // exactly where it started. A real timer makes "give up and open anyway"
    // true whether or not frames flow.
    const capTimer = setTimeout(finish, SETTLE_CAP_MS)
    raf = requestAnimationFrame(tick)
    return () => {
        done = true
        cancelAnimationFrame(raf)
        clearTimeout(capTimer)
    }
}

const FOOD_FACTS = [
    // Every line here is either a verifiable figure or plain kitchen craft.
    // Nothing that reads as food-safety advice: 'use by' means use by.
    'The average Australian household bins one grocery bag in five.',
    'That is about $2,500 of food a year, and 265kg of it.',
    'A wrinkled apple is still perfect for baking.',
    '“Best before” is about quality. “Use by” is about safety.',
    'Leftover mince makes tomorrow’s pasta better than today’s.',
    'Most forgotten food is hiding behind something else.',
    'Soft herbs last longer standing in a glass of water.',
    'Freezing bread on day one beats binning it on day four.'
]

export default function Loader({ onFinished }) {
    const rootRef = useRef()
    const factRef = useRef()
    const fillRef = useRef()
    const leftDoorRef = useRef()
    const rightDoorRef = useRef()
    const [factIndex, setFactIndex] = useState(() => Math.floor(Math.random() * FOOD_FACTS.length))
    const finishedRef = useRef(false)
    const factReadyRef = useRef(false)

    useEffect(() => {
        if (!LOADER_ON) {
            onFinished?.()
            return
        }

        document.documentElement.classList.add('loader-lock')

        const startedAt = performance.now()
        let exitTimer
        let factDelayTimer
        let factInterval
        let exitTl
        let creepTween
        let cancelSettle
        let shown = 0

        // First fact visible immediately — no entrance flicker.
        gsap.set(factRef.current, { autoAlpha: 1, y: 0 })

        // The bar is driven from a value that only ever rises, and it is tweened
        // rather than set, so a batch of files landing together reads as a slide
        // instead of a hop.
        const setProgress = (p) => {
            if (!fillRef.current) return
            const next = Math.max(0.02, Math.min(1, p))
            if (next <= shown) return
            shown = next
            creepTween?.kill()
            creepTween = null
            gsap.to(fillRef.current, {
                scaleX: next,
                duration: 0.45,
                ease: 'power2.out',
                overwrite: 'auto'
            })
        }

        // Every byte is in and the scene is being decoded and compiled, which
        // reports nothing. Inch forward so the bar doesn't read as hung.
        const startCreep = (ms = CREEP_MS) => {
            if (creepTween || finishedRef.current || shown >= CREEP_TO) return
            creepTween = gsap.to(fillRef.current, {
                scaleX: CREEP_TO,
                duration: ms / 1000,
                ease: 'power2.out',
                overwrite: 'auto',
                onUpdate: () => {
                    shown = gsap.getProperty(fillRef.current, 'scaleX')
                }
            })
        }

        setProgress(0.02)

        const beginExit = () => {
            if (finishedRef.current) return
            finishedRef.current = true
            clearTimeout(factDelayTimer)
            clearInterval(factInterval)
            creepTween?.kill()
            gsap.to(fillRef.current, {
                scaleX: 1,
                duration: 0.3,
                ease: 'power2.out',
                overwrite: 'auto'
            })

            exitTl = gsap.timeline({
                defaults: { ease: 'power2.inOut' },
                onComplete: () => {
                    document.documentElement.classList.remove('loader-lock')
                    window.dispatchEvent(new Event('loader:finished'))
                    onFinished?.()
                }
            })

            exitTl.to(factRef.current, { autoAlpha: 0, y: -8, duration: 0.45 }, 0)
            exitTl.to('.loader-bar', { autoAlpha: 0, duration: 0.3 }, 0.1)
            exitTl.to(
                leftDoorRef.current,
                { xPercent: -100, duration: 0.85, ease: 'power3.inOut' },
                0.35
            )
            exitTl.to(
                rightDoorRef.current,
                { xPercent: 100, duration: 0.85, ease: 'power3.inOut' },
                0.35
            )
            exitTl.set(rootRef.current, { display: 'none' })
        }

        const tryExit = () => {
            if (finishedRef.current || cancelSettle) return
            const remaining = MIN_FACT_MS - (performance.now() - startedAt)
            clearTimeout(exitTimer)
            const settle = () => {
                cancelSettle = whenFramesFlow(() => {
                    cancelSettle = null
                    beginExit()
                })
            }
            if (remaining > 0) exitTimer = setTimeout(settle, remaining)
            else settle()
        }

        const unsubProgress = onLoadProgress((p, settled) => {
            setProgress(p)
            if (settled) startCreep()
        })
        // The doors wait for the scene to be genuinely ready to draw — every
        // model in, decoded, uploaded and compiled — not merely for the first
        // handful of files to arrive. tryExit still holds the first fact for
        // MIN_FACT_MS, so a warm cache can't flash past it.
        const unsubReady = onSceneReady(tryExit)
        const hardStop = setTimeout(tryExit, SCENE_DRIVEN ? MAX_WAIT_MS : PAGE_WAIT_MS)

        // Page-driven path: there is no asset stream, so nothing would ever move
        // the bar past its initial 0.02 or call tryExit at all. Creep over the
        // fact's own minimum rather than the scene's nine seconds, so the bar is
        // most of the way across by the time the doors are allowed to open.
        let onPageLoad
        if (!SCENE_DRIVEN) {
            startCreep(MIN_FACT_MS)
            if (document.readyState === 'complete') tryExit()
            else {
                onPageLoad = () => tryExit()
                window.addEventListener('load', onPageLoad, { once: true })
            }
        }

        // Only cycle facts if we're still here after the first fact has been read.
        factDelayTimer = setTimeout(() => {
            factInterval = setInterval(() => {
                if (finishedRef.current) return
                setFactIndex((i) => (i + 1) % FOOD_FACTS.length)
            }, 4000)
        }, MIN_FACT_MS)

        return () => {
            clearTimeout(exitTimer)
            clearTimeout(hardStop)
            clearTimeout(factDelayTimer)
            clearInterval(factInterval)
            unsubProgress()
            unsubReady()
            if (onPageLoad) window.removeEventListener('load', onPageLoad)
            cancelSettle?.()
            creepTween?.kill()
            exitTl?.kill()
            document.documentElement.classList.remove('loader-lock')
        }
    }, [onFinished])

    useEffect(() => {
        if (!LOADER_ON || !factRef.current) return
        // First fact is shown immediately; only animate later rotations.
        if (!factReadyRef.current) {
            factReadyRef.current = true
            return
        }
        gsap.fromTo(
            factRef.current,
            { autoAlpha: 0, y: 6 },
            { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }
        )
    }, [factIndex])

    if (!LOADER_ON) return null

    return (
        <div className="loader" ref={rootRef} aria-busy="true" aria-live="polite">
            <div className="loader-door loader-door--left" ref={leftDoorRef} />
            <div className="loader-door loader-door--right" ref={rightDoorRef} />

            <div className="loader-content">
                <p className="loader-fact" ref={factRef}>
                    {FOOD_FACTS[factIndex]}
                </p>
                <div className="loader-bar" aria-hidden="true">
                    <div className="loader-bar__fill" ref={fillRef} />
                </div>
            </div>
        </div>
    )
}
