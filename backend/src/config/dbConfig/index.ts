const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('doodle','abc','p4ssword',{host: 'mysql', dialect:'mysql'})

let connectDB = async ()=>{
    try {
        await sequelize.authenticate();
        console.log('Kết nối đến DB thành công');
      } catch (error) {
        console.error('Lỗi kết nối DB', error);
      }  
} 

module.exports = connectDB