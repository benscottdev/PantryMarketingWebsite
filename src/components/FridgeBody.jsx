import * as THREE from 'three'
import gsap from 'gsap'
import { createTextureLoader } from '../loadingManager'

// Every model here is the output of `npm run models`, which compresses whatever
// sits in static/models/source. Never import from source/ — those are the raw
// Blender exports and one of them is 2.5MB of apple.
import bodyUrl from '../static/models/body.glb?url'
import doorUrl from '../static/models/door.glb?url'
import magnetsUrl from '../static/models/magnets.glb?url'
import additionalsUrl from '../static/models/additionals_compressed.glb?url'

// Apple
import apple1Url from '../static/models/apple1.glb?url'
import apple2Url from '../static/models/apple2.glb?url'
import apple3Url from '../static/models/apple3.glb?url'



import milkUrl from '../static/models/milk.glb?url'
import minceUrl from '../static/models/mince.glb?url'
// import eggCartonUrl from '../static/models/EggCarton.glb?url'
import watermelonUrl from '../static/models/watermelon.glb?url'
import leftoversUrl from '../static/models/leftovers.glb?url'

/** Timeline unit: 1 second on the scroll timeline = this many vh of scroll. */
export const STAGE_VH = 50

/** Camera + door open — aging / removals start after this. */
export const INTRO_VH = 75

/** Extra pin distance after the last item disappears, then the scene unpins. */
export const AFTER_LAST_ITEM_VH = 100

/** One day of shelf life = this much scroll (after intro). Every item ticks at this rate. */
export const DAY_VH = STAGE_VH

/**
 * Drop extra GLBs here.
 *
 * Stages (optional) — after intro, blend GLB look → stage-one → two → three:
 *   'stage-one' | 'stage-two' | 'stage-three': { map?, roughnessMap?, normalMap?, ... }
 *
 * Money / waste:
 *   price       — dollar value
 *   thrownOut   — if true, removing the part adds to the wasted total + floating -$ chip
 *   usedAtDays  — when thrownOut is false, the item is used (removed) after this many
 *                 days of the shared countdown, rather than waiting until lifeDays hits 0
 *
 * Life left (floating name + days pill above the item, ticks down with scroll):
 *   label        — name shown on the floating pill (e.g. "Ground Beef")
 *   showTimeLeft — if false, no days-left badge. lifeDays still drives throwaway timing.
 *   lifeDays     — starting days; omit to hide the counter. Thrown-out items vanish when this hits 0.
 *                  All items count at DAY_VH per day, so a 6-day item stays longer than a 3-day one.
 *   lifeGroup    — items that share this string get one badge above the remaining cluster
 *   lifeOffset   — extra local [x, y, z] nudge on the label (metres, after fridge scale)
 *
 * Timing is vh AFTER the intro (camera/door). Defaults:
 *   ageStartVh: 0, stageDurationVh: 50, removeAtVh: omit to keep
 *   (ignored when thrownOut is false and usedAtDays is set, or when thrownOut is true and lifeDays is set)
 *
 * Every removal wants its own beat of scroll. A used item leaves on its
 * `usedAtDays`, a wasted one when its `lifeDays` reaches zero, so those two
 * numbers are also the running order — and where they coincide, two things
 * vanish on the same frame and the second one goes unread. The schedule below,
 * in days after the intro, alternates the two fates and leaves no gap shorter
 * than ~0.8 of a day (40vh):
 *
 *   1.2  Apple2      used
 *   2    Ground Beef wasted
 *   3    Leftovers   wasted
 *   4.2  Apple1      used
 *   5.2  Milk        used     (one day of life left — used just in time)
 *   6    Apple3      wasted
 *   7    Watermelon  wasted
 *
 * The last of these sets the pin length, via getScrollLengthVh() below.
 */
