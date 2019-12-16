import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcryptjs'

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING },
        password: { type: Sequelize.VIRTUAL },
        password_hash: { type: Sequelize.STRING }
      },
      { sequelize }
    )

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8)
      }
    })
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash)
  }
}

export default User
