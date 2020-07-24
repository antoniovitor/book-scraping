import BookInfoSpider from './bookInfo'
import { SpiderInterface } from '../module/spider'

interface SpiderList {
    [spiderName: string]: SpiderInterface<any>
}

const spiders: SpiderList = {
    'book-info': BookInfoSpider
}

export default spiders
