import { SpiderInterface } from '../module/spider'
import Link from '../database/Link'
import axios from 'axios'
import fs from 'fs'
import { serializeError } from 'serialize-error'
import sanitizeFilename from 'sanitize-filename'
import cookiesConfig from '../config/cookies'

/**
 * Extracts data about books
 */
const DownloadPDFSpider: SpiderInterface<Link> = {
    maxParallel: 6,

    data: async () => {
        const links = await Link.find<Link>({ status: 'scraped' })
        return links.filter(link => link.pdf)
    },

    execute: async (link) => {
        console.log(`[START] ${link.bookName}`)

        const response = await axios.get(link.pdf, {
            headers: {
                cookie: `recaptcha=${cookiesConfig.recaptcha}`
            },
            responseType: 'arraybuffer'
        })

        if (response.headers['content-type'] === 'application/pdf') {
            const buffer = Buffer.from(new Uint8Array(response.data))

            const filename = sanitizeFilename(`[${link._id}] ${link.authors}. ${link.bookName}.pdf`)

            fs.writeFileSync(`./books/pdf/${filename}`, buffer, { encoding: 'binary' })

            link.pdfDownloaded = true
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

        const { code, message, name } = serializeError(err)
        fs.appendFile('./src/tmp/undetected-errors.log', `
            ****************************
            An error has occurred in link: ${link.URL}
            _id: ${link._id}
            Error: ${JSON.stringify({ name, code, message })}
            ****************************

        `, () => {})
    }
}

export default DownloadPDFSpider
