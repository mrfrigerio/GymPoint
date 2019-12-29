import { Op } from 'sequelize'
import * as Yup from 'yup'
import Student from '../models/Student'
// name, email, age, weight, height

class StudentController {
  async index(req, res) {
    const students = await Student.findAll({
      where: {
        name: { [Op.iLike]: req.query.name ? `%${req.query.name}%` : '%' }
      },
    })
    return res.json(students)
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().integer(),
      weight: Yup.number(),
      height: Yup.number()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' })
    }

    const storedStudent = await Student.findOne({
      where: {
        email: req.body.email
      }
    })
    if (storedStudent) {
      return res.status(401).json({ error: 'This student already exists' })
    }
    const student = await Student.create(req.body)
    return res.json(student)
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number()
        .integer()
        .required(),
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number().integer(),
      weight: Yup.number(),
      height: Yup.number()
    })

    const { studentId } = req.params
    if (!(await schema.isValid({ id: studentId, ...req.body }))) {
      return res.status(401).json({ error: 'Validation fails' })
    }

    const { email } = req.body
    const storedStudent = await Student.findByPk(studentId)

    if (email !== storedStudent.email) {
      const alreadyExistentStudent = await Student.findOne({ where: { email } })
      if (alreadyExistentStudent) {
        return res
          .status(401)
          .json({ error: 'This email belongs to another student' })
      }
    }

    const updatedStudent = await storedStudent.update(req.body)
    return res.json(updatedStudent)
  }

  async delete(req, res) {

    const { studentId: id } = req.params
    const schema = Yup.object().shape({
      id: Yup.number().integer().required()
    })

    if (!schema.isValid({ id })) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const student = await Student.findByPk(id)
    if (!student) {
      return res.status(400).json({ error: 'Student not found' })
    }

    await student.destroy()

    return res.json()

  }
}

export default new StudentController()
