import { SpiderInterface } from '../module/spider'
import Link from '../database/Link'
import axios from 'axios'
import cheerio from 'cheerio'
import fs from 'fs'
import { serializeError } from 'serialize-error'

const BookInfoSpider: SpiderInterface<Link> = {
    maxParallel: 2,

    data: () => {
        return Link.find<Link>({})
    },

    execute: async (link) => {
        console.log(`Running link ${link.URL}`)
        const response = await axios.get(link.URL.toString())
        const scraper = cheerio.load(response.data)

        let errors: any[] = []

        /**
         * Extracts PDF's link
         */
        const relativePdfURL = scraper('.test-bookpdf-link').attr('href')
        if (relativePdfURL) {
            link.pdfURL = `http://link.springer.com${relativePdfURL}`
        } else {
            errors.push('pdf-link-not-found')
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
            fs.appendFile('./src/tmp/detected-errors',
                `****************************\n` +
                `An error has occurred in link: ${link.URL}\n` +
                `_id: ${link._id}\n` +
                `Error: ${JSON.stringify(errors)}\n` +
                `****************************\n\n`
                , console.error)
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
        fs.appendFile('./src/tmp/undetected-errors', `
            ****************************
            An error has occurred in link: ${link.URL}
            _id: ${link._id}
            Error: ${JSON.stringify(serializeError(err))}
            ****************************

        `, console.error)
    }
}

export default BookInfoSpider
