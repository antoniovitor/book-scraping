import fs from 'fs'
import Course from '../database/Course'

function AddCoursesCommand (filePath) {
    const courses: any[] = JSON.parse(fs.readFileSync(filePath).toString())

    courses.forEach(item => {
        console.log(`Saving course: ${item.name}`)
        Course.create({ ...item, status: 'created' }).save()
    })

    console.log('Finished.')
}

export default AddCoursesCommand
