import * as Yup from 'yup'
import User from '../models/User'

// index, show, store, update, delete

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required(),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password')])
        .required()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' })
    }

    const storedUser = await User.findOne({ where: { email: req.body.email } })
    if (storedUser) {
      return res.status(401).json({ error: 'User already exists.' })
    }
    const user = await User.create(req.body)
    return res.json(user)
  }

  async index(req, res) {
    const storedUsers = await User.findAll({
      attributes: ['id', 'name', 'email']
    })
    res.json(storedUsers)
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string()
        .email()
        .required(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      passwordConfirm: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      )
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' })
    }
    const { email, oldPassword } = req.body
    const user = await User.findByPk(req.userId)

    if (email !== user.email) {
      const storedUser = await User.findOne({ where: { email } })
      if (storedUser) {
        return res.status(401).json({ error: 'User already exists.' })
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match.' })
    }

    const updatedUser = await user.update(req.body)
    return res.json(updatedUser)
  }
}

export default new UserController()
