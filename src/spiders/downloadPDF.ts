import { SpiderInterface } from '../module/spider'
import Course from '../database/Course'
import axios from 'axios'
import fs from 'fs'
import sanitizeFilename from 'sanitize-filename'
import Log from '../module/log'

/**
 * Extracts data about books
 */
const DownloadPDFSpider: SpiderInterface<Course> = {
    maxParallel: 6,

    data: async () => {
        const courses = await Course.find<Course>({ status: 'created' })

        console.log(courses.length)

        return courses
    },

    execute: async (course) => {
        console.log(`[START] ${course.name}`)

        const response = await axios.get(course.link, {
            responseType: 'arraybuffer'
        })

        if (response.headers['content-type'] === 'application/pdf') {
            const buffer = Buffer.from(new Uint8Array(response.data))

            const filename = sanitizeFilename(`[${course._id}] ${course.name}.pdf`)

            fs.writeFileSync(`./courses/${filename}`, buffer, { encoding: 'binary' })

            course.status = 'downloaded'
            course.save()

            console.log(`[END] ${course.status} saved.`)
        } else {
            console.error('Error')
        }
    },

    catchError: (err, course) => {
        console.error(`An error has occurred in link: ${course.name}`)
        console.error(err)

        Log.error(err, 'undetected', { course })
    }
}

export default DownloadPDFSpider
