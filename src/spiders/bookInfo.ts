import { SpiderInterface } from '../module/spider'
import Link from '../database/Link'
// import axios from 'axios'
// import cheerio from 'cheerio'

const BookInfoSpider: SpiderInterface<Link> = {
    data: async () => {
        return Link.find({})
    },
    execute: async (link) => {
        console.log(`Start scraping ${link._id}.`)
    },
    maxParallel: 4
}

export default BookInfoSpider
