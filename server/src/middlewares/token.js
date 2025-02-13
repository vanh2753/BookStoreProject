const jwt = require('jsonwebtoken');
require('dotenv').config();

const authToken = (role) => {
    //bắt buộc có return để Express nhận diện nó là 1 middleware func
    return (req, res, next) => {
        const allowed_list = ['/users/register', '/users/login'] //những route ko cần token
        //console.log(req.originalUrl)
        if (allowed_list.find(item => '/api' + item === req.originalUrl)) {
            next() //những route được bỏ qua token
        }
        else {
            // check tồn tại Author trong Header
            if (req.headers.authorization?.split(' ')[1]) {
                const token = req.headers.authorization?.split(' ')[1];
                const decode = jwt.verify(token, process.env.JWT_SECRET)
                //console.log(decode)
                if (role !== decode.role) {
                    return res.status(403).json({
                        message: "Unauthorized"
                    })
                }
                next()
            }
            else {
                return res.status(401).json({
                    message: "No Access Token"
                })
            }
        }
    }
}



module.exports = authToken