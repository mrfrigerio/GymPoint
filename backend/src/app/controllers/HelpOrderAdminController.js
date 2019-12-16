import * as Yup from 'yup'
import Student from '../models/Student'
import HelpOrder from '../models/HelpOrder'
import Queue from '../../lib/Queue'
import AnswerMail from '../jobs/AnswerMail'

class HelpOrderAdminController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: { answered_at: null },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email']
        }
      ]
    })

    return res.json(helpOrders)
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      helpOrderId: Yup.number()
        .integer()
        .required(),
      answer: Yup.string().required()
    })

    const { helpOrderId } = req.params
    if (
      !(await schema.isValid({
        helpOrderId: Number.parseInt(helpOrderId, 10),
        ...req.body
      }))
    ) {
      return res.status(400).json({ error: 'Validation fails' })
    }
    const storedHelpOrder = await HelpOrder.findOne({
      where: {
        id: helpOrderId,
        answered_at: null
      },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email']
        }
      ]
    })

    if (!storedHelpOrder) {
      return res.status(400).json({ error: 'Help order not found.' })
    }

    const updatedHelpOrder = await storedHelpOrder.update({
      answer: req.body.answer,
      answered_at: new Date()
    })

    const {
      student: { name: student_name, email: student_email },
      createdAt: created_at,
      question,
      answer
    } = updatedHelpOrder

    // Send Answer Mail
    const data = {
      student_email,
      student_name,
      created_at,
      question,
      answer
    }

    await Queue.add(AnswerMail.key, data)

    return res.json(updatedHelpOrder)
  }
}

export default new HelpOrderAdminController()
