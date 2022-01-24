import { useState, useEffect } from 'react';
import React from 'react'
import styles from "./Admin.module.css"
import { useParams } from "react-router-dom";

const Admin = () => {
    const [prevStuff, setPrevStuff] = useState(null);
    const [nextStuff, setNextStuff] = useState(null);
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [other, setOther] = useState("")
    const [description, setDescription] = useState("")
    const [prevStepName, setPrevStepName] = useState("")
    const [nextStepName, setNextStepName] = useState("")
    const [nextSteps, setNextSteps] = useState([])
    const [deleteID, setDeleteID] = useState("")
    var pleasePrev = []
    var pleaseNext = []
    const [previousSteps, setPreviousSteps] = useState([])

    
    const handleAddToPrevStep = (id) => {
        console.log(id)
        if(!pleasePrev.includes(id)) pleasePrev.push(id)
        setPreviousSteps(pleasePrev)
    }

    function handleAddToNextStep(id) {
        console.log(id)
        if(!pleaseNext.includes(id)) pleaseNext.push(id)
        setNextSteps(pleaseNext)
    }

    async function handleAddStep() {
        const url = "http://localhost:5000/step/add";
            await( await fetch(url, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    other: other,
                    description: description,
                    image: image,
                    name: name,
                    nextSteps: nextSteps,
                    previousSteps: previousSteps,
                })
            })).json()
            .then(res => {
                alert('Thêm bước thành công, Nhấn OK để tiếp tục');
            })
            .catch(err => {
                console.error(err);
            })
    }

    async function handleDeleteStep() {
        const url = "http://localhost:5000/step/delete";
            await fetch(url, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: deleteID,
                })
            })
            .then(res => {
                alert('Xóa bước thành công, Nhấn OK để tiếp tục');
            })
            .catch(err => {
                console.error(err);
            })
    }

    async function handlePrevStepFinder() {
        const temp = {name: prevStepName};
        const url = "http://localhost:5000/step/find/";
        await(await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(temp),
        })).json()
        .then(res => {
            setPrevStuff(
                res.map(data => {
                    return(
                        <li className="w3-col" style={{margin:'auto', display:'flex', justifyContent: 'space-between'}}>
                            <span style={{margin:'auto auto auto 10px'}}>{data.name}</span>
                            <button className="w3-button w3-block w3-green w3-col s3" style={{margin: '10px 10px 10px 0px'}} onClick={() => handleAddToPrevStep(data.id)}>Thêm</button>
                        </li> 
                    )
                })
            )
        });
    }

    async function handleNextStepFinder() {
        const temp = {name: nextStepName};
        const url = "http://localhost:5000/step/find/";
        await(await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(temp),
        })).json()
        .then(res => {
            console.log(res)
            setNextStuff(
                res.map(data => {
                    return(
                        <li className="w3-col" style={{margin:'auto', display:'flex', justifyContent: 'space-between'}}>
                            <span style={{margin:'auto auto auto 10px'}}>{data.name}</span>
                            <button className="w3-button w3-block w3-green w3-col s3" style={{margin: '10px 10px 10px 0px'}} onClick={() => handleAddToNextStep(data.id)}>Thêm</button>
                        </li> 
                    )
                })
            )
        });
    }

    return (
        <div>
            <div className="w3-main w3-white">
                {/* Push down content on small screens */}
                <div className="w3-hide-large" style={{marginTop: '80px'}} />
                {/* Slideshow Header */}
                <div className="w3-container" id="apartment">
                    <h2 className="w3-text-green">Trang Admin</h2>
                </div>

                <div className="w3-container" style={{paddingTop: '16px'}}>
                    <h4><strong>Thêm bước</strong></h4>
                    <div className="">
                        <label htmlFor="name"><b>Tên bước</b></label>
                        <input className="w3-input w3-border" type="text" placeholder="Nhập tên bước" name="name" style={{margin: '8px 0px'}} required onChange={(e) => setName(e.target.value)}/>
                        <label htmlFor="description"><b>Mô tả</b></label>
                        <input className="w3-input w3-border" type="text" placeholder="Nhập mô tả" name="description" style={{margin: '8px 0px'}} required onChange={(e) => setDescription(e.target.value)}/>
                        <label htmlFor="image"><b>Link ảnh</b></label>
                        <input className="w3-input w3-border" type="text" placeholder="Nhập link ảnh" name="image" style={{margin: '8px 0px'}} required onChange={(e) => setImage(e.target.value)}/>
                        <label htmlFor="image"><b>Yêu cầu khác</b></label>
                        <input className="w3-input w3-border" type="text" placeholder="Nhập yêu cầu khác" name="other" style={{margin: '8px 0px'}} required onChange={(e) => setOther(e.target.value)}/>
                    
                        <label htmlFor="image"><b>Tìm kiếm các bước liên quan</b></label>
                    
                        <div className="w3-row w3-large">
                            <ul className="w3-col s6 " style={{paddingLeft: '0PX', borderRight: "1px solid #ccc"}}>
                            <div className="w3-green" style={{textAlign: 'center', listStyleType: "none", padding: '8px 0px'}}>Các bước trước</div>
                                <div style={{display: 'flex', justifyContent: "space-between", margin: '0px 10px'}}>
                                    <input className="w3-input w3-border" type="text" placeholder="Nhập tên bước" name="description" style={{margin: '20px 0px'}} required onChange={(e) => setPrevStepName(e.target.value)}/>
                                    <button className="w3-button w3-block w3-green w3-col s4" style={{margin: '20px 0px', padding: '13px 0px'}} onClick={handlePrevStepFinder}>Tìm kiếm</button>
                                </div>
                                {prevStuff}
                            </ul>
                            <ul className="w3-col s6 " style={{paddingLeft: '0PX', borderRight: "1px solid #ccc"}}>
                            <div className="w3-green" style={{textAlign: 'center', listStyleType: "none", padding: '8px 0px'}}>Các bước sau</div>
                                <div style={{display: 'flex', justifyContent: "space-between", margin: '0px 10px'}}>
                                    <input className="w3-input w3-border" type="text" placeholder="Nhập tên bước" name="description" style={{margin: '20px 0px'}} required onChange={(e) => setNextStepName(e.target.value)}/>
                                    <button className="w3-button w3-block w3-green w3-col s4" style={{margin: '20px 0px', padding: '13px 0px'}} onClick={handleNextStepFinder}>Tìm kiếm</button>
                                </div>
                                {nextStuff}
                            </ul>
                        </div>
                    </div>
                    <hr />
                        <button className="w3-button w3-block w3-green" style={{margin: '20px 0px', padding: '13px 0px'}} onClick={handleAddStep}>Thêm bước</button>
                    <hr />
                    <h4><strong>Xóa bước</strong></h4>
                    <ul className="w3-col " style={{paddingLeft: '0PX', borderRight: "1px solid #ccc"}}>
                        <div style={{display: 'flex', justifyContent: "space-between"}}>
                            <input className="w3-input w3-border" type="text" placeholder="Nhập ID bước" name="description" style={{margin: '20px 0px'}} required onChange={(e) => setDeleteID(e.target.value)}/>
                            <button className="w3-button w3-block w3-green w3-col s4" style={{margin: '20px 0px', padding: '13px 0px'}} onClick={handleDeleteStep}>Xoá bước</button>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );

}
export default Admin