const EXTRA_PARTS = [
    {
        name: 'Additionals',
        url: additionalsUrl,
        showTimeLeft: false,
        // The room shell only receives. A wall lit at a raking angle is the
        // worst possible shadow caster — it shadows itself across the whole
        // surface, and no amount of bias hides that cleanly. The props on it
        // (shelf, pan, hooks, towels, tap, plant) do still cast, because their
        // shadows thrown across the tiles are most of the light in the frame.
        receiveOnly: ['Wall', 'BenchLeft', 'BenchRight']
    },
    {
        name: 'Apple1',
        url: apple1Url,
        label: 'Apples',
        price: 1.5,
        thrownOut: false,
        usedAtDays: 4.2,
        showTimeLeft: true,
        lifeGroup: 'apples',
        lifeDays: 6,
        lifeOffset: [0, 0.03, 0],
        // 'stage-one': { map: applesStage1Url },
        // 'stage-two': { map: applesStage2Url },
        // 'stage-three': { map: applesStage3Url },
        stageDurationVh: 25
    },
    {
        name: 'Apple2',
        url: apple2Url,
        label: 'Apples',
        price: 1.5,
        thrownOut: false,
        usedAtDays: 1.2,
        showTimeLeft: false,
        lifeGroup: 'apples',
        lifeDays: 6,
        lifeOffset: [0, 0.03, 0],
        // 'stage-one': { map: applesStage1Url },
        // 'stage-two': { map: applesStage2Url },
        // 'stage-three': { map: applesStage3Url },
        stageDurationVh: 25
    },
    {
        name: 'Apple3',
        url: apple3Url,
        label: 'Apples',
        price: 1.5,
        thrownOut: true,
        usedAtDays: 5,
        showTimeLeft: false,
        lifeGroup: 'apples',
        // All three apples share one badge, so they must also share a lifeDays
        // — the badge reads whichever of them is still alive, and a mismatch
        // makes the number jump as its source changes hands.
        lifeDays: 6,
        lifeOffset: [0, 0.03, 0],
        // 'stage-one': { map: applesStage1Url },
        // 'stage-two': { map: applesStage2Url },
        // 'stage-three': { map: applesStage3Url },
        stageDurationVh: 25
    },
    {
        name: 'Milk',
        url: milkUrl,
        label: 'Milk',
        price: 7.4,
        thrownOut: false,
        usedAtDays: 5.2,
        showTimeLeft: true,
        lifeDays: 6,
        lifeOffset: [0, 0.05, 0],
        // 'stage-one': { map: milkStage1Url },
        // 'stage-two': { map: milkStage2Url },
        // 'stage-three': { map: milkStage3Url },
        stageDurationVh: 50
    },
    {
        name: 'Mince',
        url: minceUrl,
        label: 'Ground Beef',
        price: 11.5,
        thrownOut: true,
        usedAtDays: 2,
        showTimeLeft: true,
        lifeDays: 2,
        lifeOffset: [0, 0.04, 0],
        // 'stage-one': { map: minceStage1Url },
        // 'stage-two': { map: minceStage2Url },
        // 'stage-three': { map: minceStage3Url },
        stageDurationVh: 50
    },
    // {
    //     name: 'EggCarton',
    //     url: eggCartonUrl,
    //     price: 8,
    //     thrownOut: true,
    //     usedAtDays: 3,
    //     showTimeLeft: true,
    //     lifeDays: 6,
    //     lifeOffset: [0, 0.08, 0],
    //     // 'stage-one': { map: minceStage1Url },
    //     // 'stage-two': { map: minceStage2Url },
    //     // 'stage-three': { map: minceStage3Url },
    //     stageDurationVh: 50
    // },
    {
        name: 'Watermelon',
        url: watermelonUrl,
        label: 'Watermelon',
        price: 7,
        thrownOut: true,
        usedAtDays: 4,
        showTimeLeft: true,
        lifeDays: 7,
        lifeOffset: [0, 0.04, 0],
        // 'stage-one': { map: minceStage1Url },
        // 'stage-two': { map: minceStage2Url },
        // 'stage-three': { map: minceStage3Url },
        stageDurationVh: 50
    },
    {
        name: 'Leftovers',
        url: leftoversUrl,
        label: 'Leftovers',
        price: 12.20,
        thrownOut: true,
        usedAtDays: 2,
        showTimeLeft: true,
        lifeDays: 3,
        lifeOffset: [0, 0.04, 0],
        // 'stage-one': { map: minceStage1Url },
        // 'stage-two': { map: minceStage2Url },
        // 'stage-three': { map: minceStage3Url },
        stageDurationVh: 50
    }
]

