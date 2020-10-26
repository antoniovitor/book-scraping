export interface SpiderInterface<DataType = any> {
    /**
     * Keeps the collection of items each to be executed for `execute` function
     */
    data: DataType[] | (() => Promise<DataType[]>)
    /**
     * Execute scraping for each data item
     */
    execute: (item: DataType) => Promise<void>
    /**
     * Max parallel execution
     */
    maxParallel?: number
    /**
     * Catch error function
     */
    catchError?: (err: Error, item: DataType) => void
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
                this.executeNextQueued()
            }
        } else {
            this.queue.forEach(link => {
                this.spider.execute(link)
            })
        }
    }

    getData = () => {
        const { spider } = this

        if (typeof spider.data === 'function') {
            return spider.data()
        }

        return spider.data
    }

    executeNextQueued = () => {
        const nextScraping = this.queue.shift()

        if (nextScraping) {
            return this.spider.execute(nextScraping).catch((err) => {
                this.spider.catchError(err, nextScraping)
            }).then(() => {
                this.executeNextQueued()
            })
        }
    }
}

export default SpiderHandler
