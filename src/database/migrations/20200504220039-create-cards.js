module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('cards', {
      id: {
        type: Sequelize.INTEGER,
        allowNUll: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: Sequelize.STRING,
      content: Sequelize.STRING,
      created_at: {
        type: Sequelize.DATE,
        allowNUll: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNUll: false,
      },
    }),
  down: queryInterface => queryInterface.dropTable('cards'),
};