const STAGE_KEYS = ['stage-one', 'stage-two', 'stage-three']
const MAP_SLOTS = ['map', 'roughnessMap', 'normalMap', 'aoMap', 'metalnessMap', 'emissiveMap']

let texLoader = createTextureLoader()
let whiteTex = null

function partRemoveAtVh(cfg) {
    const start = cfg.ageStartVh ?? 0
    if (!cfg.thrownOut && cfg.usedAtDays != null) {
        return start + cfg.usedAtDays * DAY_VH
    }
    if (cfg.lifeDays != null) return start + cfg.lifeDays * DAY_VH
    return cfg.removeAtVh
}

function getWhiteTex() {
    if (whiteTex) return whiteTex
    const data = new Uint8Array([255, 255, 255, 255])
    whiteTex = new THREE.DataTexture(data, 1, 1)
    whiteTex.colorSpace = THREE.SRGBColorSpace
    whiteTex.needsUpdate = true
    return whiteTex
}

function setMeshShadows(root, { cast = false, receive = false }) {
    root.traverse((o) => {
        if (!o.isMesh) return
        o.castShadow = cast
        o.receiveShadow = receive
    })
}

/** Demote named nodes (and their `.001` siblings) to receive-only. */
function setReceiveOnly(root, names) {
    if (!names?.length) return
    root.traverse((o) => {
        if (!o.isMesh) return
        if (!names.some((n) => o.name === n || o.name.startsWith(`${n}.`))) return
        o.castShadow = false
        o.receiveShadow = true
    })
}

function disposeObject(root) {
    if (!root) return
    root.traverse((o) => {
        if (!o.isMesh) return
        o.geometry.dispose()
        const list = Array.isArray(o.material) ? o.material : [o.material]
        list.forEach((m) => m?.dispose())
    })
}

function stageHasContent(stage) {
    if (!stage || typeof stage !== 'object') return false
    return (
        MAP_SLOTS.some((slot) => !!stage[slot]) ||
        stage.color != null ||
        stage.roughness != null ||
        stage.metalness != null
    )
}

function normalizeStages(cfg) {
    return STAGE_KEYS.map((key) => cfg[key]).filter(stageHasContent)
}

function loadTexture(url, colorSpace) {
    if (!url) return null
    const t = texLoader.load(url)
    t.colorSpace = colorSpace
    // Match glTF UV space (imported PNGs sit on the same meshes).
    t.flipY = false
    t.needsUpdate = true
    return t
}

function resolveStageMaps(stage) {
    if (!stage) return {}
    return {
        map: loadTexture(stage.map, THREE.SRGBColorSpace),
        roughnessMap: loadTexture(stage.roughnessMap, THREE.NoColorSpace),
        normalMap: loadTexture(stage.normalMap, THREE.NoColorSpace),
        aoMap: loadTexture(stage.aoMap, THREE.NoColorSpace),
        metalnessMap: loadTexture(stage.metalnessMap, THREE.NoColorSpace),
        emissiveMap: loadTexture(stage.emissiveMap, THREE.SRGBColorSpace)
    }
}

