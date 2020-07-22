import originalLinks from './data/originalLinks'
import axios from 'axios'
import cheerio from 'cheerio'
import fs from 'fs'

export const getLink = async (link) => {
    const rawHtml = await axios.get(link)
    const spider = cheerio.load(rawHtml.data)

    return spider('.test-bookpdf-link').attr('href')
}

export const getContentLinks = () => Promise.all(originalLinks.map(async (link) => {
    return { original: link, content: await getLink(link) }
}))

const saveNewLinksToFile = async () => {
    const links = await getContentLinks()
    fs.writeFileSync('./src/tmp/newLinks.json', JSON.stringify(links))
}

export default saveNewLinksToFile
