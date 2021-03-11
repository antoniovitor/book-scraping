import { SpiderInterface } from '../module/spider'
import DownloadPDFSpider from './downloadPDF'

interface SpiderList {
    [spiderName: string]: SpiderInterface<any>
}

const spiders: SpiderList = {
    // Inser Spiders here. Example:
    'download-pdf': DownloadPDFSpider,
}

export default spiders