function syncMixer(mixer) {
    if (!mixer.uniforms) return
    mixer.uniforms.uStageUse.value = mixer.use
    mixer.uniforms.uStageMix.value = mixer.mix
    mixer.uniforms.uStageMapA.value = mixer.mapA || getWhiteTex()
    mixer.uniforms.uStageMapB.value = mixer.mapB || getWhiteTex()
}

function installStageMixer(material) {
    const state = {
        use: 0,
        mix: 0,
        mapA: null,
        mapB: null,
        uniforms: null
    }

    // Guarantee UVs / map sampling path exist for the mixer.
    if (!material.map) material.map = getWhiteTex()

    material.onBeforeCompile = (shader) => {
        shader.uniforms.uStageMix = { value: state.mix }
        shader.uniforms.uStageUse = { value: state.use }
        shader.uniforms.uStageMapA = { value: state.mapA || getWhiteTex() }
        shader.uniforms.uStageMapB = { value: state.mapB || getWhiteTex() }
        state.uniforms = shader.uniforms
        syncMixer(state)

        shader.fragmentShader = shader.fragmentShader
            .replace(
                '#include <map_pars_fragment>',
                /* glsl */ `
                #include <map_pars_fragment>
                uniform float uStageMix;
                uniform float uStageUse;
                uniform sampler2D uStageMapA;
                uniform sampler2D uStageMapB;
                `
            )
            .replace(
                '#include <map_fragment>',
                /* glsl */ `
                #ifdef USE_MAP
                    vec4 sampledDiffuseColor = texture2D( map, vMapUv );
                    if ( uStageUse > 0.5 ) {
                        vec4 stageA = texture2D( uStageMapA, vMapUv );
                        vec4 stageB = texture2D( uStageMapB, vMapUv );
                        sampledDiffuseColor = mix( stageA, stageB, uStageMix );
                    }
                    diffuseColor *= sampledDiffuseColor;
                #endif
                `
            )
    }
    material.customProgramCacheKey = () => 'fridge-stage-mix-v2'
    material.needsUpdate = true
    return state
}

function lerpNum(a, b, t) {
    if (a == null && b == null) return undefined
    const A = a ?? b
    const B = b ?? a
    return A + (B - A) * t
}

/**
 * age 0 = GLB base, 1 = full stage-one, 2 = full stage-two, …
 * Blends between floor(age) and ceil(age).
 */
function applyStageSample(meshes, stages, resolvedMaps, baseMaps, mixers, age) {
    const max = stages.length
    const t = THREE.MathUtils.clamp(age, 0, max)
    const i0 = Math.floor(t)
    const i1 = Math.min(i0 + 1, max)
    const mix = t - i0

    // Index 0 = GLB base; 1..n = stage-one..stage-n
    const s0 = i0 === 0 ? null : stages[i0 - 1]
    const s1 = i1 === 0 ? null : stages[i1 - 1]
    const m0 = i0 === 0 ? null : resolvedMaps[i0 - 1]
    const m1 = i1 === 0 ? null : resolvedMaps[i1 - 1]

    for (const mesh of meshes) {
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
        mats.forEach((mat, mi) => {
            if (!mat) return
            const key = `${mesh.uuid}:${mi}`
            const mixer = mixers.get(key)
            const base = baseMaps.get(key)

            if (mixer) {
                const mapA = (i0 === 0 ? base?.map : m0?.map) || base?.map || mat.map || getWhiteTex()
                const mapB = (i1 === 0 ? base?.map : m1?.map) || mapA
                const hasStageMaps = !!(m0?.map || m1?.map || s0?.map || s1?.map)
                mixer.use = hasStageMaps || i0 > 0 || i1 > 0 ? 1 : 0
                mixer.mix = mix
                mixer.mapA = mapA
                mixer.mapB = mapB
                syncMixer(mixer)
            }

            const baseColor = mat.userData.baseColor
            const c0 = s0?.color != null ? new THREE.Color(s0.color) : baseColor.clone()
            const c1 = s1?.color != null ? new THREE.Color(s1.color) : (s0?.color != null ? new THREE.Color(s0.color) : baseColor.clone())
            if (s0?.color != null || s1?.color != null) mat.color.copy(c0).lerp(c1, mix)

            const r0 = s0?.roughness ?? mat.userData.baseRoughness
            const r1 = s1?.roughness ?? s0?.roughness ?? mat.userData.baseRoughness
            const rough = lerpNum(r0, r1, mix)
            if (s0?.roughness != null || s1?.roughness != null) mat.roughness = rough

            const me0 = s0?.metalness ?? mat.userData.baseMetalness
            const me1 = s1?.metalness ?? s0?.metalness ?? mat.userData.baseMetalness
            const metal = lerpNum(me0, me1, mix)
            if (s0?.metalness != null || s1?.metalness != null) mat.metalness = metal
        })
    }
}

