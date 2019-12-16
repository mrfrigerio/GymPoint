// import { } from 'date-fns'
import { Op } from 'sequelize'
import { subDays, startOfDay, isBefore } from 'date-fns'
import Checkin from '../models/Checkin'
import Student from '../models/Student'
import Enrollment from '../models/Enrollment'

class CheckinController {
  async index(req, res) {
    const { studentId } = req.params
    const storedStudent = await Student.findByPk(studentId)

    if (!storedStudent) {
      return res.status(400).json({ error: 'Student not found.' })
    }

    const checkins = await Checkin.findAll({
      where: {
        student_id: studentId
      },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email']
        }
      ]
    })

    return res.json(checkins)
  }

  async store(req, res) {
    const { studentId: student_id } = req.params

    const enrollment = await Enrollment.findOne({ where: { student_id } })

    if (!enrollment) {
      return res
        .status(400)
        .json({ error: 'Enrollmentt not found for this student!' })
    }

    if (isBefore(enrollment.end_date, new Date())) {
      return res.status(400).json({
        error: 'Enrollmentt expired. Please, go to the administration.'
      })
    }

    const CHECKIN_LIMIT = 5
    const checkins = await Checkin.findAndCountAll({
      where: {
        student_id,
        created_at: {
          [Op.between]: [startOfDay(subDays(new Date(), 6)), new Date()]
        }
      }
    })

    if (checkins.count >= CHECKIN_LIMIT) {
      return res.status(401).json({
        error: `Checkin limit exceded (maximum ${CHECKIN_LIMIT} in a 7 day period)`
      })
    }

    const checkin = await Checkin.create({ student_id })
    return res.json(checkin)
  }
}

export default new CheckinController()
