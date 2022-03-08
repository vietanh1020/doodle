'use strict';

export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Comments',
      [
        {
          fullName: 'vietanh1020',  
          answer: '',
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