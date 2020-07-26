import 'dotenv/config'
import AddLinksCommand from './cmd/AddLinks'
import RunSpiderCommand from './cmd/RunSpider'
import bootstrap from './bootstrap'
import DownloadPDFs from './cmd/DownloadPDFs'

interface FunctionCommands {
    [index:string]: (...args:string[]) => void
}

async function main () {
    /**
     * Bootstrap application
     */
    await bootstrap()

    /**
     * Creates command functions
     */
    const commands: FunctionCommands = {
        /**
         * PHASE 1
         *
         * Adds links to database
        */
        'add-links': (...filesPaths) => {
            AddLinksCommand(filesPaths[0])
        },
        /**
         * PHASE 2
         *
         * Start web scraping
         */
        'run-spider': (...spidersNames) => {
            RunSpiderCommand(spidersNames[0])
        },
        /**
         * PHASE 3
         *
         * Download PDF's
         */
        'download': () => {
            DownloadPDFs()
        }
    }

    /**
     * Extract command function and execute it
     */
    const args = process.argv.slice(2)
    const commandName = args[0]

    const execFunction = commands[commandName]

    if (execFunction) {
        execFunction(...args.slice(1))
    } else {
        console.error(`Error: Command ${commandName} not found.`)
    }
}

/**
 * Start project
 */
main()
