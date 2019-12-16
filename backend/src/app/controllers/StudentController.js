import * as Yup from 'yup'
import Student from '../models/Student'
// name, email, age, weight, height

class StudentController {
  async index(req, res) {
    const students = await Student.findAll()
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
}

export default new StudentController()
