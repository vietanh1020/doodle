'use strict';

export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Events',
      [
        {
          question: 'Ngày 8/3 là ngày gì?',  
          image: 'url',
          description: 'test DESC',
          address: '',
          map: '',
          startAt: new Date('2022-05-01T00:00:00.000Z'),
          endAt: new Date('2022-06-01T00:00:00.000Z'),
          answer:'' ,
          multipleVote: true,
          userId : 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('People', null, {})
  }
}