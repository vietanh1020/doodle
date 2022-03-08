'use strict';

export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Comments',
      [
        {
          name: 'year end party',  
          content: 'okela',
          pollId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {})
  }
}