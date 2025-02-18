import axios from '../ultis/axios'

const getAllBooks = async () => {
    return await axios.get(`books`)
}

export {
    getAllBooks
}