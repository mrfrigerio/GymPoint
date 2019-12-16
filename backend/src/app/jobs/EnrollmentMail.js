import { parseISO, format } from 'date-fns'
import pt_BR from 'date-fns/locale/pt-BR'

import Mail from '../../lib/Mail'

class EnrollmentMail {
  get key() {
    return 'EnrollmentMail'
  }

  async handle({ data }) {
    const { storedPlan, storedStudent, end_date, price } = data
    await Mail.sendMail({
      from: 'Equipe GymPoint <noreply@gympoint.com>',
      to: storedStudent.email,
      subject: 'Bem Vindo à GymPoint',
      template: 'enrollment',
      context: {
        student_name: storedStudent.name,
        plan_title: storedPlan.title,
        end_date: format(parseISO(end_date), 'dd/MM/yyyy', { locale: pt_BR }),
        price: `R$ ${price},00`
      }
    })
  }
}
export default new EnrollmentMail()
