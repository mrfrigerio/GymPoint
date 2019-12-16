import Sequelize, { Model } from 'sequelize'

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: { type: Sequelize.STRING },
        duration: { type: Sequelize.INTEGER },
        price: { type: Sequelize.FLOAT }
      },
      { sequelize }
    )
  }
}

export default Plan
