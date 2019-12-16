import { isBefore } from 'date-fns'
import * as Yup from 'yup'

import Student from '../models/Student'
import Enrollment from '../models/Enrollment'
import HelpOrder from '../models/HelpOrder'

class HelpOrderStudentController {
  async index(req, res) {
    const { studentId: student_id } = req.params

    const schema = Yup.object().shape({
      student_id: Yup.number()
        .integer()
        .required()
    })

    if (
      !(await schema.isValid({ student_id: Number.parseInt(student_id, 10) }))
    ) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const helpOrders = await HelpOrder.findAll({ where: { student_id } })

    return res.json(helpOrders)
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .integer()
        .required(),
      question: Yup.string().required()
    })

    const { studentId: student_id } = req.params

    if (
      !(await schema.isValid({
        student_id: Number.parseInt(student_id, 10),
        ...req.body
      }))
    ) {
      return res.status(400).json({ error: 'Validation fails' })
    }
    const storedStudent = await Student.findByPk(student_id)

    if (!storedStudent) {
      return res.status(400).json({ error: 'Student not found.' })
    }

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

    const helpOrder = await HelpOrder.create({
      student_id,
      ...req.body
    })
    return res.json(helpOrder)
  }
}

export default new HelpOrderStudentController()
