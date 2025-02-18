import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Sử dụng LocalStorage

const persistConfig = {
    key: 'root', // Tên khóa để lưu trữ state
    storage,     // Bộ nhớ sử dụng (LocalStorage)
};

const persistedReducer = persistReducer(persistConfig, userReducer); //tạo persisted cho reducer

const store = configureStore({
    reducer: {
        todosUser: persistedReducer
    }
})

let persistor = persistStore(store)

export { persistor, store }