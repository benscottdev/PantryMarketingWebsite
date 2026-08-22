/**
 * Model build step: src/static/models/source/*.glb -> src/static/models/*.glb
 *
 * The exports out of Blender carry uncompressed geometry and, worse, full-size
 * PNGs embedded in the binary — the three apples shipped 2.5MB of identical
 * texture each. Everything the site imports is the output of this script, so run
 * `npm run models` after replacing anything in source/ and commit both sides.
 *
 * Outputs are skipped when they're newer than their source, so re-runs are free.
 */
import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { NodeIO } from '@gltf-transform/core'
import { ALL_EXTENSIONS } from '@gltf-transform/extensions'
import { dedup, draco, prune, textureCompress, weld } from '@gltf-transform/functions'
import draco3d from 'draco3dgltf'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(root, 'src/static/models/source')
const OUT = join(root, 'src/static/models')

// Texture budget follows how much of the frame a model actually fills. Only the
// room shell and the fridge itself are ever big on screen; a piece of fruit is a
// couple of hundred pixels tall, so 512 is already more texel than it can show,
// and at 1k the apples alone were half the payload. 80 is where WebP stops being
// distinguishable on organic texture like fruit skin.
const LARGE = new Set(['additionals', 'body', 'door'])
const WEBP_QUALITY = 80

const textureSize = (file) => (LARGE.has(file.replace(/\.glb$/, '')) ? 1024 : 512)

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({
    'draco3d.decoder': await draco3d.createDecoderModule(),
    'draco3d.encoder': await draco3d.createEncoderModule()
})

const mb = (n) => `${(n / 1048576).toFixed(2)}MB`

if (!existsSync(SRC)) throw new Error(`No source models at ${SRC}`)
mkdirSync(OUT, { recursive: true })

const files = readdirSync(SRC).filter((f) => f.endsWith('.glb'))
if (!files.length) throw new Error(`No .glb files in ${SRC}`)

let before = 0
let after = 0
let skipped = 0

for (const file of files) {
    const from = join(SRC, file)
    const to = join(OUT, file)
    const srcSize = statSync(from).size
    before += srcSize

    if (existsSync(to) && statSync(to).mtimeMs >= statSync(from).mtimeMs) {
        after += statSync(to).size
        skipped += 1
        continue
    }

    const size = textureSize(file)
    const doc = await io.read(from)
    await doc.transform(
        // Collapses the duplicate meshes, materials and — the expensive one —
        // textures that come out of a Blender scene full of copied objects.
        dedup(),
        // keepLeaves, because childless nodes here are named anchors the app
        // looks up (hinges, shelf slots) rather than dead weight.
        prune({ keepLeaves: true }),
        weld(),
        textureCompress({
            encoder: sharp,
            targetFormat: 'webp',
            resize: [size, size],
            quality: WEBP_QUALITY
        }),
        draco()
    )
    await io.write(to, doc)

    const outSize = statSync(to).size
    after += outSize
    const cut = srcSize > 0 ? Math.round((1 - outSize / srcSize) * 100) : 0
    console.log(
        `${file.padEnd(20)} ${mb(srcSize).padStart(8)} -> ${mb(outSize).padStart(8)}` +
            `  -${cut}%  ${size}px`
    )
}

console.log(
    `\n${files.length - skipped} written, ${skipped} up to date` +
        `\ntotal ${mb(before)} -> ${mb(after)} (-${Math.round((1 - after / before) * 100)}%)`
)
