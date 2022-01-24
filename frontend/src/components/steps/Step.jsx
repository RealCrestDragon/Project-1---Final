import { useState, useEffect } from 'react';
import React from 'react'
import styles from "./Step.module.css"
import { useParams } from "react-router-dom";
import * as isLoggedIn from '../constants/isLoggedIn';
import { getCookie, deleteCookie } from "../constants/userCookie";

const Step = () => {
    const id = useParams();
    const [change, setChange] = useState(0);
    const [stuff, setStuff] = useState(null);
    const [stepName, setStepName] = useState("");
    const [navBarOpen, setNavBarOpen] = useState(false);
    const [data, setData] = useState({
        image: "",
        nextSteps:[],
        previousSteps:[],
        name:'',
        description:'',
        next: [], 
        prev: [],
        other: '',
    });   


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

    useEffect(() => {
        const showStep = (async () => {

            const url = "http://localhost:5000/Step/get_by_id/" + id.id;
            await( await fetch(url, {
                method: 'GET',
            })).json()
            .then(res => {
                // console.log(res)
                setData(res)
            })
        })
        showStep();
    }, []);

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

    // useEffect(() => {
    //         oke.push(<div className="w3-container w3-display-container w3-padding-16">
    //         asdfasdf
    //     </div>)
    //     console.log(change)
    // }, [change]);

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
                <p><button className="w3-button w3-block w3-green w3-left-align" onClick={handleStepFinder}><i className="fa fa-search w3-margin-right" /> Tìm kiếm</button></p>
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
                <h2 className="w3-text-green">{data.name}</h2>
                <div className="w3-display-container">
                <img src={data.image} style={{width: '100%', height: '500px', objectFit: "cover", marginBottom: '-6px'}} />
                <div className="w3-display-bottomleft w3-container w3-black">
                    <p>{data.name}</p>
                </div>
                </div>    
            </div>
            <div className="w3-container" style={{paddingTop: '16px'}}>
                <h4><strong>Thông tin chi tiết</strong></h4>
                <p>{data.description}</p>
                <hr />
                <h4><strong>Các bước liên quan</strong></h4>
                <div className="w3-row w3-large">
                    <ul className="w3-col s6" style={{paddingLeft: '0PX', borderRight: "1px solid #ccc"}}>
                        <li className="w3-green" style={{textAlign: 'center', listStyleType: "none", padding: '8px 0px'}}>Các bước trước</li>
                        {
                        data.prev.map(data1 => {
                            return(
                                <li className="w3-ul li"  className={styles.find_item} style={{padding: '8px 8px'}}>
                                    <a href= {"http://localhost:3000/" + data1.id} className={styles.find_item_name}>{data1.name}</a>
                                </li>
                            )
                        }) 
                    }     
                    </ul>
                    <ul className="w3-col s6" style={{paddingLeft: '0PX', borderLeft: "1px solid #ccc"}}>
                        <li className="w3-green" style={{textAlign: 'center', listStyleType: "none", padding: '8px 0px'}}>Các bước sau</li>
                        {
                        data.next.map(data2 => {
                            return(
                                <li className="w3-ul li"  className={styles.find_item} style={{padding: '8px 8px'}}>
                                <a href= {"http://localhost:3000/" + data2.id} className={styles.find_item_name}>{data2.name}</a>
                                </li>
                            )
                        }) 
                        }
                    </ul>
                </div>
                <hr />
                <h4><strong>Các yêu cầu khác</strong></h4>
                <p>{data.other}</p>
                <hr />
                <h4><strong>Luồng sự kiện nổi bật</strong></h4>
                <p>Không</p>
            </div>
            <hr />
            </div>
        </div>
    );


    
}
export default Step