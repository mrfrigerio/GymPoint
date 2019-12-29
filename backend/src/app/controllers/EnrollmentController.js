import { parseISO, addMonths, endOfDay } from 'date-fns'
import * as Yup from 'yup'
import Enrollment from '../models/Enrollment'
import Student from '../models/Student'
import Plan from '../models/Plan'
import Queue from '../../lib/Queue'
import EnrollmentMail from '../jobs/EnrollmentMail'

class EnrollmentController {
  async index(req, res) {
    const enrollments = await Enrollment.findAll({
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email']
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title', 'duration']
        }
      ]
    })
    return res.json(enrollments)
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .integer()
        .required(),
      plan_id: Yup.number()
        .integer()
        .required(),
      start_date: Yup.date().required()
    })

    const { studentId: student_id } = req.params
    const { plan_id, start_date } = req.body

    if (!(await schema.isValid({ student_id, ...req.body }))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const storedStudent = await Student.findByPk(student_id)
    if (!storedStudent) {
      return res.status(400).json({ error: 'Student not found.' })
    }

    const storedPlan = await Plan.findByPk(plan_id)
    if (!storedPlan) {
      return res.status(400).json({ error: 'Plan not found.' })
    }

    const end_date = endOfDay(
      addMonths(parseISO(start_date), storedPlan.duration)
    )
    const price = storedPlan.price * storedPlan.duration

    const enrollment = await Enrollment.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price
    })

    // Send Enrollment Mail
    await Queue.add(EnrollmentMail.key, {
      storedPlan,
      storedStudent,
      end_date,
      price
    })

    return res.json(enrollment)
  }

  async update(req, res) {
    const { enrollmentId } = req.params

    const schema = Yup.object().shape({
      enrollmentId: Yup.number()
        .integer()
        .required(),
      plan_id: Yup.number().integer(),
      start_date: Yup.date(),
      student_id: Yup.number().integer()
    })

    if (!(await schema.isValid({ enrollmentId, ...req.body }))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const storedEnrollment = await Enrollment.findByPk(enrollmentId)

    if (!storedEnrollment) {
      return res.status(400).json({ error: 'Enrollment not found.' })
    }

    const { plan_id, student_id, start_date } = req.body

    let storedPlan = null
    let storedStudent = null

    if (plan_id) {
      storedPlan = await Plan.findByPk(plan_id)
      if (!storedPlan) {
        return res.status(400).json({ error: 'Plan not found.' })
      }
    }

    if (student_id) {
      storedStudent = await Student.findByPk(student_id)
      if (!storedStudent) {
        return res.status(400).json({ error: 'Student not found.' })
      }
    }

    const end_date = endOfDay(
      addMonths(parseISO(start_date), storedPlan.duration)
    )
    const price = storedPlan.price * storedPlan.duration

    const updatedEnrollment = await storedEnrollment.update({
      student_id,
      plan_id,
      start_date,
      end_date,
      price
    })

    // Send Enrollment Mail
    await Queue.add(EnrollmentMail.key, {
      storedPlan,
      storedStudent,
      end_date,
      price
    })

    return res.json(updatedEnrollment)
  }

  async delete(req, res) {
    const { enrollmentId } = req.params
    const storedEnrollment = await Enrollment.findByPk(enrollmentId)

    if (!storedEnrollment) {
      return res.status(400).json({ error: 'Enrollment not found.' })
    }

    await storedEnrollment.destroy()
    return res.json({ success: 'Enrollment deleted' })
  }
}

export default new EnrollmentController()
