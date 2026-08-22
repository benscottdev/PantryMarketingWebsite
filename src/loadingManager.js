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
const loadListeners = new Set()

export let isLoadComplete = false
let lastProgress = 0

loadingManager.onProgress = (_url, loaded, total) => {
    lastProgress = total > 0 ? loaded / total : 0
    progressListeners.forEach((fn) => fn(lastProgress, loaded, total))
}

loadingManager.onLoad = () => {
    isLoadComplete = true
    lastProgress = 1
    loadListeners.forEach((fn) => fn())
}

export function onLoadProgress(fn) {
    progressListeners.add(fn)
    if (lastProgress > 0) fn(lastProgress)
    return () => progressListeners.delete(fn)
}

export function onLoadComplete(fn) {
    loadListeners.add(fn)
    if (isLoadComplete) queueMicrotask(fn)
    return () => loadListeners.delete(fn)
}
