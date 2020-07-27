import { SpiderInterface } from '../module/spider'
import Link from '../database/Link'
import axios from 'axios'
import cheerio from 'cheerio'
import fs from 'fs'
import { serializeError } from 'serialize-error'

/**
 * Extracts data about books.
 */
const BookInfoSpider: SpiderInterface<Link> = {
    maxParallel: 6,

    data: async () => {
        const links = await Link.find<Link>({})
        return links
    },

    execute: async (link) => {
        console.log(`Running link ${link.URL}`)
        const response = await axios.get(link.URL.toString())
        const scraper = cheerio.load(response.data)

        let errors: any[] = []

        /**
         * Extracts PDF's link
         */
        const relativePdfURLs = scraper(`a[data-track-action='Book download - pdf']`).attr('href')

        if (relativePdfURLs) {
            link.pdf = `http://link.springer.com${relativePdfURLs}`
        } else {
            errors.push('pdf-link-not-found')
        }
        /**
         * Extracts EPUB's link
         */
        const relativeEpubURLs = scraper(`a[data-track-action='Book download - ePub']`).attr('href')

        if (relativeEpubURLs) {
            link.epub = `http://link.springer.com${relativeEpubURLs}`
        }

        /**
         * Extract authors names
         */
        link.authors = scraper('span.authors__name').map(
            (index, elem) => scraper(elem).text()
        ).get().join('; ')

        /**
         * Extracts book name
         */
        link.bookName = scraper('div.page-title > h1').text()

        if (errors.length > 0) {
            link.errors = errors
            link.status = 'error-scrap'

            /**
             * Saves and log errors
             */
            fs.appendFile('./src/tmp/detected-errors.log',
                `****************************\n` +
                `An error has occurred in link: ${link.URL}\n` +
                `_id: ${link._id}\n` +
                `Error: ${JSON.stringify(errors)}\n` +
                `****************************\n\n`
                , () => {})
        } else {
            link.status = 'scraped'
        }

        /**
         * Saves new data to DB
         */
        link.save()
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

export default BookInfoSpider
