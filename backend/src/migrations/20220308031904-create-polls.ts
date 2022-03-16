
module.exports = {
  async up(queryInterface: { createTable: (arg0: string, arg1: { id: { allowNull: boolean; autoIncrement: boolean; primaryKey: boolean; type: any; }; question: { allowNull: boolean; type: any; }; image: { type: any; }; description: { type: any; }; address: { type: any; }; map: { type: any; }; startAt: { allowNull: boolean; type: any; }; endAt: { allowNull: boolean; type: any; }; answer: { allowNull: boolean; type: any; }; multipleVote: { allowNull: boolean; type: any; }; userId: { allowNull: boolean; type: any; }; createdAt: { allowNull: boolean; type: any; }; updatedAt: { allowNull: boolean; type: any; }; }) => any; }, Sequelize: { INTEGER: any; STRING: any; TEXT: any; DATE: any; JSON: any; BOOLEAN: any; }) {
    await queryInterface.createTable('Polls', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question: {
        allowNull: false,
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      address: {
        type: Sequelize.STRING
      },
      map: {
        type: Sequelize.STRING
      },
      startAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      endAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      answer: {
        allowNull: false,
        type: Sequelize.JSON
      },
      multipleVote: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface: { dropTable: (arg0: string) => any; }, Sequelize: any) {
    await queryInterface.dropTable('Polls');
  }
};