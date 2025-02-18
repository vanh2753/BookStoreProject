import axios from '../ultis/axios'
const access_token = localStorage.getItem("access_token");

const confirmOrder = async () => {
    const res = await axios.put(`orders`, {}, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })
    return res.data
}
const initOrder = async () => {
    const res = await axios.post(`orders`, {}, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })
    return res.data
}

const addItem = async (quantity, book_id) => {
    const res = await axios.post(`order-detail`, { quantity, book_id }, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })
    return res.data
}

const getAllItems = async () => {
    const res = await axios.get(`order-detail`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })
    return res.data
}
export {
    confirmOrder,
    initOrder,
    addItem,
    getAllItems
}