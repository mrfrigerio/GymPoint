import Sequelize, { Model } from 'sequelize'

class HelpOrder extends Model {
  static init(sequelize) {
    super.init(
      {
        question: { type: Sequelize.STRING },
        answer: { type: Sequelize.STRING },
        answered_at: { type: Sequelize.DATE }
      },
      { sequelize }
    )
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' })
  }
}

export default HelpOrder
