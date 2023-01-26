import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Guest from './guards/Guest'
import Auth from './guards/Auth'
import Login from './pages/Login'
import Register from './pages/Register'
import Index from './pages/Index'
import NoRole from './guards/NoRole'
import Role from './pages/Role'
import HasRole from './guards/HasRole'
import Teacher from './pages/Teacher'
import Student from './pages/Student'

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
                                <HasRole>
                                    <Index />
                                </HasRole>
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

                    <Route path='/role'>
                        <Route
                            index
                            element={
                                <Auth>
                                    <NoRole>
                                        <Role />
                                    </NoRole>
                                </Auth>
                            }
                        />
                        <Route
                            path='teacher'
                            element={
                                <Auth>
                                    <NoRole>
                                        <Teacher/>
                                    </NoRole>
                                </Auth>
                            }
                        />
                        <Route
                            path='student'
                            element={
                                <Auth>
                                    <NoRole>
                                        <Student/>  
                                    </NoRole>
                                </Auth>
                            }
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
)
