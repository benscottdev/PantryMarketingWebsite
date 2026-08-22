import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import * as THREE from 'three'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js'
import { createGLTFLoader, markSceneReady } from '../loadingManager'
import { REFRESH_PRIORITY } from '../scrollPriority'
import {
    AFTER_LAST_ITEM_VH,
    getScrollLengthVh,
    INTRO_VH,
    loadFridgeBody,
    STAGE_VH,
    wireExtrasScroll
} from './FridgeBody'

// The environment used to be kitchenhdr.exr, 0.62MB plus an EXR decode on the
// main thread. Measuring it settled what it was actually contributing: a smooth
// warm dome, mean linear RGB per horizontal band running 0.59 at the top to 0.90
// low down, with one 15-nit speck too small to reflect. Nothing there survives
// the PMREM convolution that a gradient can't reproduce, so these are those six
// measured bands, top to bottom, rebuilt as a texture at runtime.
const ENV_BANDS = [
    [0.592, 0.494, 0.375],
    [0.494, 0.431, 0.356],
    [0.49, 0.431, 0.362],
    [0.712, 0.657, 0.588],
    [0.899, 0.819, 0.735],
    [0.681, 0.632, 0.572]
]

/** Equirect dome interpolated from ENV_BANDS. 2:1, and tiny — it's a gradient. */
function createEnvTexture() {
    const w = 32
    const h = 16
    const data = new Float32Array(w * h * 4)
    const last = ENV_BANDS.length - 1
    for (let y = 0; y < h; y++) {
        const t = ((y + 0.5) / h) * last
        const i = Math.min(Math.floor(t), last - 1)
        const f = t - i
        const a = ENV_BANDS[i]
        const b = ENV_BANDS[i + 1]
        for (let x = 0; x < w; x++) {
            const o = (y * w + x) * 4
            data[o] = a[0] + (b[0] - a[0]) * f
            data[o + 1] = a[1] + (b[1] - a[1]) * f
            data[o + 2] = a[2] + (b[2] - a[2]) * f
            data[o + 3] = 1
        }
    }
    const tex = new THREE.DataTexture(data, w, h, THREE.RGBAFormat, THREE.FloatType)
    tex.mapping = THREE.EquirectangularReflectionMapping
    tex.colorSpace = THREE.LinearSRGBColorSpace
    tex.needsUpdate = true
    return tex
}

gsap.registerPlugin(ScrollTrigger)

// Stop the browser restoring scroll position on reload mid-pin
if (history.scrollRestoration) history.scrollRestoration = 'manual'

// ---------------------------------------------------------------------------
// Lighting rig
// ---------------------------------------------------------------------------
const LIGHTING = {
    exposure: 0.5,
    toneMapping: 'neutral',

    envIntensity: 0.4,
    envRotationY: 0,

    key: { intensity: 10, color: 0xffffff, position: [1.9, 4.0, 4.4] },
    bounce: { intensity: 0.2, color: 0xffffff, position: [5.1, 2.0, 8.0] },
    fill: { intensity: 6, color: 0xcfe0ff, position: [-5.5, 2.5, 2.0] },
    rim: { intensity: 10.9, color: 0xffffff, position: [-3.0, 4.0, -5.0] },
    ambient: { intensity: 3, sky: 0xffffff, ground: 0xa08b70 },

    ceiling: {
        intensity: 4,
        color: 0xffffff,
        width: 2.0,
        height: 0.4,
        position: [0, 3.0, 1.6]
    },


    interior: {
        intensity: 0,
        color: 0xffffff,
        width: 0.9,
        height: 0.5,
        position: [0, 1.32, 0.15],
        fill: 6,
        fillColor: 0xffffff,
        emissive: 6,
        emissiveColor: 0xffffff
    },


    shadowRadius: 9,
    shadowNormalBias: 0.005,
    shadowBias: 0,
    shadowMapSize: 2048
}

const DEBUG_LIGHTS =
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('lights')

/** `?perf` — a frame readout, so this scene can be tuned on numbers. */
const DEBUG_PERF =
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('perf')

const TONE_MAPPING = {
    neutral: THREE.NeutralToneMapping,
    agx: THREE.AgXToneMapping,
    aces: THREE.ACESFilmicToneMapping,
    reinhard: THREE.ReinhardToneMapping,
    linear: THREE.LinearToneMapping
}

const CAM = {
    desktop: {
        fov: 35,
        start: { y: 1, z: 9 },
        framed: { y: 1.7, z: 3.4 },
        exitY: 0.95,
        exitRotX: -0.053,
        dpr: 1.25,
        shadow: 2048,
        parallax: 0.05
    },
    // Phones and tablets render without MSAA (see the renderer's `antialias`),
    // so resolution is the only thing holding their edges together and 1.15 was
    // leaving the fridge visibly soft on a 3x screen. 1.75 keeps most of that
    // back for ~77% of the fragments a full 2 would cost — the scene can afford
    // it (one draw pass, no post-processing, a shadow map redrawn only while the
    // door swings), but it's the frame budget the pinned scroll shares.
    tablet: {
        fov: 40,
        start: { y: 1.08, z: 8.8 },
        framed: { y: 1.55, z: 4.5 },
        exitY: 1.15,
        exitRotX: -0.04,
        dpr: 1.75,
        shadow: 1536,
        parallax: 0.03
    },
    phone: {
        fov: 48,
        start: { y: 1.15, z: 10.5 },
        framed: { y: 1.42, z: 6.1 },
        exitY: 1.18,
        exitRotX: -0.03,
        dpr: 1.75,
        shadow: 1024,
        parallax: 0
    }
}

