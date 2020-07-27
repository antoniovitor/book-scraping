import { SpiderInterface } from '../module/spider'
import BookInfoSpider from './bookInfo'
import DownloadPDFSpider from './downloadPDF'
import DownloadEPUBSpider from './downloadEPUB'

interface SpiderList {
    [spiderName: string]: SpiderInterface<any>
}

const spiders: SpiderList = {
    'book-info': BookInfoSpider,
    'download-pdf': DownloadPDFSpider,
    'download-epub': DownloadEPUBSpider
}

export default spiders
