import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Guest from './components/Guest'
import Auth from './components/Auth'
import Login from './pages/Login'
import Register from './pages/Register'
import Index from './pages/Index'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path='/'
                        element={
                            <Auth>
                                <Index />
                            </Auth>
                        }
                    />
                    <Route
                        path='/login'
                        element={
                            <Guest>
                                <Login />
                            </Guest>
                        }
                    />
                    <Route
                        path='/register'
                        element={
                            <Guest>
                                <Register />
                            </Guest>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
)