function currentCam() {
    const w = window.innerWidth
    if (w < 560) return CAM.phone
    if (w < 900) return CAM.tablet
    return CAM.desktop
}

// HUD type is CSS pixels; the fridge is a smaller projection on phone/tablet
// (see CAM z/fov). Keep the overlay scale in lockstep with those layouts.
function overlayScale(width = window.innerWidth) {
    if (width < 400) return 0.45
    if (width < 560) return 0.52
    if (width < 900) return 0.7
    return 1
}

function formatMoney(n) {
    return `$${n.toFixed(2)}`
}

// Material slots worth pre-uploading before the fridge meets a live frame.
const TEXTURE_SLOTS = [
    'map',
    'normalMap',
    'roughnessMap',
    'metalnessMap',
    'aoMap',
    'emissiveMap',
    'alphaMap',
    'bumpMap'
]

function nextFrame() {
    return new Promise((resolve) => requestAnimationFrame(resolve))
}

const lifeBadgeFill = gsap.utils.interpolate(['#b9ffa4', '#e8c44a', '#e07a5f'])

// `state` carries the last values written. Both custom properties feed the
// badge's background and text colour, so re-writing them invalidates style and
// repaints it — on every frame, for every tag, almost always with the string it
// already had. Writing only on a real change leaves the DOM identical.
function paintLifeBadge(el, remaining, startDays, state) {
    const spent = 1 - gsap.utils.clamp(0, 1, remaining / Math.max(startDays, 0.01))
    // Front-load the shift so the mint reads as aging well before expiry.
    const t = Math.pow(spent, 0.65)
    const bg = lifeBadgeFill(t)
    const fg = t < 0.28 ? '#111' : '#fff'
    if (state) {
        if (bg !== state.bg) {
            state.bg = bg
            el.style.setProperty('--life-bg', bg)
        }
        if (fg !== state.fg) {
            state.fg = fg
            el.style.setProperty('--life-fg', fg)
        }
        return
    }
    el.style.setProperty('--life-bg', bg)
    el.style.setProperty('--life-fg', fg)
}

