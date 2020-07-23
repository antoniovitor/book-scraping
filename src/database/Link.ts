import { Document, DocumentSchema } from 'camo'

interface Schema extends DocumentSchema {
    URL: string
    pdfURL?: string
}

class Link extends Document<Schema> {
    constructor () {
        super()

        this.schema({
            URL: String,
            pdfURL: String
        })
    }
}

export default Link
