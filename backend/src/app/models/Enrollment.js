import Sequelize, { Model } from 'sequelize'

class Enrollment extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: { type: Sequelize.DATE },
        end_date: { type: Sequelize.DATE },
        price: { type: Sequelize.FLOAT }
      },
      { sequelize }
    )
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' })
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' })
  }
}

export default Enrollment
