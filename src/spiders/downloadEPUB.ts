import { SpiderInterface } from '../module/spider'
import Link from '../database/Link'
import axios from 'axios'
import fs from 'fs'
import sanitizeFilename from 'sanitize-filename'
import cookiesConfig from '../config/cookies'
import Log from '../module/log'

/**
 * Extracts data about books
 */
const DownloadEPUBSpider: SpiderInterface<Link> = {
    maxParallel: 6,

    data: async () => {
        const links = await Link.find<Link>({ status: 'scraped' })
        return links.filter(link => link.epub)
    },

    execute: async (link) => {
        console.log(`[START] ${link.bookName}`)

        const response = await axios.get(link.epub, {
            headers: {
                cookie: `recaptcha=${cookiesConfig.recaptcha}`
            },
            responseType: 'arraybuffer'
        })

        if (['application/epub+zip', 'application/octet-stream'].includes(response.headers['content-type'])) {
            const buffer = Buffer.from(new Uint8Array(response.data))

            const filename = sanitizeFilename(`[${link._id}] ${link.authors}. ${link.bookName}.epub`)

            fs.writeFileSync(`./books/epub/${filename}`, buffer, { encoding: 'binary' })

            link.epubDownloaded = true
            link.status = 'downloaded'
            link.save()

            console.log(`[END] ${link.bookName} saved.`)
        } else {
            console.error('Cookies expired')
        }
    },

    catchError: (err, link) => {
        console.error(`An error has occurred in link: ${link.URL}`)
        console.error(err)

        Log.error(err, 'undetected', { link })
    }
}

export default DownloadEPUBSpider
