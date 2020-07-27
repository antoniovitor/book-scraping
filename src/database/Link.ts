import { Document, DocumentSchema } from 'camo'

interface Schema extends DocumentSchema {
    URL: string
    pdf?: string
    pdfDownloaded?: boolean
    epub?: string
    epubDownloaded?: string
    authors?: string
    bookName?: string
    status: 'created'
        | 'scraped'
        | 'error-scrap'
    errors: []
}

class Link extends Document<Schema> {
    URL: string
    pdf?: string
    pdfDownloaded?: boolean
    epub?: string
    epubDownloaded?: boolean
    authors?: string
    bookName?: string
    status: 'created'
        | 'scraped'
        | 'downloaded'
        | 'error-scrap'
        | 'error-download'
    errors: any[]

    constructor () {
        super()

        this.schema({
            URL: String,
            pdf: String,
            pdfDownloaded: Boolean,
            epub: String,
            epubDownloaded: Boolean,
            status: String,
            authors: String,
            bookName: String,
            errors: []
        })
    }
}

export default Link
