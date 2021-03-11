import { Document, DocumentSchema } from 'camo'

interface Schema extends DocumentSchema {
    name: string
    link: string
    status: 'created'
        | 'downloaded'
        | 'error-download'
    errors: []
}

class Course extends Document<Schema> {
    name: string
    link: string
    status: 'created'
        | 'downloaded'
        | 'error-download'
    errors: any[]

    constructor () {
        super()

        this.schema({
            name: String,
            link: String,
            status: String,
            errors: []
        })
    }
}

export default Course
