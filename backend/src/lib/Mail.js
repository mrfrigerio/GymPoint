import nodemailer from 'nodemailer'
import exphbs from 'express-handlebars'
import nodemailerhbs from 'nodemailer-express-handlebars'
import { resolve } from 'path'
import mailConfig from '../config/mail'

class Mail {
  constructor() {
    this.init()
    this.configureTemplates()
  }

  init() {
    this.transporter = nodemailer.createTransport(mailConfig)
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails')
    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs'
        }),
        viewPath,
        extName: '.hbs'
      })
    )
  }

  sendMail(data) {
    return this.transporter.sendMail(data)
  }
}

export default new Mail()
