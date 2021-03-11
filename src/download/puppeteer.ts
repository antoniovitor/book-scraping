import puppeteer from 'puppeteer'
import fs from 'fs'

async function downloadPuppeteer () {
    console.log('Launching browser...')
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    })

    console.log('Creating page...')
    const page = await browser.newPage()

    console.log('Loading links...')
    const links = JSON.parse(fs.readFileSync('./src/files/links/validLinks.json', 'utf-8'))

    console.log('Setting cookies...')
    const setCookies = JSON.parse(fs.readFileSync('./src/config/cookies.json', 'utf-8'))
    await page.setCookie(...setCookies)

    console.log('Going to first link...')
    await page.goto(links[0])

    await page.waitFor('embed', { timeout: 0 })

    try {
        await page._client.send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath: './downloads' })
        await page.evaluate(() => {
            const link = document.createElement('a')
            link.href = window.location.href
            link.download = 'file.pdf'
            link.click()
        })
    } catch (err) {
        console.error(err)
    }

    console.log('Saving cookies...')
    const cookies = await page.cookies()
    fs.writeFileSync('./src/files/cookies.json', JSON.stringify(cookies, null, 2))
}

export default downloadPuppeteer
