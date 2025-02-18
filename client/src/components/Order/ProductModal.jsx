import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import './ProductModal.scss'
import { addItem } from '../../services/orderService';
const ProductModal = (props) => {
    const { show, handleClose, book } = props
    const [quantity, setQuantity] = useState(1)

    const increaseQuantity = () => {
        if (quantity < book.stock_quantity) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleConfirm = async () => {
        if (quantity <= book.stock_quantity && quantity > 0) {
            console.log(quantity, book.id)
            await addItem(quantity, book.id)
            handleClose();  // Đóng modal sau khi đặt mua
        }
    };
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{book.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-content-container">
                        <div className="image-container">
                            <img src={book.image_url} alt={book.title} />
                        </div>
                        <div className="info-container">
                            <div className="price">Giá: {book.price} VNĐ</div>
                            <div className="stock">Còn lại trong kho: {book.stock_quantity}</div>

                            <div className="quantity-controls">
                                <Button variant="secondary" onClick={decreaseQuantity}>-</Button>
                                <span>{quantity}</span>
                                <Button variant="secondary" onClick={increaseQuantity}>+</Button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleConfirm}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )


}

export default ProductModal