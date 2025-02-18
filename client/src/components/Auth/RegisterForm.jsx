import { useState } from 'react'
import './register.scss'
import { register } from '../../services/authService'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const RegisterForm = (props) => {

    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const role = 'buyer'

    const handleRegister = async () => {
        let res = await register(name, phone, email, password, role)
        if (res.data && res.data.EC === 0) {
            localStorage.setItem("access_token", res.data.access_token); //lưu token
            toast(res.data.message, {
                onClose: () => { navigate('/login') }
            })
        }
    }

    return (
        <div className="login-container d-flex justify-content-center ">
            <div className='form-login'>
                <h3>Register</h3>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" value={name} onChange={(event) => { setName(event.target.value) }} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control" value={phone} onChange={(event) => { setPhone(event.target.value) }} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" value={email} onChange={(event) => { setEmail(event.target.value) }} />
                </div>
                <div class="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={(event) => { setPassword(event.target.value) }} />
                </div>
                <button className='btn btn-primary' onClick={handleRegister}>Register</button>
            </div>
        </div>
    )
}

export default RegisterForm;