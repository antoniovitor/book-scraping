import { SpiderInterface } from '../module/spider'
import BookInfoSpider from './bookInfo'
import DownloadPDFSpider from './downloadPDF'

interface SpiderList {
    [spiderName: string]: SpiderInterface<any>
}

const spiders: SpiderList = {
    'book-info': BookInfoSpider,
    'download-link': DownloadPDFSpider
}

export default spiders
