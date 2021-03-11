import axios from 'axios'
import fs from 'fs'

async function downloadAxios () {
    console.log('Sending request')
    const response = await axios.get('http://link.springer.com/content/pdf/10.1007%2Fb100747.pdf', {
        headers: {
            cookie: 'recaptcha=zC5MeAwK7Vu25e5S9dClwrEIUIRzuGZ8S4MZugoFXXg='
        },
        responseType: 'arraybuffer'
    })

    console.log('Getting buffer')
    const buffer = Buffer.from(new Uint8Array(response.data))

    console.log('Saving file')
    fs.writeFileSync('./src/test/file.pdf', buffer, { encoding: 'binary' })
}

export default downloadAxios
