import "./home.scss";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BookList from "../../components/Book/BookList";
import { logout } from '../../redux/userSlice';
import { useEffect, useState } from "react";
import ProductModal from "../../components/Order/ProductModal";
import { IoCart } from "react-icons/io5";
import OrderModal from "../../components/Order/OrderModal";
import { initOrder } from "../../services/orderService";
import AutoInitOrder from "../../components/Order/AutoInitOrder";

const HomePage = () => {

  const navigate = useNavigate()
  const { isLoggedIn, user } = useSelector((state) => state.todosUser)
  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState(false)
  const [selectedBook, setSelectedBook] = useState('')
  const [showCart, setShowCart] = useState(false)


  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('access_token');
    localStorage.removeItem('persist:root');
    navigate('/');
  }

  const handleBuy = (book) => {
    if (isLoggedIn) {
      setSelectedBook(book);
      setShowModal(true);
    } else {
      navigate('/login')
    }
  }

  const handleOpenCart = () => {
    setShowCart(true)
  }

  const handleCloseCart = () => {
    setShowCart(false)
  }

  const handleClose = () => {
    setShowModal(false)
  }


  return (
    <>
      <div className="navbar-container">
        <nav className="navbar bg-body-tertiary">
          <div className="container">
            <a className="navbar-brand" href="#" >
              HOME
            </a>
            {isLoggedIn ? //nếu đã login
              <div className="header-container">
                <AutoInitOrder /> {/*tự động khởi tạo cart khi login*/}
                <button onClick={handleOpenCart}
                  style={{ background: "none", border: "none", cursor: "pointer" }}> {/*ẩn button*/}
                  <IoCart size={30} />
                </button>
                {// mở giỏ hàng
                  showCart && <OrderModal show={showCart} handleCloseCart={handleCloseCart} />
                }
                <div>Welcome, {user.name}!</div>
                <button className="btn-logout btn btn-secondary" onClick={handleLogout}>LogOut</button>
              </div>
              ://Nếu chưa login
              <div className="btn-group">

                <button type="button" className="btn btn-primary" onClick={() => { navigate('/login') }}>
                  Login
                </button>
                <button type="button" className="btn btn-success" onClick={() => { navigate('/register') }}>
                  Sign Up
                </button>
              </div>}
          </div>
        </nav>
      </div>
      <div className="content-container">
        <div className="row">
          <div className="col-2">QC</div>
          <div className="col-8 content ">
            <BookList clickBuy={handleBuy} />
            {
              showModal &&
              <ProductModal show={showModal} handleClose={handleClose}
                book={selectedBook}
              />

            }
          </div>
          <div className="col-2">QC</div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
