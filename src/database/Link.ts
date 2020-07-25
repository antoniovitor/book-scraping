import { Document, DocumentSchema } from 'camo'

interface Schema extends DocumentSchema {
    URL: string
    pdfURL?: string
    authors?: string
    bookName?: string
    status: 'created'
        | 'scraped'
        | 'downloaded'
        | 'error-scrap'
        | 'error-download'
    errors: []
}

class Link extends Document<Schema> {
    URL: string
    pdfURL?: string
    authors?: string
    bookName?: string
    status: 'created'
        | 'scraped'
        | 'downloaded'
        | 'error-scrap'
        | 'error-download'
    errors: []

    constructor () {
        super()

        this.schema({
            URL: String,
            pdfURL: String,
            status: String,
            authors: String,
            bookName: String,
            errors: []
        })
    }
}

export default Link
