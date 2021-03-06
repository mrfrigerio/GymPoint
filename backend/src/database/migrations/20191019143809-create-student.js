// Students fields: nome, email, idade, peso e altura

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('students', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      age: {
        type: Sequelize.INTEGER
      },
      weight: {
        type: Sequelize.FLOAT
      },
      height: {
        type: Sequelize.FLOAT
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable('users')
  }
}
