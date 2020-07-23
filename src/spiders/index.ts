import bookInfoSpider from './bookInfo'

interface SpiderList {
    [name: string]: () => void
}

const Spiders: SpiderList = {
    'bookInfo': bookInfoSpider
}

export default Spiders
