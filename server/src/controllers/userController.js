const { Model } = require('sequelize');
const User = require('../models/User')

const getAllUsers = async (req, res) => {
    try {
        const data = await User.findAll();
        return res.status(200).json({
            EC: 0,
            data: data,
        });
    } catch (error) {
        return res.status(500).json({
            EC: 1,
            message: 'Something went wrong',
            error: error.message,
        });
    }
};

const createUser = async (req, res) => {

}

const getUserById = async (req, res) => {
    try {
        let userId = req.params.id // number. req.params => object

        const data = await User.findAll({
            where: {
                id: userId
            },
        });
        return res.status(200).json({
            EC: 0,
            data: data,
        });
    } catch (error) {
        return res.status(500).json({
            EC: 1,
            message: 'Something went wrong',
            error: error.message,
        });
    }

}
module.exports = {
    getAllUsers,
    createUser,
    getUserById
}