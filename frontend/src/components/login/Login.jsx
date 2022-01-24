import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import * as isLoggedIn from '../constants/isLoggedIn'
import {deleteCookie, setCookie} from '../constants/userCookie'


const eye = "far fa-eye";
const eye_slash = "far fa-eye-slash"
const users = [
    {
        id: 1,
        name: 'Người dùng'
    },
    {
        id: 2,
        name: 'Admin hệ thống'
    }
]


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(1);
    const [errorMsg, setErrorMsg] = useState("");
    // const [isShowPassword, setIsShowPassword] = useState(false);

    const navigate = useNavigate();
    const value = {
        'email': email,
        'password': password,
        'role': checked,
    }
    const handleLogin = async () => {
        const url = 'http://localhost:5000/user/login';
        console.log(checked)
        // alert('Bạn đã đăng nhập.');
        // console.log(value);
        // console.log("Tài khoản đăng nhập:")
        // console.log('email: ', value.email);
        // console.log('Password: ', value.password);
        // setErrorMsg('');
        await(await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
                role: checked,
            }),
        })).json()
        .then(res => {
            console.log(res.name);
            console.log(typeof (res));

            let username = (value.role === 1) ? 'user' : 'admin';
            let end_path = (value.role === 1) ? 'http://localhost:3000': 'http://localhost:3000/admin'
            alert('Đăng nhập thành công, Nhấn OK để tiếp tục');
            window.location.href = end_path;
            setCookie(username, JSON.stringify(res), 1);
            setCookie(isLoggedIn[username], 'true', 1);
        })
        .catch(error => {
            console.log(error);
            error = Object.values(error);
            // console.log("sai mật khẩu")
            setErrorMsg('Sai tên đăng nhập hoặc mật khẩu.');
        })
    }


    return (
        <div className="w3-container" style={{margin: '10px 32px 32px 32px'}}>
        <h2 ><strong>Tra cứu thông tin nghiệp vụ</strong></h2>
        <div id="id01" className="modal" style={{marginTop: '24px'}}>
                <div className="">
                    <img src="https://www.mercuriusit.com/wp-content/uploads/Fotolia_113482237_Subscription_Monthly_M-1080x675.jpg" style={{width: '100%', height: '400px', objectFit: "cover",  marginBottom: '16px'}} alt="Avatar" className="avatar" />
                </div>
                <div className="">
                    <label htmlFor="email"><b>Email</b></label>
                    <input className="w3-input w3-border" type="text" placeholder="Nhập email" name="email" style={{margin: '8px 0px'}} required onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor="password"><b>Mật khẩu</b></label>
                    <input className="w3-input w3-border" type="password" placeholder="Nhập mật khẩu" name="password" style={{margin: '8px 0px'}} required onChange={(e) => setPassword(e.target.value)}/>
                    <div htmlFor="role" style={{textAlign:"left", marginBottom:'5px'}}><b>Đăng nhập với tư cách:</b></div>
                    <div style={{display:'flex'}}>
                        <div className="w3-col s6" style={{margin:'auto'}}>
                            <input type="radio" id="html" name="fav_language" checked={checked === 1} onChange={() => setChecked(1)}/>
                            <label style={{marginLeft:'5px'}} for="html">Người dùng hệ thống</label>
                        </div>
                        <div className="w3-col s6" style={{margin:'auto'}}>
                            <input type="radio" id="css" name="fav_language" checked={checked === 2} onChange={() => setChecked(2)}/>
                            <label style={{marginLeft:'5px'}} for="css">Admin</label><br/>
                        </div>
                    </div>
                    <div style={{margin:'6px 0px 4px 0px', color:'red'}}>{errorMsg}</div>
                    {/* <input className="w3-input w3-border" type="radio" name="role" style={{margin: '8px 0px'}} required onChange={(e) => setPassword(e.target.value)}/> */}
                    <button className="w3-button w3-block w3-green" style={{margin: '20px 0px', padding: '13px 0px'}} onClick={handleLogin}>Đăng nhập</button>
                </div>
                <div className="w3-container w3-block" style={{ display: 'flex', justifyContent: "space-between", padding: '0px'}}>
                    <label className="w3-col s6" style={{textAlign: 'Left'}}>
                        <Link className="w3-text-green" style={{paddingRight:'0px', textDecoration:'none'}} to={''}>Quên mật khẩu?</Link>
                    </label>
                    <div className="w3-col s6" style={{textAlign: 'Right'}}>
                            Chưa có tài khoản? {' '}
                            <Link className="w3-text-green" style={{paddingRight:'0px', textDecoration:'none'}} to={'/signup'}>Đăng ký</Link>
                    </div>
                </div>
        </div>
        </div>
    );
}

export default Login;