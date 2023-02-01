import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Guest from './guards/Guest'
import Auth from './guards/Auth'
import NoRole from './guards/NoRole'
import HasRole from './guards/HasRole'
import StudentGuard from './guards/Student'
import Login from './pages/Login'
import Register from './pages/Register'
import Index from './pages/Index'
import Role from './pages/Role'
import Teacher from './pages/Teacher'
import Student from './pages/Student'
import NotEnrolled from './guards/NotEnrolled'
import Enrolled from './guards/Enrolled'
import EnrollOptions from './pages/EnrollOptions'
import JoinExistingClass from './pages/JoinExistingClass'
import CreateNewClass from './pages/CreateNewClass'
import Layout from './components/Layout'
import PendingEnroll from './pages/PendingEnroll'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
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
                                            <Teacher />
                                        </NoRole>
                                    </Auth>
                                }
                            />
                            <Route
                                path='student'
                                element={
                                    <Auth>
                                        <NoRole>
                                            <Student />
                                        </NoRole>
                                    </Auth>
                                }
                            />
                            <Route
                                path='student/enroll-options'
                                element={
                                    <Auth>
                                        <StudentGuard>
                                            <NotEnrolled>
                                                <EnrollOptions />
                                            </NotEnrolled>
                                        </StudentGuard>
                                    </Auth>
                                }
                            />
                            <Route
                                path='student/join-existing-class'
                                element={
                                    <Auth>
                                        <StudentGuard>
                                            <NotEnrolled>
                                                <JoinExistingClass />
                                            </NotEnrolled>
                                        </StudentGuard>
                                    </Auth>
                                }
                            />
                            <Route
                                path='student/create-new-class'
                                element={
                                    <Auth>
                                        <StudentGuard>
                                            <NotEnrolled>
                                                <CreateNewClass />
                                            </NotEnrolled>
                                        </StudentGuard>
                                    </Auth>
                                }
                            />
                            <Route
                                path='student/pending'
                                element={
                                    <Auth>
                                        <StudentGuard>
                                            <Enrolled>
                                                <PendingEnroll />
                                            </Enrolled>
                                        </StudentGuard>
                                    </Auth>
                                }
                            />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
)
