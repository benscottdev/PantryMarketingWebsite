import { chromium } from 'playwright'

const widths = [1440, 1024, 480]
const browser = await chromium.launch()

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 800 }, deviceScaleFactor: 2 })
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(1400)

  const header = page.locator('.header')
  await header.screenshot({ path: `.tmp-ref/out-${width}.png` })

  if (width === 1440) {
    const box = await header.boundingBox()
    const geo = await page.evaluate(() => {
      const pick = (sel) => {
        const el = document.querySelector(sel)
        if (!el) return null
        const r = el.getBoundingClientRect()
        return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }
      }
      const cs = getComputedStyle(document.querySelector('.header'))
      const logo = document.querySelector('.nav__logo')
      return {
        header: pick('.header'),
        logo: pick('.nav__logo'),
        cta: pick('.nav__cta'),
        firstLink: pick('.nav__link'),
        bg: cs.backgroundColor,
        border: cs.borderColor,
        logoMask: getComputedStyle(logo).maskImage || getComputedStyle(logo).webkitMaskImage,
        logoBg: getComputedStyle(logo).backgroundColor,
      }
    })
    console.log('header box:', box)
    console.log(JSON.stringify(geo, null, 2))

    // Hover the CTA and sample its fill mid-transition and at rest
    await page.locator('.nav__cta').hover()
    await page.waitForTimeout(700)
    await header.screenshot({ path: '.tmp-ref/out-hover.png' })
  }

  await page.close()
}

await browser.close()
console.log('done')
