import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getAllItems, confirmOrder, initOrder } from "../../services/orderService";
import './OrderModal.scss'

const OrderModal = (props) => {
    const { show, handleCloseCart } = props
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [isConfirmed, setIsConfirmed] = useState(false);

    useEffect(() => {
        if (show) {
            fetchCartItems();
        }
    }, [show]);

    const fetchCartItems = async () => {
        const res = await getAllItems();
        setCartItems(res.data);
    };

    const handleConfirmOrder = async () => {
        try {
            const res = await confirmOrder();
            setTotalAmount(res.data.total_amount);
            setIsConfirmed(true);
        } catch (error) {
            console.error("Error confirming order:", error);
            alert("Đã có lỗi xảy ra khi xác nhận đơn hàng.");
        }
    };

    const resetCart = async () => {
        const res = await initOrder()
        setCartItems([]);
        setTotalAmount(0);
        setIsConfirmed(false);
    }

    const handleClose = () => {
        if (isConfirmed) {
            resetCart();
        }
        handleCloseCart();
    }
    return (
        <Modal show={show} onHide={handleCloseCart}>
            <Modal.Header closeButton>
                <Modal.Title>Giỏ hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="table-container">
                    <thead>
                        <tr>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.book.title}</td>
                                <td>{item.price} VND</td>
                                <td>{item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {isConfirmed && (
                    <div className="total-container">
                        <p>Tổng tiền: {totalAmount} VND</p>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                {!isConfirmed && cartItems.length > 0 && (
                    <Button variant="primary" onClick={handleConfirmOrder}>
                        Xác nhận
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default OrderModal;