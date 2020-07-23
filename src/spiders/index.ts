import BookInfoSpider from './bookInfo'
import Spider from '../module/spider'

interface SpiderList {
    [name: string]: typeof Spider
}

const Spiders: SpiderList = {
    'book-info': BookInfoSpider
}

export default Spiders
