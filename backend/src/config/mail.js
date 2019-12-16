/**
 *
 * Serviços de e-mail:
 * - => Amazon SES (utilizado na Rocketseat);
 * - Mailgun;
 * - Sparkpost;
 * - Mandril (Só para quem utiliza o Mailchimp).
 * - Mailtrap (Funciona apenas para ambiente de desenvolvimento)
 * Não é interessante utilizar o SMTP do próprio GMail porque ele tem um limite
 * e bloqueia a utilização
 */

export default {
  host: 'smtp.mailtrap.io',
  port: 2525,
  secure: false,
  auth: {
    user: 'aa761fbbe58902',
    pass: '03a14c63468e90'
  }
}