async function prepareAging(cfg, scene) {
    const stages = normalizeStages(cfg)
    // One stage is enough — we blend GLB base → stage-one (→ two → three).
    if (stages.length < 1) return null

    const meshes = []
    scene.traverse((o) => {
        if (o.isMesh) meshes.push(o)
    })

    const mixers = new Map()
    const baseMaps = new Map()
    for (const mesh of meshes) {
        const list = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
        list.forEach((mat, mi) => {
            if (!mat) return
            const key = `${mesh.uuid}:${mi}`
            mat.userData.baseColor = mat.color?.clone?.() ?? new THREE.Color(0xffffff)
            mat.userData.baseRoughness = mat.roughness
            mat.userData.baseMetalness = mat.metalness
            baseMaps.set(key, { map: mat.map || getWhiteTex() })
            mixers.set(key, installStageMixer(mat))
        })
    }

    const resolvedMaps = stages.map(resolveStageMaps)
    const age = { t: 0 }

    const apply = () => applyStageSample(meshes, stages, resolvedMaps, baseMaps, mixers, age.t)
    apply()

    return {
        age,
        stages,
        apply,
        ageStartVh: cfg.ageStartVh ?? 0,
        stageDurationVh: cfg.stageDurationVh ?? STAGE_VH,
        dispose() {
            for (const maps of resolvedMaps) {
                for (const slot of MAP_SLOTS) maps[slot]?.dispose?.()
            }
        }
    }
}

async function loadExtraParts(loader, root) {
    const parts = {}
    await Promise.all(
        EXTRA_PARTS.map(async (cfg) => {
            const { name, url, cast = true, receive = true } = cfg
            const gltf = await loader.loadAsync(url)
            const scene = gltf.scene
            scene.name = name
            setMeshShadows(scene, { cast, receive })
            setReceiveOnly(scene, cfg.receiveOnly)
            root.add(scene)

            const aging = await prepareAging(cfg, scene)
            scene.updateWorldMatrix(true, true)
            const box = new THREE.Box3().setFromObject(scene)
            const topWorld = new THREE.Vector3(
                (box.min.x + box.max.x) * 0.5,
                box.max.y,
                (box.min.z + box.max.z) * 0.5
            )
            const lifeAnchor = topWorld.applyMatrix4(scene.matrixWorld.clone().invert())
            const off = cfg.lifeOffset
            if (off) lifeAnchor.add(new THREE.Vector3(off[0] ?? 0, off[1] ?? 0, off[2] ?? 0))

            parts[name] = {
                scene,
                cfg,
                aging,
                lifeAnchor,
                life: cfg.lifeDays != null ? { d: cfg.lifeDays } : null,
                removeAtVh: partRemoveAtVh(cfg),
                price: cfg.price ?? 0,
                thrownOut: !!cfg.thrownOut
            }
        })
    )
    return parts
}

/**
 * Pin length in vh/dvh units: intro → last item removeAtVh → AFTER_LAST_ITEM_VH,
 * then the threejs frame unpins so the rest of the page can scroll.
 */
