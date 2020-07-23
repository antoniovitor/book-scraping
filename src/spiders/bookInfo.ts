import Spider from '../module/spider'
import Link from '../database/Link'

class BookInfoSpider extends Spider {
    static links = async () => {
        const links = await Link.find({})
        return links.map(link => link.URL) as string[]
    }

    static execute = (link: string) => {
        console.log(link)
    }
}

export default BookInfoSpider
