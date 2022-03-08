'use strict';

export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Events',
      [
        {
          email: 'anh.vv@zinza.com.vn',  
          firstName: "Anh",
          lastName: "Võ Việt",
          password:"123456789",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('People', null, {})
  }
}