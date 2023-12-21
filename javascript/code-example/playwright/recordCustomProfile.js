import { chromium } from 'playwright-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

const dir = '~/tempProfile'
;(async () => {
  chromium.use(StealthPlugin())
  const browser = await chromium.launchPersistentContext(dir, {
    headless: false
  })

  await browser.route('**/*', (route) => route.continue())

  // Pause the page, and start recording manually.
  const page = await browser.newPage()
  await page.goto('https://google.com')
  await page.pause()
})()
