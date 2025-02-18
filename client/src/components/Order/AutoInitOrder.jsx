import React, { useEffect } from 'react';
import { initOrder } from '../../services/orderService';

const AutoInitOrder = () => {
    useEffect(() => {
        fetchOrder()
    }, [])
}


const fetchOrder = async () => {
    await initOrder()
}

export default AutoInitOrder