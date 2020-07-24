import fs from 'fs'
import Link from '../database/Link'

function AddLinksCommand (filePath) {
    const links: string[] = JSON.parse(fs.readFileSync(filePath).toString())

    links.forEach(linkString => {
        Link.create({ URL: linkString, status: 'created' }).save()
    })
}

export default AddLinksCommand
