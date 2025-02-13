const express = require('express')
const app = express()
const port = 8080;
const { connection, sequelize } = require('./src/config/database')
const path = require('path')

const User = require('./src/models/User')
const Book = require('./src/models/Book')
const Order = require('./src/models/Order')
const OrderDetail = require('./src/models/OrderDetail')
const userRoutes = require('./src/routes/userRoutes');
const bookRoutes = require('./src/routes/bookRoutes');
const orderRoutes = require('./src/routes/orderRoutes')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'src/uploads'))); // folder lưu ảnh

console.log("1 năm mới Bình An")

app.use('/api', userRoutes);
app.use('/api', bookRoutes);
app.use('/api', orderRoutes);

connection() //test connection

sequelize.sync({ force: false }) //đồng bộ hóa db và tránh bị ghi đè với force


app.get('/', (req, res) => {
    res.send('Hello World! weelong')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});