export function getScrollLengthVh() {
    let lastRemoveAfterIntro = 0
    let agingEnd = 0
    for (const cfg of EXTRA_PARTS) {
        const stages = normalizeStages(cfg)
        const start = cfg.ageStartVh ?? 0
        const dur = cfg.stageDurationVh ?? STAGE_VH
        if (stages.length >= 1) agingEnd = Math.max(agingEnd, start + stages.length * dur)
        if (cfg.lifeDays != null || cfg.usedAtDays != null || cfg.removeAtVh != null) {
            lastRemoveAfterIntro = Math.max(lastRemoveAfterIntro, partRemoveAtVh(cfg) ?? 0)
        }
    }
    const storyEnd = Math.max(lastRemoveAfterIntro, agingEnd, STAGE_VH)
    return INTRO_VH + storyEnd + AFTER_LAST_ITEM_VH
}

/**
 * Wire aging blends + removals onto an existing scrubbed GSAP timeline.
 * Timeline time unit: 1 = STAGE_VH (50vh) of scroll.
 * All part timings are offset by INTRO_VH (after camera / door).
 *
 * opts.onRemoved / opts.onRestored fire when a part crosses removeAtVh (scrub-safe).
 * thrownOut:true → waste UI; thrownOut:false → "Used!" UI.
 */
export function wireExtrasScroll(timeline, extras, opts = {}) {
    const unit = STAGE_VH
    const intro = INTRO_VH / unit
    const { onRemoved, onRestored, onLife } = opts
    const _world = new THREE.Vector3()

    for (const part of Object.values(extras)) {
        const { scene, aging, removeAtVh, price, thrownOut, cfg } = part

        part._restScale = scene.scale.clone()
        part._restPos = scene.position.clone()
        part._restRot = { x: scene.rotation.x, y: scene.rotation.y, z: scene.rotation.z }
        part._homeParent = scene.parent

        if (aging) {
            const blends = aging.stages.length
            const duration = blends * (aging.stageDurationVh / unit)
            const start = intro + (aging.ageStartVh / unit)
            timeline.to(
                aging.age,
                {
                    t: blends,
                    duration,
                    ease: 'none',
                    onUpdate: aging.apply
                },
                start
            )
        }

        if (part.life) {
            const startVh = cfg.ageStartVh ?? 0
            const dur = Math.max(0.01, (cfg.lifeDays * DAY_VH) / unit)
            timeline.fromTo(
                part.life,
                { d: cfg.lifeDays },
                {
                    d: 0,
                    duration: dur,
                    ease: 'none',
                    onUpdate: () => onLife?.(part)
                },
                intro + startVh / unit
            )
        }

        if (removeAtVh != null) {
            const alive = { v: 1 }
            part._removed = false
            timeline.to(
                alive,
                {
                    v: 0,
                    duration: 0.02,
                    ease: 'none',
                    onUpdate: () => {
                        const gone = alive.v <= 0.5

                        if (gone && !part._removed) {
                            part._removed = true
                            scene.visible = true
                            scene.updateWorldMatrix(true, false)
                            new THREE.Box3().setFromObject(scene).getCenter(_world)
                            onRemoved?.({
                                name: cfg.name,
                                price,
                                thrownOut,
                                world: _world.clone()
                            })
                            vanishPart(part)
                        } else if (!gone && part._removed) {
                            restorePart(part)
                            onRestored?.({ name: cfg.name, price, thrownOut })
                        }
                    }
                },
                intro + removeAtVh / unit
            )
        }
    }
}

