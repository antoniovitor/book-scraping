import connectDatabase from './database'

async function bootstrap () {
    await connectDatabase()
}

export default bootstrap
