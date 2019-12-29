import Sequelize, { Model } from 'sequelize'
import { isBefore, isAfter } from 'date-fns'

class Enrollment extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: { type: Sequelize.DATE },
        end_date: { type: Sequelize.DATE },
        active: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.start_date, new Date()) && isAfter(this.end_date, new Date())
          }
        },
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
