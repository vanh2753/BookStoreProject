const bcrypt = require('bcrypt');
const { Model } = require('sequelize');
const User = require('../models/User')
require('dotenv').config();
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const handleRegister = async (req, res) => {
    try {
        let { name, phone, email, password, role } = req.body

        let hashPW = await bcrypt.hash(password, saltRounds) //mã hóa pw
        console.log(hashPW)

        const data = await User.create({ name, phone, email, password: hashPW, role })

        return res.status(200).json({
            EC: 0,
            message: 'Create user successfully',
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            EC: 1,
            message: 'Something went wrong',
            error: error.message,
        });
    }
}

const handleLogin = async (req, res) => {

    try {
        let { email, password } = req.body
        let user = await User.findOne({ where: { email: email } })
        let hash = user.password

        if (user) {
            bcrypt.compare(password, hash, (err, result) => {
                if (result) {
                    // tạo access_token
                    const payload = { email: user.email, role: user.role }
                    const access_token = jwt.sign(
                        payload,
                        process.env.JWT_SECRET,
                        {//option
                            expiresIn: process.env.JWT_EXPIRE
                        }
                    )
                    // Loại bỏ password từ user
                    const { password, ...userWithoutPassword } = user.get({ plain: true });
                    return res.status(200).json({
                        EC: 0,
                        message: 'Login',
                        access_token: access_token,
                        data: userWithoutPassword
                    })
                }
                else {
                    return res.status(200).json({
                        EC: 1,
                        message: 'Wrong Email or Password'
                    })
                }
            })
        }
        else {
            return res.status(200).json({
                EC: 1,
                message: 'No user exist'
            })
        }
    } catch (error) {
        return res.status(500).json({
            EC: 1,
            message: 'Something went wrong',
            error: error.message,
        });
    }
}

module.exports = {
    handleLogin,
    handleRegister
}