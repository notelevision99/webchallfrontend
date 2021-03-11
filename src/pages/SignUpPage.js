import React, { Component, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import { API_URL } from '../helpers/user/urlCallAxios';
import axios from 'axios';

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');

    const login = (e) => {
        e.preventDefault();
        
        const formSignUp = {
            userName: username,
            password: password,
            email: email,
            phoneNumber: phoneNumber,
            address: address,
        };
        const url = `${API_URL}/api/auth/register`;
        return axios.post(url, formSignUp, { withCredentials: true }).then();
    };
    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handlePhone = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleAddress = (e) => {
        setAddress(e.target.value);
    };

    return (
        <div className='login-page'>
            <div className='formLogin'>
                <div className='form-login-title'>Đăng Kí Tài Khoản</div>
                <form onSubmit={login}>
                    <div className='input-group'>
                        <input type='text' id='username' name='username' onChange={handleUsername} required />
                        <label for='username'>Username</label>
                    </div>

                    <div className='input-group'>
                        <input type='password' id='password' name='password' onChange={handlePassword} required />
                        <label for='password'>Password</label>
                    </div>

                    <div className='input-group'>
                        <input type='phone' id='phone' name='phone' onChange={handlePhone} required />
                        <label for='phone'>Số điện thoại</label>
                    </div>

                    <div className='input-group'>
                        <input type='mail' id='email' name='email' onChange={handleEmail} required />
                        <label for='email'>Email</label>
                    </div>

                    <div className='input-group'>
                        <input type='text' id='address' name='address' onChange={handleAddress} required />
                        <label for='address'>Địa chỉ</label>
                    </div>
                    <button name='submit'>Đăng kí</button>
                    {error !== '' && <p className='error'>{error}</p>}
                    <NavLink to='/login'>Đăng nhập tài khoản</NavLink>
                </form>
            </div>
        </div>
    );
}
export default SignUp;
