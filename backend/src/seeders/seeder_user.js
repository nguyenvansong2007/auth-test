'use strict';

export default {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: '123456',
      image: 'IMAGE',
      roleId: 'R1',
      positionID: 'confirm',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  // down: async (queryInterface, Sequelize) => {
  //   return queryInterface.bulkDelete('Users', null, {});
  // }
};
