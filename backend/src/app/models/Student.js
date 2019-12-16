import Sequelize, { Model } from 'sequelize'

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING },
        age: { type: Sequelize.INTEGER },
        weight: { type: Sequelize.FLOAT },
        height: { type: Sequelize.FLOAT }
      },
      { sequelize }
    )
  }
}

export default Student
