import { useState } from 'react'
import './login.scss'
import { login } from '../../services/authService'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/userSlice';
const LoginForm = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        let res = await login(email, password)
        if (res.data && res.data.EC === 0) {
            const user = res.data.data //trong api thông tin user trả về trong biến data
            const access_token = res.data.access_token

            localStorage.setItem('access_token', access_token); //Lưu để tiện dùng
            dispatch(loginSuccess({ user, access_token })) //đẩy qua cho persist

            toast('login success', {
                onClose: () => { navigate('/') }
            })
        }
    }



    return (
        <div className="login-container d-flex justify-content-center ">
            <div className='form-login'>
                <h3>LOGIN</h3>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" value={email} onChange={(event) => { setEmail(event.target.value) }} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={(event) => { setPassword(event.target.value) }} />
                </div>
                <button className='btn btn-primary' onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}

export default LoginForm;