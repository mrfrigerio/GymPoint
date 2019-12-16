import * as Yup from 'yup'
import Plan from '../models/Plan'

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll()
    return res.json(plans)
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .integer()
        .required(),
      price: Yup.number().required()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' })
    }

    const storedPlan = await Plan.findOne({
      where: {
        title: req.body.title
      }
    })

    if (storedPlan) {
      return res.status(401).json({ error: 'Plan already exists.' })
    }

    const plan = await Plan.create(req.body)
    return res.json(plan)
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number()
        .integer()
        .required(),
      title: Yup.string(),
      duration: Yup.number().integer(),
      price: Yup.number()
    })

    const { planId } = req.params

    if (!(await schema.isValid({ id: planId, ...req.body }))) {
      return res.status(401).json({ error: 'Validation fails' })
    }

    const storedPlan = await Plan.findByPk(planId)

    if (!storedPlan) {
      return res.status(401).json({ error: 'Plan not found.' })
    }

    const updatedPlan = await storedPlan.update(req.body)
    return res.json(updatedPlan)
  }

  async delete(req, res) {
    const { planId } = req.params
    const storedPlan = await Plan.findByPk(planId)

    if (!storedPlan) {
      return res.status(401).json({ error: 'Plan not found.' })
    }
    await storedPlan.destroy()

    return res.json({ success: 'Plan deleted.' })
  }
}

export default new PlanController()
