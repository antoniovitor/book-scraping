import fs from 'fs'
import { serializeError } from 'serialize-error'

const Log = {
    error: (err: any, category: string, data: object) => {
        const { code, message, name } = serializeError(err)
        fs.appendFile('./src/tmp/undetected-errors.log',
            `****************************` +
            `data: ${JSON.stringify(data, null, 4)}` +
            `Error: ${JSON.stringify({ name, code, message })}` +
            `****************************`,
            () => {})
    }
}

export default Log
