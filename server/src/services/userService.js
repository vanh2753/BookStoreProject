const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();


const getUserByToken = async (req) => {
    const token = req.headers.authorization?.split(' ')[1]
    const decode = jwt.verify(token, process.env.JWT_SECRET)

    return await User.findOne({ where: { email: decode.email } })

}

module.exports = {
    getUserByToken
}

