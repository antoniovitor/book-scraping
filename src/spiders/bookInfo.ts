import { SpiderInterface } from '../module/spider'
import Link from '../database/Link'
import axios from 'axios'
import cheerio from 'cheerio'
import fs from 'fs'

const BookInfoSpider: SpiderInterface<Link> = {
    maxParallel: 2,

    data: async () => {
        return (await Link.find<Link>({})).slice(0, 1)
    },

    execute: async (link) => {
        console.log(`Running link ${link.URL}`)
        const response = await axios.get(link.URL.toString())
        const scraper = cheerio.load(response.data)

        let errors: [] = []

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

        link.errors = errors

        link.save()
    },

    catchError: (err, link) => {
        console.log(`An error has occured in link: ${link.URL}`)
        console.error(err)
    }
}

export default BookInfoSpider
