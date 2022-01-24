import { useState, useEffect } from 'react';
import React from 'react'
import styles from "./Home.module.css"
import * as isLoggedIn from '../constants/isLoggedIn';
import { getCookie, deleteCookie } from "../constants/userCookie";

const Home = () => {
    const [stuff, setStuff] = useState(null);
    const [stepName, setStepName] = useState("");
    const [navBarOpen, setNavBarOpen] = useState(false);
    const [man, setMan] = useState(null);

    deleteCookie('admin');
    deleteCookie(isLoggedIn.admin);
    let loggedIn = getCookie(isLoggedIn.user);
    let user = getCookie('user');
    if (user) {
        // console.log(typeof user);
        // console.log(user);
        user = JSON.parse(user);
        //console.log(user);
    } else {
        user = {}
    }

    async function handleStepFinder() {
        const temp = {name: stepName};
        console.log(stepName)
        const url = "http://localhost:5000/Step/find/";
        await(await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(temp),
        })).json()
        .then(res => {
            console.log(res)
            setStuff(
            <div className="w3-container w3-display-container w3-padding-16">
                <h3>Kết quả tìm kiếm</h3>
                <hr />
                
                {res.map(data => {
                    return(
                    <ul className="w3-ul">
                        <li className="w3-ul li"  className={styles.find_item} style={{padding: '8px 8px'}}>
                            <a href= {"http://localhost:3000/" + data.id} className={styles.find_item_name}>{data.name}</a>
                            <img src={data.image} className={styles.find_item_img}></img>
                        </li>
                    </ul>
                    )
                })}

                
            </div>
            )
        });
    }
    
    return (
        <div>
            {/* Sidebar/menu */}
            <nav className="w3-sidebar w3-light-grey w3-collapse w3-top" style={{zIndex: 3, width: '260px', display: navBarOpen ? 'block' : 'none'}} id="mySidebar">
            <div className="w3-container w3-display-container w3-padding-16">
                <p style={{textAlign: 'Left', marginTop: '5px', marginBottom: '0px'}}>Xin chào, {user.name}</p>
                <i onClick={() => setNavBarOpen(false)} className="fa fa-remove w3-hide-large w3-button w3-transparent w3-display-right" />
            </div>
            <div className="w3-container w3-display-container w3-padding-16">
                <h3>Tìm kiếm bước</h3>
                <hr />
                <p><label><i className="fa fa-calendar-check-o" /> Tên bước</label></p>
                <input className="w3-input w3-border" type="text" placeholder="VD: 'Thanh toán'" name="CheckIn" required value={stepName} onChange={e => {setStepName(e.target.value)}}/>          
                <p><button className="w3-button w3-block w3-green w3-left-align" onClick={() => handleStepFinder()}><i className="fa fa-search w3-margin-right" /> Tìm kiếm</button></p>
            </div>
            {stuff}
            </nav>
            {/* Top menu on small screens */}
            <header className="w3-bar w3-top w3-hide-large w3-black w3-xlarge">
            <span className="w3-bar-item">Tra cứu nghiệp vụ</span>
            <a href="javascript:void(0)" className="w3-right w3-bar-item w3-button" onClick={() => setNavBarOpen(true)}><i className="fa fa-bars" /></a>
            </header>
            {/* Overlay effect when opening sidebar on small screens */}
            <div className="w3-overlay w3-hide-large" onClick={() => setNavBarOpen(false)} style={{cursor: 'pointer', display: navBarOpen ? 'block' : 'none'}} title="close side menu" id="myOverlay" />
            {/* !PAGE CONTENT! */}
            <div className="w3-main w3-white" style={{marginLeft: '260px'}}>
            {/* Push down content on small screens */}
            <div className="w3-hide-large" style={{marginTop: '80px'}} />
            {/* Slideshow Header */}
            <div className="w3-container" id="apartment">
                <h2 className="w3-text-green">Tra cứu nghiệp vụ</h2>
                <div className="w3-display-container">
                <img src='https://www.mercuriusit.com/wp-content/uploads/Fotolia_113482237_Subscription_Monthly_M-1080x675.jpg' style={{width: '100%', height: '500px', objectFit: "cover", marginBottom: '-6px'}} />
                
                </div>    
            </div>
            <div className="w3-container" style={{paddingTop: '16px'}}>
                <h4><strong>Thông tin trang web</strong></h4>
                <p>Đây là trang web giúp bạn tìm kiếm các thông tin về quy trình nghiệp vụ một cách nhanh chóng và đầy đủ nhất. </p>
                <hr />
            </div>
            <hr />
            </div>
        </div>
    );
}
export default Home