function vanishPart(part) {
    const { scene } = part
    part._outTween?.kill()
    scene.visible = true
    scene.updateWorldMatrix(true, true)

    const parent = scene.parent
    const worldCenter = new THREE.Box3().setFromObject(scene).getCenter(new THREE.Vector3())
    const localCenter = scene.worldToLocal(worldCenter.clone())
    const centerParent = parent.worldToLocal(worldCenter.clone())
    const offset = new THREE.Vector3()

    const rest = part._restScale
    const rot = part._restRot
    const spin = { t: 0 }

    const apply = () => {
        const k = 1 - spin.t * 0.98
        scene.scale.set(rest.x * k, rest.y * k, rest.z * k)
        scene.rotation.set(rot.x, rot.y + 0.85 * spin.t, rot.z + 0.55 * spin.t)
        offset.copy(localCenter).multiply(scene.scale).applyEuler(scene.rotation)
        scene.position.copy(centerParent).sub(offset)
    }
    apply()

    part._outTween = gsap.to(spin, {
        t: 1,
        duration: 0.55,
        ease: 'power2.in',
        onUpdate: apply,
        onComplete: () => {
            scene.visible = false
        }
    })
}

function restorePart(part) {
    const { scene } = part
    part._outTween?.kill()
    part._outTween = null
    part._removed = false
    if (part._homeParent && scene.parent !== part._homeParent) {
        part._homeParent.attach(scene)
    }
    scene.visible = true
    scene.scale.copy(part._restScale)
    scene.position.copy(part._restPos)
    scene.rotation.set(part._restRot.x, part._restRot.y, part._restRot.z)
}

/**
 * Loads body, door, magnets, and any EXTRA_PARTS into one fridge group.
 * Magnets are parented to the door (world transform preserved) so they open with it.
 * Animate `door.rotation.y` for a hinge open — the Door mesh origin is already the hinge.
 */
export async function loadFridgeBody(loader) {
    const [bodyGltf, doorGltf, magnetsGltf] = await Promise.all([
        loader.loadAsync(bodyUrl),
        loader.loadAsync(doorUrl),
        loader.loadAsync(magnetsUrl)
    ])

    const root = new THREE.Group()
    root.name = 'Fridge'

    const body = bodyGltf.scene
    body.name = 'FridgeBodyRoot'

    const doorRoot = doorGltf.scene
    const door = doorRoot.getObjectByName('FridgeDoor')
    if (!door) throw new Error('FridgeDoor mesh missing from door.glb')

    const magnetsRoot = magnetsGltf.scene
    magnetsRoot.name = 'FridgeMagnetsRoot'

    setMeshShadows(body, { cast: true, receive: true })
    setMeshShadows(doorRoot, { cast: true, receive: true })
    setMeshShadows(magnetsRoot, { cast: true, receive: true })

    root.scale.set(1.5, 1.5, 1.5)
    root.position.set(0, -0.75, 0)
    root.rotation.y = -Math.PI / 2

    const bodyBox = new THREE.Box3().setFromObject(body)
    // Colour and intensity are set from LIGHTING.interior once the fridge is in
    // the scene — this is just the fixture in the right place.
    const interiorLight = new THREE.PointLight(0xffffff, 16, 4, 2)
    interiorLight.name = 'FridgeInteriorLight'
    interiorLight.position.set(
        (bodyBox.min.x + bodyBox.max.x) * 0.5,
        bodyBox.max.y - 0.12,
        (bodyBox.min.z + bodyBox.max.z) * 0.5
    )

    root.add(body)
    root.add(doorRoot)
    root.add(magnetsRoot)
    root.add(interiorLight)
    root.updateMatrixWorld(true)

    while (magnetsRoot.children.length) {
        const magnet = magnetsRoot.children[0]
        door.attach(magnet)
        setMeshShadows(magnet, { cast: true, receive: true })
    }
    root.remove(magnetsRoot)

    const extras = await loadExtraParts(loader, root)

    return {
        root,
        body,
        door,
        interiorLight,
        extras,
        dispose() {
            for (const part of Object.values(extras)) {
                part._outTween?.kill()
                part.aging?.dispose()
            }
            disposeObject(root)
        }
    }
}
