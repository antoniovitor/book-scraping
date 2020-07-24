import spiders from '../spiders'
import SpiderHandler from '../module/spider'

async function RunSpiderCommand (spiderName: string) {
    const spider = spiders[spiderName]

    if (spider) {
        const spiderHandler = new SpiderHandler(spider)
        spiderHandler.start()
    } else {
        console.error(`Error: spider ${spiderName} not found.`)
    }
}

export default RunSpiderCommand
