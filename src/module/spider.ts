export interface SpiderInterface<DataType = any> {
    /**
     * Keeps the collection of items each to be executed for `execute` function
     */
    data: [] | (() => Promise<DataType[]>)
    /**
     * Execute scraping for each data item
     */
    execute: (item: DataType) => Promise<void>
    /**
     * Max parallel execution
     */
    maxParallel?: number
}

class SpiderHandler {
    private spider: SpiderInterface
    private queue: any[]

    constructor (spider: SpiderInterface) {
        this.spider = spider
    }

    start = async () => {
        const { spider } = this
        this.queue = await this.getData()

        if (spider.maxParallel) {
            for (let i = 0; i < spider.maxParallel; i++) {
                console.log('Worker:', i)
                this.executeNextQueued()
            }
        } else {
        }
    }

    getData = () => {
        const { data } = this.spider

        if (typeof data === 'function') {
            return data()
        }

        return data
    }

    executeNextQueued = () => {
        const nextScraping = this.queue.shift()

        if (nextScraping) {
            return this.spider.execute(nextScraping).catch().then(() => {
                this.executeNextQueued()
            })
        }
    }
}

export default SpiderHandler
