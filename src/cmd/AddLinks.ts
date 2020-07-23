import fs from 'fs'
import Link from '../database/Link'

function AddLinksCommand (filePaths:string[]) {
    const filePath = filePaths[0]
    const links: string[] = JSON.parse(fs.readFileSync(filePath).toString())

    links.forEach(linkString => {
        Link.create({ URL: linkString }).save()
    })
}

export default AddLinksCommand
