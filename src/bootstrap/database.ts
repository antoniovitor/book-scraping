import { connect } from 'camo'

function connectDatabase () {
    const uri = `nedb://${process.env.NEDB_PATH}/linksDB`

    try {
        return connect(uri)
    } catch (err) {
        console.error('Error trying to connect with database.', err)
    }
}

export default connectDatabase
