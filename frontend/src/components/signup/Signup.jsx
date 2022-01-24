import { useState, useEffect } from 'react';
import React from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';

const Signup = () => {

    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async () => {
        if (!password || !name || !email) {
            setError('Bạn nhập thiếu một số trường thông tin! Nhập lại!');
        } else {
            setError('');
            const url = 'http://localhost:5000/user/signup'
            await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    password: password,
                    name: name,
                    email: email,
                }),
            })
            .then(res => {
                console.log(res);
                //e.preventDefault();
                alert('Đăng ký thành công, Nhấn OK để chuyển sang trang đăng nhập');
                window.location.href = 'http://localhost:3000/login';
            })
            .catch(err => {
                // console.log(err);
                // e.prevetnDefault();
                setError(err.response.data);
            })
        }
    }

    return (
        <div className="w3-container" style={{margin: '10px 32px 32px 32px'}}>
        <h2 ><strong>Tra cứu thông tin nghiệp vụ</strong></h2>
        <div id="id01" className="modal" style={{marginTop: '24px'}}>
                <div className="">
                    <img src="https://www.mercuriusit.com/wp-content/uploads/Fotolia_113482237_Subscription_Monthly_M-1080x675.jpg" style={{width: '100%', height: '400px', objectFit: "cover",  marginBottom: '16px'}} alt="Avatar" className="avatar" />
                </div>
                <div className="">
                    <label htmlFor="name"><b>Họ tên</b></label>
                    <input className="w3-input w3-border" type="text" placeholder="Nhập họ tên" name="name" style={{margin: '8px 0px'}} required onChange={(e) => setName(e.target.value)}/>
                    <label htmlFor="email"><b>Email</b></label>
                    <input className="w3-input w3-border" type="text" placeholder="Nhập email" name="email" style={{margin: '8px 0px'}} required onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor="password"><b>Mật khẩu</b></label>
                    <input className="w3-input w3-border" type="password" placeholder="Nhập mật khẩu" name="password" style={{margin: '8px 0px'}} required onChange={(e) => setPassword(e.target.value)}/>
                    <button className="w3-button w3-block w3-green" style={{margin: '20px 0px', padding: '13px 0px'}} onClick={() => handleRegister()}>Đăng ký</button>
                </div>
                <div className="w3-container w3-block" style={{ display: 'flex', justifyContent: "space-between", padding: '0px'}}>
                    <label className="w3-col s6">
                        {/* <input type="checkbox" defaultChecked="checked" name="remember" /> Remember me */}
                    </label>
                    <div className="w3-col s6" style={{textAlign: 'Right'}}>
                            Đã có tài khoản? {' '}
                            <Link className="w3-text-green" style={{paddingRight:'0px', textDecoration:'none'}} to={'/login'}>Đăng nhập</Link>
                    </div>
                </div>
        </div>
        </div>
    );
}

export default Signup;







    