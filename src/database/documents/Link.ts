import { Document, DocumentSchema } from 'camo'

interface Schema extends DocumentSchema {
    URL: StringConstructor
    pdfURL?: StringConstructor
}

class Link extends Document<Schema> {
    constructor () {
        super()

        this.schema<Schema>({
            URL: String,
            pdfURL: String
        })
    }
}

export default Link
