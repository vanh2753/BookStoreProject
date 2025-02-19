require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'postgres',
        logging: false
    });

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connect successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
module.exports = { connection, sequelize };