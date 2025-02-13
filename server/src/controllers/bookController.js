const { Model, where } = require('sequelize');
const Book = require('../models/Book')

const getAllBooks = async (req, res) => {
    try {
        const data = await Book.findAll();
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

const createBook = async (req, res) => {
    try {
        let { title, author, genres, price, description, stock_quantity } = req.body;
        let image_url = `/uploads/${req.file.filename}`
        const data = await Book.create({ title, author, genres, price, description, stock_quantity, image_url })

        return res.status(200).json({
            EC: 0,
            message: 'Create Book successfully',
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

const getBookById = async (req, res) => {
    try {
        let BookId = req.params.id // number. req.params => object

        const data = await Book.findAll({
            where: {
                id: BookId
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

const updateBook = async (req, res) => {
    try {
        let id = req.params.id //ép kiểu id
        let { title, author, genres, price, description, stock_quantity } = req.body;
        let book = await Book.findOne({ where: { id } })

        // hàm update trong Sequalize tả về mảng chứa số lượng phần tử được update
        let [updatedBookCount] = await Book.update(
            {
                title: title || book.title,
                author: author || book.author,
                genres: genres || book.genres,
                price:
                    (price !== undefined && price !== null && price !== "") ? price : book.price, // Phải check rõ mọi TH về kiểu data
                description: description || book.description,
                stock_quantity:
                    (stock_quantity !== undefined && stock_quantity !== null && stock_quantity !== "") ? stock_quantity : book.stock_quantity, // Phải check rõ mọi TH về kiểu data
            },
            { where: { id } }
        )
        if (updatedBookCount != 0) {
            let data = await Book.findOne({ where: { id } })
            return res.status(200).json({
                EC: 0,
                data: data,
            });

        }


    } catch (error) {
        return res.status(500).json({
            EC: 1,
            message: 'Something went wrong',
            error: error.message,
        });
    }

}

const deleteBook = async (req, res) => {
    try {
        let id = req.params.id
        await Book.destroy({
            where: {
                id
            }
        })

        return res.status(200).json({
            EC: 0,
            message: 'Delete Book successfully',
        })
    } catch (error) {
        return res.status(500).json({
            EC: 1,
            message: 'Something went wrong',
            error: error.message,
        });
    }
}
module.exports = {
    getAllBooks,
    createBook,
    getBookById,
    updateBook,
    deleteBook
}