export default function Three({ children }) {
    const mountRef = useRef()
    const wastedHudEl = useRef()
    const wastedEl = useRef()
    const popupsEl = useRef()
    const lifeLabelsEl = useRef()
    const scrollHintEl = useRef()

    useEffect(() => {
        const mount = mountRef.current
        let disposed = false

        RectAreaLightUniformsLib.init()

        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0x184534)

        const camGroup = new THREE.Group()
        camGroup.position.set(0, currentCam().start.y, currentCam().start.z)
        scene.add(camGroup)

        const camera = new THREE.PerspectiveCamera(currentCam().fov, 1, 0.1, 1000)
        camGroup.add(camera)

        const renderer = new THREE.WebGLRenderer({
            antialias: window.innerWidth >= 900,
            alpha: false,
            powerPreference: 'high-performance'
        })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, currentCam().dpr))
        renderer.setClearColor(0x184534, 1)
        renderer.outputColorSpace = THREE.SRGBColorSpace
        renderer.toneMapping = TONE_MAPPING[LIGHTING.toneMapping] ?? THREE.NeutralToneMapping
        // CSS filter on a WebGL canvas forces a compositor copy every frame
        // (GPU memory grows while the tab sits open). Bake the old
        // brightness(1.0747) into exposure instead.
        renderer.toneMappingExposure = LIGHTING.exposure * 1.0747
        renderer.shadowMap.enabled = true
        // r185 dropped the PCF_SOFT branch: PCFSoftShadowMap has no define left,
        // so it falls through to SHADOWMAP_TYPE_BASIC — one hard tap, with
        // shadow.radius ignored. PCF is the soft one now (a five-tap Vogel disk
        // scaled by radius), which is what window light needs.
        renderer.shadowMap.type = THREE.PCFShadowMap
        // Left on autoUpdate this redraws a 2048² depth map from the whole caster
        // set on every frame — a second full scene render — and the scene almost
        // never changes. The only things that move it are the door swinging and
        // items vanishing, both driven by the scrubbed timeline; the parallax
        // drift moves the camera, which a directional light's shadow doesn't care
        // about. So the map is redrawn while the timeline is being scrubbed and
        // for a tail afterwards long enough to cover the vanish tween a scrub can
        // kick off, and left alone the rest of the time — which is most frames.
        renderer.shadowMap.autoUpdate = false
        mount.appendChild(renderer.domElement)

        const SHADOW_TAIL_MS = 750
        let shadowLiveUntil = 0
        function markShadowDirty(ms = SHADOW_TAIL_MS) {
            shadowLiveUntil = Math.max(shadowLiveUntil, performance.now() + ms)
        }

        let lastW = 0
        let lastH = 0
        const parallax = { strength: currentCam().parallax, ease: 0.05 }
        const cursor = { x: 0, y: 0 }
        const look = { x: 0, y: 0 }
        const finePointer = window.matchMedia('(pointer: fine)')

        function applyLayout() {
            const c = currentCam()
            camera.fov = c.fov
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, c.dpr))
            parallax.strength = finePointer.matches ? c.parallax : 0
            if (key && key.shadow.mapSize.x !== c.shadow) {
                key.shadow.mapSize.set(c.shadow, c.shadow)
                key.shadow.map?.dispose()
                key.shadow.map = null
                markShadowDirty()
            }
        }

        // Measured off the mount, not the viewport. While pinned the scene is
        // `position: fixed` at a size ScrollTrigger wrote onto it, and unpinned
        // it is a `100dvh` box — either way its own box is the only thing the
        // canvas has to match. Sizing from visualViewport instead let the two
        // disagree by the height of the URL bar, which stretched the render.
        function sizeRenderer() {
            applyLayout()
            const w = mount.clientWidth || window.innerWidth
            const h = mount.clientHeight || window.innerHeight
            if (w < 64 || h < 64) return
            if (w === lastW && h === lastH) {
                camera.updateProjectionMatrix()
                return
            }
            lastW = w
            lastH = h
            camera.aspect = w / h
            camera.updateProjectionMatrix()
            renderer.setSize(w, h, false)
            const scale = String(overlayScale(w))
            lifeLabelsEl.current?.style.setProperty('--hud-scale', scale)
            popupsEl.current?.style.setProperty('--hud-scale', scale)
            // Deliberately no ScrollTrigger.refresh() here. On mobile this runs
            // every time the URL bar slides, and a refresh re-measures the pin
            // and re-sizes its spacer mid-scroll — the page-wide jump, and the
            // exact thing ignoreMobileResize exists to prevent.
        }

        // Built in place rather than fetched, which also means it is present
        // before any model is: an environment arriving late changes every
        // material's shader defines, and the old EXR callback had to trigger a
        // second round of compiling to keep that off a live frame.
        const envTexture = createEnvTexture()
        scene.environment = envTexture
        if (scene.environmentRotation?.isEuler) {
            scene.environmentRotation.set(0, LIGHTING.envRotationY, 0)
        }
        if ('environmentIntensity' in scene) {
            scene.environmentIntensity = LIGHTING.envIntensity
        }

        function cursorLoc(event) {
            if (!finePointer.matches) return
            cursor.x = (event.clientX / window.innerWidth - 0.5) * 2
            cursor.y = -(event.clientY / window.innerHeight - 0.5) * 2
        }
        document.addEventListener('mousemove', cursorLoc)

        const key = new THREE.DirectionalLight(LIGHTING.key.color, LIGHTING.key.intensity)
        key.position.set(...LIGHTING.key.position)
        key.castShadow = true
        key.shadow.mapSize.set(currentCam().shadow, currentCam().shadow)
        key.shadow.bias = LIGHTING.shadowBias
        key.shadow.normalBias = LIGHTING.shadowNormalBias
        key.shadow.radius = LIGHTING.shadowRadius
        scene.add(key)
        scene.add(key.target)

        const bounce = new THREE.DirectionalLight(LIGHTING.bounce.color, LIGHTING.bounce.intensity)
        bounce.position.set(...LIGHTING.bounce.position)
        scene.add(bounce)

        const fill = new THREE.DirectionalLight(LIGHTING.fill.color, LIGHTING.fill.intensity)
        fill.position.set(...LIGHTING.fill.position)
        scene.add(fill)

        const rim = new THREE.DirectionalLight(LIGHTING.rim.color, LIGHTING.rim.intensity)
        rim.position.set(...LIGHTING.rim.position)
        scene.add(rim)

        const ambient = new THREE.HemisphereLight(
            LIGHTING.ambient.sky,
            LIGHTING.ambient.ground,
            LIGHTING.ambient.intensity
        )
        scene.add(ambient)

        const ceilingLight = new THREE.RectAreaLight(
            LIGHTING.ceiling.color,
            LIGHTING.ceiling.intensity,
            LIGHTING.ceiling.width,
            LIGHTING.ceiling.height
        )
        ceilingLight.position.set(...LIGHTING.ceiling.position)
        ceilingLight.lookAt(LIGHTING.ceiling.position[0], 0, LIGHTING.ceiling.position[2])
        scene.add(ceilingLight)

        sizeRenderer()
        window.addEventListener('resize', sizeRenderer)
        window.visualViewport?.addEventListener('resize', sizeRenderer)

        let interiorLight = null

        /** Panel, fill and emissive strip all read from LIGHTING.interior. */
        function applyInterior() {
            const cfg = LIGHTING.interior
            if (interiorLight) {
                interiorLight.color.set(cfg.color)
                interiorLight.intensity = cfg.intensity
                // A rect area light is the most expensive type three has — an LTC
                // integration per fragment of every lit material — and three does
                // not skip one sitting at zero intensity, so an unused panel is
                // still paid for on every pixel. Detach it instead of leaving it
                // in the scene contributing nothing; raising the intensity in the
                // debug GUI puts it back.
                const wanted = cfg.intensity > 0
                if (wanted && !interiorLight.parent) fridge?.root.add(interiorLight)
                else if (!wanted && interiorLight.parent) interiorLight.parent.remove(interiorLight)
            }
            if (fridge?.interiorLight) {
                fridge.interiorLight.color.set(cfg.fillColor)
                fridge.interiorLight.intensity = cfg.fill
            }
            fridge?.root.traverse((o) => {
                if (!o.isMesh) return
                const mats = Array.isArray(o.material) ? o.material : [o.material]
                mats.forEach((m) => {
                    if (m?.name !== 'LIGHT') return
                    m.emissive.set(cfg.emissiveColor)
                    m.emissiveIntensity = cfg.emissive
                })
            })
        }

        // Slack around the casters for their shadows to land in. A frustum fitted
        // exactly to the casters would clip the shadows themselves, since those
        // fall away from the light and well outside the objects throwing them.
        const SHADOW_PAD = 1.6

        function fitKeyShadow(root) {
            root.updateMatrixWorld(true)

            // Fit the casters, not the room. The kitchen set is metres wide and
            // most of it can only receive, so measuring the lot spent the depth
            // map on surfaces that never write to it — coarse texels, and a bias
            // big enough to detach every contact shadow to hide the artefacts.
            const box = new THREE.Box3()
            root.traverse((o) => {
                if (o.isMesh && o.castShadow) box.expandByObject(o)
            })
            if (box.isEmpty()) box.setFromObject(root)

            const center = box.getCenter(new THREE.Vector3())
            key.target.position.copy(center)
            key.target.updateMatrixWorld()

            const size = box.getSize(new THREE.Vector3())
            const half = Math.max(size.x, size.y, size.z) * 0.65 + SHADOW_PAD
            const dist = key.position.distanceTo(center)
            const cam = key.shadow.camera

            if (DEBUG_LIGHTS) {
                let casters = 0
                root.traverse((o) => o.isMesh && o.castShadow && (casters += 1))
                console.log(
                    `[shadow] ${casters} casters, frustum ${(half * 2).toFixed(2)} wide ` +
                    `(${((half * 2 * 1000) / key.shadow.mapSize.x).toFixed(1)}mm/texel), ` +
                    `centre ${center.toArray().map((n) => n.toFixed(2))}`
                )
            }
            cam.left = -half
            cam.right = half
            cam.top = half
            cam.bottom = -half
            // Bracket the depth range to the casters as well: an ortho shadow
            // camera reaching from 0.5 to the far side of the room throws away
            // most of its depth precision.
            cam.near = Math.max(0.1, dist - half * 2)
            cam.far = dist + half * 2
            cam.updateProjectionMatrix()
        }

        const totals = { wasted: 0 }
        const display = { wasted: 0 }
        const popupTweens = []
        const lifeHud = []
        const _lifeWorld = new THREE.Vector3()
        const _lifeTmp = new THREE.Vector3()

        if (wastedHudEl.current) gsap.set(wastedHudEl.current, { autoAlpha: 0 })

        function paintCounters() {
            if (wastedEl.current) wastedEl.current.textContent = formatMoney(display.wasted)
        }
        paintCounters()

        function punchTotal() {
            if (!wastedEl.current) return
            gsap.fromTo(
                wastedEl.current,
                { scale: 1 },
                {
                    scale: 1.12,
                    duration: 0.22,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power2.out',
                    overwrite: 'auto'
                }
            )
        }

        function animateCounters() {
            gsap.to(display, {
                wasted: totals.wasted,
                duration: 0.55,
                ease: 'power2.out',
                overwrite: 'auto',
                onUpdate: paintCounters
            })
            punchTotal()
        }

        const _ndc = new THREE.Vector3()

        function worldToOverlay(world) {
            _ndc.copy(world).project(camera)
            const w = lastW || mount.clientWidth
            const h = lastH || mount.clientHeight
            return {
                x: (_ndc.x * 0.5 + 0.5) * w,
                y: (-_ndc.y * 0.5 + 0.5) * h
            }
        }

        function spawnStatusPopup({ price, thrownOut, world }) {
            if (!popupsEl.current) return
            const { x, y } = worldToOverlay(world)
            const el = document.createElement('div')
            el.className = thrownOut ? 'waste-popup waste-popup--waste' : 'waste-popup waste-popup--used'
            el.innerHTML = thrownOut
                ? `<span class="waste-popup__amt"><span class="waste-popup__cur">-$</span>${Number(price).toFixed(2)}</span>`
                : `<span class="waste-popup__copy">Used before<br>expiry!</span>`
            el.style.left = `${x}px`
            el.style.top = `${y}px`
            popupsEl.current.appendChild(el)

            const s = overlayScale(lastW) * 0.75
            const tw = gsap.timeline({
                onComplete: () => {
                    el.remove()
                    const i = popupTweens.indexOf(tw)
                    if (i >= 0) popupTweens.splice(i, 1)
                }
            })
            tw.fromTo(
                el,
                { xPercent: -50, yPercent: -50, x: 0, y: 8 * s, scale: 0.86 * s, opacity: 0 },
                {
                    y: 0,
                    scale: s,
                    opacity: 1,
                    duration: 0.32,
                    ease: 'power2.out'
                }
            )

            if (thrownOut && wastedEl.current) {
                const host = popupsEl.current.getBoundingClientRect()
                const tgt = wastedEl.current.getBoundingClientRect()
                const destX = tgt.left + tgt.width * 0.5 - host.left - x
                const destY = tgt.top + tgt.height * 0.5 - host.top - y
                tw.to(
                    el,
                    {
                        x: destX,
                        y: destY,
                        scale: 0.42 * s,
                        opacity: 0,
                        duration: 0.72,
                        ease: 'power2.in',
                        onComplete: animateCounters
                    },
                    '>-0.02'
                )
            } else {
                tw.to(el, {
                    y: -56 * s,
                    opacity: 0,
                    duration: 0.7,
                    ease: 'power2.in'
                })
            }
            popupTweens.push(tw)
        }

        function lifeTagLabel(parts) {
            const labeled = parts.find((p) => p.cfg.label)
            if (labeled) return labeled.cfg.label
            const group = parts[0]?.cfg.lifeGroup
            if (group) return group.charAt(0).toUpperCase() + group.slice(1)
            return parts[0]?.cfg.name ?? ''
        }

        function addLifeTag(parts) {
            const host = lifeLabelsEl.current
            const lead = parts[0]
            const days = lead.cfg.lifeDays
            const el = document.createElement('div')
            el.className = 'life-tag'
            el.style.setProperty('--drift-delay', `${lifeHud.length * 0.45}s`)
            el.innerHTML = `<span class="life-tag__inner"><span class="life-tag__name">${lifeTagLabel(parts)}</span><span class="life-tag__days"><span class="life-tag__n">${days}</span><span class="life-tag__unit">${days === 1 ? 'day' : 'days'}</span></span></span>`
            paintLifeBadge(el, days, days)
            host.appendChild(el)
            gsap.set(el, { autoAlpha: 0 })
            lifeHud.push({
                el,
                nEl: el.querySelector('.life-tag__n'),
                unitEl: el.querySelector('.life-tag__unit'),
                parts,
                lastDays: days,
                // Last values written to the DOM, so per-frame repaints can be
                // skipped whenever they haven't actually changed.
                bg: null,
                fg: null,
                lastTransform: '',
                hidden: false,
                phase: lifeHud.length * 1.7
            })
        }

        function buildLifeHud(extras) {
            const host = lifeLabelsEl.current
            if (!host) return
            host.replaceChildren()
            lifeHud.length = 0
            const list = Object.values(extras)
            const grouped = new Set()
            for (const part of list) {
                const group = part.cfg.lifeGroup
                if (group) {
                    if (grouped.has(group)) continue
                    grouped.add(group)
                    const members = list.filter((p) => p.cfg.lifeGroup === group)
                    if (!members.some((p) => p.cfg.showTimeLeft && p.cfg.lifeDays != null)) continue
                    addLifeTag(members)
                    continue
                }
                if (!part.cfg.showTimeLeft || part.cfg.lifeDays == null) continue
                addLifeTag([part])
            }
        }

        function paintLife() {
            for (const item of lifeHud) {
                const { el, nEl, unitEl, parts } = item
                const alive = parts.filter((p) => !p._removed)
                if (alive.length === 0) {
                    if (!item.hidden) {
                        item.hidden = true
                        el.classList.add('life-tag--gone')
                    }
                    continue
                }

                if (item.hidden) {
                    item.hidden = false
                    el.classList.remove('life-tag--gone')
                }

                const source = alive.find((p) => p.life) ?? alive[0]
                const startDays = source.cfg.lifeDays ?? 0
                const remaining = Math.max(0, source.life?.d ?? startDays)
                const days = Math.max(0, Math.ceil(remaining))
                paintLifeBadge(el, remaining, startDays, item)
                if (days !== item.lastDays) {
                    item.lastDays = days
                    nEl.textContent = String(days)
                    if (unitEl) unitEl.textContent = days === 1 ? 'day' : 'days'
                    el.classList.remove('life-tag--roll')
                    void el.offsetWidth
                    el.classList.add('life-tag--roll')
                }

                _lifeWorld.set(0, 0, 0)
                let n = 0
                for (const part of alive) {
                    if (!part.lifeAnchor) continue
                    _lifeTmp.copy(part.lifeAnchor).applyMatrix4(part.scene.matrixWorld)
                    _lifeWorld.add(_lifeTmp)
                    n += 1
                }
                if (!n) continue
                _lifeWorld.multiplyScalar(1 / n)
                const { x, y } = worldToOverlay(_lifeWorld)
                const transform = `translate(${x}px, ${y}px) translate(-50%, -100%)`
                if (transform !== item.lastTransform) {
                    item.lastTransform = transform
                    el.style.transform = transform
                }
            }
        }

        function onRemoved(evt) {
            if (evt.thrownOut) totals.wasted += evt.price
            // The item now shrinks and spins out over 0.55s of real time, so it
            // keeps moving after the scroll that triggered it has stopped.
            markShadowDirty()
            spawnStatusPopup(evt)
        }

        function onRestored(evt) {
            markShadowDirty()
            if (evt.thrownOut) {
                totals.wasted = Math.max(0, totals.wasted - evt.price)
                animateCounters()
            }
        }

        const gltfLoader = createGLTFLoader()
        let fridge = null

        const scrollVh = getScrollLengthVh()
        const introDur = INTRO_VH / STAGE_VH
        const totalDur = scrollVh / STAGE_VH
        
        const isMobile = window.innerWidth < 900

        const scrollTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.threejs',
                pin: true,
                start: 'top top',
                // One screen of scroll means one of *this* element's screens.
                // Reading a viewport height here instead let the pin be 100dvh
                // tall while its scroll distance was counted in visualViewport
                // heights, so the timeline ran out before the pin released.
                end: () => `+=${(scrollVh / 100) * (mount.clientHeight || window.innerHeight)}`,
                // Lenis already eases the scroll position on touch, and scrub
                // smoothing on top of it eases towards a target that is itself
                // still easing. Reversing direction then unwinds both, which is
                // the rubber-banding on the way back up.
                scrub: true,
                // anticipatePin guesses the pin early from scroll velocity. That
                // guess is wrong under smooth scrolling on touch and shows up as
                // a jump at the top of the scene; desktop still wants it.
                anticipatePin: isMobile ? 0 : 1,
                invalidateOnRefresh: true,
                refreshPriority: REFRESH_PRIORITY.FRIDGE,
                onRefresh: (self) => {
                    sizeRenderer()
                    const spacer = self.pin?.parentElement
                    if (spacer?.classList.contains('pin-spacer')) {
                        spacer.style.background = '#184534'
                    }
                },
                onLeave: () => renderer.render(scene, camera),
                onLeaveBack: () => renderer.render(scene, camera)
            }
        })

        scrollTl.fromTo(
            camGroup.position,
            { y: () => currentCam().start.y, z: () => currentCam().start.z },
            { y: () => currentCam().framed.y, z: () => currentCam().framed.z, duration: introDur, ease: 'none' },
            0
        )

        const exitDur = AFTER_LAST_ITEM_VH / STAGE_VH
        const exitAt = totalDur - exitDur
        scrollTl.fromTo(
            camGroup.position,
            { y: () => currentCam().framed.y },
            { y: () => currentCam().exitY, duration: exitDur, ease: 'none', immediateRender: false },
            exitAt
        )
        scrollTl.fromTo(
            camGroup.rotation,
            { x: 0 },
            { x: () => currentCam().exitRotX, duration: exitDur, ease: 'none', immediateRender: false },
            exitAt
        )

        if (wastedHudEl.current) {
            scrollTl.fromTo(
                wastedHudEl.current,
                { autoAlpha: 0, y: -10, xPercent: -50 },
                { autoAlpha: 1, y: 10, xPercent: -50, duration: introDur * 0.45, ease: 'none' },
                0
            )
        }

        if (scrollHintEl.current) {
            // Stays up for the whole pin so it's still there after the door
            // opens, then fades with the camera exit as the scene lets go.
            scrollTl.to(
                scrollHintEl.current,
                { autoAlpha: 0, duration: exitDur, ease: 'none' },
                exitAt
            )
        }

        loadFridgeBody(gltfLoader)
            .then(async (loaded) => {
                if (disposed) {
                    loaded.dispose()
                    return
                }
                fridge = loaded
                warming = true
                syncLoop()
                scene.add(fridge.root)

                // Shadow roles are decided per part as it loads (see FridgeBody):
                // overriding them all to cast here is what put the wall and the
                // benches in the caster set, and a wall that casts is a wall that
                // shadows itself.
                fridge.root.traverse((o) => {
                    if (!o.isMesh) return
                    const mats = Array.isArray(o.material) ? o.material : [o.material]
                    mats.forEach((m) => {
                        if (!m || !m.isMeshStandardMaterial) return
                        m.envMapIntensity = LIGHTING.envIntensity
                        if (m.roughness < 0.08) m.roughness = 0.08
                        // Every material in these GLBs is exported double-sided,
                        // and three maps DoubleSide straight through to the depth
                        // pass. That writes lit front faces into the shadow map,
                        // so each surface shadows itself and only a heavy bias
                        // hides it — which erases the real shadows along with the
                        // artefacts. Casting from back faces is what three does
                        // for a front-sided material, and it's the reason a
                        // normal scene needs almost no bias at all. Transparent
                        // parts (glass shelves, leaves) keep the default; they
                        // have no inside for the depth pass to find.
                        if (o.castShadow && !m.transparent) m.shadowSide = THREE.BackSide
                    })
                })

                fitKeyShadow(fridge.root)
                markShadowDirty()

                interiorLight = new THREE.RectAreaLight(
                    LIGHTING.interior.color,
                    LIGHTING.interior.intensity,
                    LIGHTING.interior.width,
                    LIGHTING.interior.height
                )
                interiorLight.position.set(...LIGHTING.interior.position)
                interiorLight.rotation.x = -Math.PI / 2
                // applyInterior() decides whether this is worth attaching at all.
                applyInterior()

                scrollTl.to(fridge.door.rotation, { y: Math.PI / 2, duration: introDur * 0.5, ease: 'none' }, 0)
                buildLifeHud(fridge.extras)
                if (lifeHud.length) {
                    scrollTl.to(
                        lifeHud.map((item) => item.el),
                        { autoAlpha: 1, duration: introDur * 0.25, ease: 'none' },
                        introDur * 0.4
                    )
                }
                wireExtrasScroll(scrollTl, fridge.extras, { onRemoved, onRestored })
                // Nothing about the page's layout changed when the model landed,
                // so re-apply the scrubbed progress instead of measuring every
                // trigger again: a refresh resizes the pin spacer, which makes
                // Lenis re-read the document and drop the scroll it was already
                // easing towards — the stall-then-jump this used to cause.
                ScrollTrigger.update()

                await warmUp(fridge.root)
                // Only now is there a frame the loader can hand over to: every
                // texture is uploaded and every program compiled, so the door
                // animation has the main thread to itself.
                markSceneReady()
            })
            .catch((err) => {
                console.error('Fridge load failed', err)
                // Nobody should be held behind the doors by a model that is
                // never going to arrive.
                markSceneReady()
            })

        let lastDoorY = null
        let shadowRedraws = 0

        // Styled inline rather than in the stylesheet: it is a debug readout, not
        // part of the page. Frame time is the gap between rendered frames, so it
        // counts everything else on the main thread too, not just this scene —
        // which is the point, since the scroll it stutters is shared.
        const perf = DEBUG_PERF ? (() => {
            const el = document.createElement('div')
            el.style.cssText =
                'position:fixed;left:8px;bottom:8px;z-index:9999;padding:6px 9px;' +
                'border-radius:6px;background:rgba(0,0,0,.72);color:#b9ffa4;' +
                'font:600 11px/1.5 ui-monospace,monospace;white-space:pre;pointer-events:none'
            document.body.appendChild(el)
            const aa = renderer.getContext().getContextAttributes()?.antialias
            let frames = 0
            let worst = 0
            let last = performance.now()
            let since = last
            return {
                frame() {
                    const now = performance.now()
                    const dt = now - last
                    last = now
                    frames += 1
                    if (dt > worst) worst = dt
                    if (now - since < 500) return
                    const { render, memory, programs } = renderer.info
                    el.textContent =
                        `${Math.round((frames * 1000) / (now - since))} fps  worst ${worst.toFixed(1)}ms\n` +
                        `${render.calls} calls  ${Math.round(render.triangles / 1000)}k tris\n` +
                        `shadow ${shadowRedraws} / ${frames} frames\n` +
                        `dpr ${renderer.getPixelRatio()}  aa ${aa ? 'on' : 'off'}\n` +
                        `${programs?.length ?? 0} programs  ${memory.textures} tex  ${memory.geometries} geo`
                    frames = 0
                    worst = 0
                    shadowRedraws = 0
                    since = now
                },
                dispose() {
                    el.remove()
                }
            }
        })() : null

        function animate() {
            const targetX = cursor.x * parallax.strength
            const targetY = cursor.y * parallax.strength

            look.x += (targetX - look.x) * parallax.ease
            look.y += (targetY - look.y) * parallax.ease
            camera.position.x = look.x
            camera.position.y = look.y * 4
            camera.rotation.x = look.y * 20
            camera.rotation.set(0, 0, 0)
            paintLife()

            // A directional light's shadow map depends only on where the casters
            // are. The camera drifting can't invalidate it, and neither can a
            // texture ageing, so scrolling on its own is not a reason to redraw
            // it — which is what the old blanket "dirty on every scroll tick"
            // amounted to. The door is the one caster the scrub actually moves;
            // items move only while a vanish tween runs, and onRemoved covers it.
            if (fridge && fridge.door.rotation.y !== lastDoorY) {
                lastDoorY = fridge.door.rotation.y
                renderer.shadowMap.needsUpdate = true
            }
            // Only ever raised, never cleared: three lowers it itself once it has
            // redrawn the map, and the debug GUI asks for updates the same way.
            if (performance.now() < shadowLiveUntil) renderer.shadowMap.needsUpdate = true
            if (renderer.shadowMap.needsUpdate) shadowRedraws += 1
            renderer.render(scene, camera)
            perf?.frame()
        }

        let sceneVisible = true
        let loopOn = false
        // While the freshly loaded fridge is being warmed up the loop stays
        // parked, so the canvas holds its last frame rather than compiling every
        // shader inside one render. See warmUp().
        let warming = false
        function startLoop() {
            if (disposed || loopOn) return
            loopOn = true
            // The timeline can have been scrubbed, and the warm-up can have run
            // long, while the loop was parked and nothing was consuming the dirty
            // flag. Whatever the map holds is stale on the way back in.
            renderer.shadowMap.needsUpdate = true
            // Rendering rides GSAP's ticker rather than three's own rAF. Two
            // independent rAF loops leave the order down to whichever registered
            // first — and since the loop re-registers every time the scene scrolls
            // back into view, that race is re-run at arbitrary moments. Losing it
            // means drawing before Lenis has advanced and ScrollTrigger has
            // scrubbed, so the frame shows the *previous* frame's scroll position.
            // That reads as judder while scrolling rather than as a low frame rate.
            gsap.ticker.add(animate)
        }
        function stopLoop({ render = true } = {}) {
            if (!loopOn) return
            loopOn = false
            gsap.ticker.remove(animate)
            if (render) renderer.render(scene, camera)
        }
        function syncLoop() {
            if (!disposed && !warming && sceneVisible && document.visibilityState === 'visible') {
                startLoop()
            } else {
                stopLoop({ render: !warming && !disposed })
            }
        }

        /**
         * Handing a fully textured GLB to a live scene compiles every shader and
         * uploads every texture inside a single frame. That frame runs for
         * hundreds of milliseconds, and since the pinned scene only starts
         * rendering once it scrolls into view, the cost lands exactly as someone
         * leaves the hero: the page stops responding, wheel deltas bank up in
         * Lenis, and the scroll then lurches to catch up. So park the loop, pay
         * for the uploads a few milliseconds at a time, and let the driver
         * compile the programs in parallel before rendering again.
         */
        let warmToken = 0
        async function warmUp(root) {
            const token = ++warmToken
            const stale = () => disposed || token !== warmToken
            warming = true
            syncLoop()

            const textures = new Set()
            root.traverse((o) => {
                if (!o.isMesh) return
                const mats = Array.isArray(o.material) ? o.material : [o.material]
                for (const m of mats) {
                    if (!m) continue
                    for (const slot of TEXTURE_SLOTS) {
                        if (m[slot]) textures.add(m[slot])
                    }
                }
            })

            const queue = [...textures]
            let i = 0
            while (i < queue.length) {
                const until = performance.now() + 6
                while (i < queue.length && performance.now() < until) {
                    renderer.initTexture(queue[i])
                    i += 1
                }
                await nextFrame()
                if (stale()) return
            }

            await renderer.compileAsync(root, camera, scene)
            if (stale()) return

            warming = false
            syncLoop()
        }

        const visIo = new IntersectionObserver(([entry]) => {
            sceneVisible = entry.isIntersecting
            syncLoop()
        })
        visIo.observe(mount)
        document.addEventListener('visibilitychange', syncLoop)
        startLoop()

        const raf = requestAnimationFrame(() => ScrollTrigger.refresh())
        const onLoaderFinished = () => ScrollTrigger.refresh()
        window.addEventListener('loader:finished', onLoaderFinished)

        let disposeGui = null
        if (DEBUG_LIGHTS) {
            import('./lightingGui')
                .then(({ mountLightingGui }) => {
                    if (disposed) return
                    disposeGui = mountLightingGui({
                        lighting: LIGHTING,
                        renderer,
                        scene,
                        lights: { key, bounce, fill, rim, ambient },
                        onKeyMoved: () => fridge && fitKeyShadow(fridge.root),
                        onInterior: applyInterior,
                        // The loop parks itself whenever the scene is off screen,
                        // so a slider needs to ask for the frame it changed.
                        onChange: () => {
                            if (!disposed && !warming && !loopOn)
                                renderer.render(scene, camera)
                        }
                    })
                })
                .catch((err) => console.error('Lighting GUI failed to load', err))
        }

        return () => {
            disposed = true
            perf?.dispose()
            disposeGui?.()
            visIo.disconnect()
            document.removeEventListener('visibilitychange', syncLoop)
            stopLoop()
            cancelAnimationFrame(raf)
            window.removeEventListener('loader:finished', onLoaderFinished)
            scrollTl.scrollTrigger?.kill()
            scrollTl.kill()
            popupTweens.forEach((t) => t.kill())
            window.removeEventListener('resize', sizeRenderer)
            window.visualViewport?.removeEventListener('resize', sizeRenderer)
            document.removeEventListener('mousemove', cursorLoc)

            if (interiorLight) {
                interiorLight.parent?.remove(interiorLight)
                interiorLight.dispose()
            }

            if (fridge) {
                scene.remove(fridge.root)
                fridge.dispose()
            }

            scene.remove(camGroup)
            scene.remove(key.target)
            scene.remove(key, bounce, fill, rim, ambient, ceilingLight)
            ceilingLight.dispose()
            key.shadow.dispose()
            scene.environment = null
            envTexture.dispose()

            renderer.setAnimationLoop(null)
            renderer.dispose()
            if (mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement)
            }
        }
    }, [])

    return (
        <div ref={mountRef} className="threejs">
            <div className="threejs__grade" aria-hidden="true" />
            <div className="waste-hud" aria-live="polite">
                <div className="waste-total" ref={wastedHudEl}>
                    <span className="waste-copy">
                        wasted this week:{' '}
                        <span className="waste-value waste-value--hot" ref={wastedEl}>
                            $0.00
                        </span>
                    </span>
                </div>
                <div className="life-labels" ref={lifeLabelsEl} />
            </div>
            <div className="waste-popups" ref={popupsEl} />
            <p className="scroll-hint" ref={scrollHintEl} aria-hidden="true">
                <span className="scroll-hint__inner">
                    <span className="scroll-hint__label">Scroll</span>
                    <span className="scroll-hint__chevs">
                        <span className="scroll-hint__chev" />
                        <span className="scroll-hint__chev" />
                    </span>
                </span>
            </p>
            {children}
        </div>
    )
}
