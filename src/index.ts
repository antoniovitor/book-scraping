import 'dotenv/config'
import bootstrap from './bootstrap'

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
        'get-courses': () => {
            // Insert command here
        },
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
