const express = require('express')
const router = express.Router();
const { getAllBooks, createBook, getBookById, updateBook, deleteBook } = require('../controllers/bookController')
const uploadBookImg = require('../middlewares/multer')

router.get('/books', getAllBooks)
router.get('/books/:id', getBookById)
router.post('/books', uploadBookImg.single('image_url'), createBook)
router.put('/books/:id', uploadBookImg.single('image_url'), updateBook)
router.delete('/books/:id', deleteBook)

module.exports = router;