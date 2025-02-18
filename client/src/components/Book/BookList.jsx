import { useEffect, useState } from 'react'
import { getAllBooks } from '../../services/bookService';
import './booklist.scss'
const BookList = (props) => {
    const { clickBuy } = props
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks()
    }, [])

    const fetchBooks = async () => {
        let res = await getAllBooks()
        console.log(res)
        if (res.data && res.data.EC == 0) {
            const booksWithImage = res.data.data.map(book => ({
                ...book,
                image_url: `http://localhost:8080${book.image_url}`, // Tạo url tĩnh lấy ảnh từ Backend
            }));
            setBooks(booksWithImage)
        }
        else {
            console.log('Something went wrong')
        }
    }

    return (
        <div className="content ">
            {books.map((item) => {
                return (
                    <div key={item.id} className="card" style={{ width: "18rem", height: "25rem" }}>
                        <img src={item.image_url} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{item.price}</h5>
                            <p className="card-text">{item.title}</p>
                            <p className="">{item.author}</p>
                        </div>
                        <div className="card-btn">
                            <button type="button" className="btn btn-primary">
                                View
                            </button>
                            <button type="button" className="btn btn-success" onClick={() => clickBuy(item)}>
                                Buy
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default BookList