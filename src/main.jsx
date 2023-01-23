import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Login from './pages/Login'
import Register from './pages/Register'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)
