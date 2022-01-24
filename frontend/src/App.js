import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Home from './components/home/Home'
import Step from './components/steps/Step'
import Signup from './components/signup/Signup'
import Login from './components/login/Login'
import Admin from './components/admin/Admin'

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/:id' element={<Step />}></Route>
                    <Route path='/signup' element={<Signup />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/admin' element={<Admin />}></Route>
                </Routes>
            </BrowserRouter>


        </>


    )
}

export default App
