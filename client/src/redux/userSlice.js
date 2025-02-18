import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: '',
    access_token: '',
    isLoggedIn: false
}

const userSlice = createSlice({
    name: 'todosUser',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.access_token = action.payload.access_token
            state.isLoggedIn = true
        },
        logout: (state) => {
            state.access_token = null;
            state.user = null;
            state.isLoggedIn = false
        },
    }
})

export const { loginSuccess, logout } = userSlice.actions;

export default userSlice.reducer;