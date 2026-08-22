import * as THREE from 'three'
// Imported by path, not from Addons.js: the barrel doesn't tree-shake cleanly,
// and every loader it touches emits its decoder as a build asset. Going through
// it dragged in KTX2Loader and shipped a 571KB Basis transcoder we never call.
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

/** Shared manager so the Loader UI can track every Three asset. */
export const loadingManager = new THREE.LoadingManager()

// No setDecoderPath: three resolves its own decoder relative to the module, so
// the bundler emits it as a content-hashed asset that can be cached forever.
// Pointing this at a hand-copied public/draco meant shipping a second, unhashed
// copy of the same wasm and serving whichever one the CDN felt like caching.
const dracoLoader = new DRACOLoader(loadingManager)

export function createGLTFLoader() {
    const loader = new GLTFLoader(loadingManager)
    loader.setDRACOLoader(dracoLoader)
    return loader
}

export function createTextureLoader() {
    return new THREE.TextureLoader(loadingManager)
}

const progressListeners = new Set()
const readyListeners = new Set()

/**
 * Downloads own the first 90% of the bar. The rest belongs to what happens
 * after the bytes arrive — Draco decode, texture upload, shader compile — which
 * is the part that used to run *behind* a loader that had already declared
 * itself finished.
 */
const ASSET_SHARE = 0.9

/**
 * The scene loads in two waves (fridge shell, then the room and the food), so
 * the manager's queue empties in between and its `total` climbs as the second
 * wave is queued. Reported straight through, `loaded / total` hit 3/3 = 100%
 * and then fell to 4/14 = 29% the moment the next wave started — the bar going
 * backwards. Callers declare the real count up front so the denominator is
 * settled before the first byte, and progress is ratcheted so no late arrival
 * can walk it back.
 */
let expectedAssets = 0
let assetsLoaded = 0
let progress = 0
let assetsSettled = false
let sceneReady = false

export function expectAssets(n) {
    expectedAssets = Math.max(expectedAssets, n)
}

function emit() {
    progressListeners.forEach((fn) => fn(progress, assetsSettled))
}

loadingManager.onProgress = (_url, loaded, total) => {
    assetsLoaded = Math.max(assetsLoaded, loaded)
    const denom = Math.max(total, expectedAssets, 1)
    progress = Math.max(progress, (assetsLoaded / denom) * ASSET_SHARE)
    assetsSettled = assetsLoaded >= denom
    emit()
}

// Deliberately no loadingManager.onLoad handler. It fires every time the queue
// happens to drain, which is mid-load here, and treating it as "everything is
// in" is what opened the doors on a scene that had barely started decoding.

/**
 * The scene is built, uploaded and compiled — the first real frame can be drawn
 * without blocking the main thread. Called by Three.jsx once its warm-up pass
 * finishes, and on a load failure too, so a missing model can't strand anyone
 * behind the doors.
 */
export function markSceneReady() {
    if (sceneReady) return
    sceneReady = true
    progress = 1
    assetsSettled = true
    emit()
    readyListeners.forEach((fn) => fn())
}

export const isSceneReady = () => sceneReady

export function onLoadProgress(fn) {
    progressListeners.add(fn)
    if (progress > 0) fn(progress, assetsSettled)
    return () => progressListeners.delete(fn)
}

export function onSceneReady(fn) {
    readyListeners.add(fn)
    if (sceneReady) queueMicrotask(fn)
    return () => readyListeners.delete(fn)
}
