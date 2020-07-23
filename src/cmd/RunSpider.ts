import spiders from '../spiders'

async function RunSpiderCommand (spiderName: string) {
    const spider = spiders[spiderName]

    if (spider) {
        let links: string[]
        if (typeof spider.links === 'function') {
            links = await spider.links()
        } else {
            links = spider.links
        }

        links.forEach(link => {
            spider.execute(link)
        })
    } else {
        console.error(`Spider ${spiderName} not found.`)
    }
}

export default RunSpiderCommand
