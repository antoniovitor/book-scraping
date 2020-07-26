import Link from '../database/Link'

async function DownloadPDFs () {
    const links = await Link.find({ status: 'scraped' })

    console.log('Lenght:', links.length)
}

export default DownloadPDFs
