import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { onLoadComplete, onLoadProgress } from '../loadingManager'

/** Flip to false to skip the loader and enter the site immediately. */
export const LOADER_ON = true

/** How long the first fact stays readable before we can exit. */
const MIN_FACT_MS = 2000

/**
 * Ceiling on the wait, whatever the network is doing. The scene is ~1.6MB, so
 * this is only reached on a connection slow enough that holding out longer would
 * read as a broken page rather than a loading one — better to open the doors on
 * a half-built room than to strand someone behind them.
 */
const MAX_WAIT_MS = 6000

const FOOD_FACTS = [
    'Households throw away about a third of the food they buy.',
    'A wrinkled apple is still perfect for baking.',
    'Milk often lasts days past its “best before” if it smells fine.',
    'Leftover mince makes tomorrow’s pasta better than today’s.',
    'The average fridge hides more forgotten food than empty space.',
    'Planning two meals ahead cuts waste more than any gadget.',
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

        // First fact visible immediately — no entrance flicker.
        gsap.set(factRef.current, { autoAlpha: 1, y: 0 })

        const setProgress = (p) => {
            if (fillRef.current) {
                gsap.to(fillRef.current, {
                    scaleX: Math.max(0.02, Math.min(1, p)),
                    duration: 0.25,
                    ease: 'power1.out',
                    overwrite: 'auto'
                })
            }
        }

        setProgress(0.02)

        const beginExit = () => {
            if (finishedRef.current) return
            finishedRef.current = true
            clearTimeout(factDelayTimer)
            clearInterval(factInterval)
            setProgress(1)

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
            if (finishedRef.current) return
            const remaining = MIN_FACT_MS - (performance.now() - startedAt)
            clearTimeout(exitTimer)
            if (remaining > 0) {
                exitTimer = setTimeout(beginExit, remaining)
            } else {
                beginExit()
            }
        }

        const unsubProgress = onLoadProgress((p) => setProgress(p))
        // Wait for the scene before opening the doors, since the manager reports
        // in as soon as the fridge itself is standing — the food items queue
        // behind it and land during the exit animation. tryExit still holds the
        // first fact for MIN_FACT_MS, so a fast connection can't flash past it.
        const unsubComplete = onLoadComplete(() => {
            setProgress(1)
            tryExit()
        })
        const hardStop = setTimeout(tryExit, MAX_WAIT_MS)

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
            unsubComplete()
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
