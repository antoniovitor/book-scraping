import 'dotenv/config'
import AddLinksCommand from './cmd/AddLinks'
import RunSpiderCommand from './cmd/RunSpider'

interface FunctionCommands {
    [index:string]: (...args:string[]) => void
}

function main () {
    /**
     * Creates command functions
     */
    const commands: FunctionCommands = {
        /**
         * PHASE 1
         *
         * Adds links to database
        */
        'add-links': (...filesPath) => {
            AddLinksCommand(filesPath)
        },
        /**
         * PHASE 2
         *
         * Start web scraping
         */
        'run-spider': (...spiderNames) => {
            const spiderName = spiderNames[0]
            RunSpiderCommand(spiderName)
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
