import { parseISO, format } from 'date-fns'
import pt_BR from 'date-fns/locale/pt-BR'

import Mail from '../../lib/Mail'

class AnswerMail {
  get key() {
    return 'AnswerMail'
  }

  async handle({ data }) {
    const { student_email, student_name, created_at, question, answer } = data
    await Mail.sendMail({
      from: 'Equipe GymPoint <noreply@gympoint.com>',
      to: student_email,
      subject: 'Resposta ao seu pedido de auxílio',
      template: 'help-order',
      context: {
        student_name,
        created_at: format(parseISO(created_at), 'dd/MM/yyyy', {
          locale: pt_BR
        }),
        question,
        answer
      }
    })
  }
}
export default new AnswerMail()
