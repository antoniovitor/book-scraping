import { Document, DocumentSchema } from 'camo'

interface Schema extends DocumentSchema {
    URL: string
    pdfURL?: string
    status: 'created'
        | 'scraped'
        | 'downloaded'
        | 'error-scrap'
        | 'error-download'
}

class Link extends Document<Schema> {
    constructor () {
        super()

        this.schema({
            URL: String,
            pdfURL: String,
            status: String
        })
    }
}

export default Link
