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
import Pending from './guards/Pending'
import ManageTeachers from './pages/ManageTeachers'
import ManageStudents from './pages/ManageStudents'
import Cr from './guards/Cr'
import Message from './pages/Message'

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
                        >
                            <Route
                                path='message/:classId/:receiverId'
                                element={
                                    <Auth>
                                        <HasRole>
                                            <Message />
                                        </HasRole>
                                    </Auth>
                                }
                            ></Route>
                            <Route
                                path='manage/teachers'
                                element={
                                    <Auth>
                                        <StudentGuard>
                                            <Enrolled>
                                                <Cr>
                                                    <ManageTeachers />
                                                </Cr>
                                            </Enrolled>
                                        </StudentGuard>
                                    </Auth>
                                }
                            />
                            <Route
                                path='manage/students'
                                element={
                                    <Auth>
                                        <StudentGuard>
                                            <Enrolled>
                                                <Cr>
                                                    <ManageStudents />
                                                </Cr>
                                            </Enrolled>
                                        </StudentGuard>
                                    </Auth>
                                }
                            />
                        </Route>

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
                                                <Pending>
                                                    <PendingEnroll />
                                                </Pending>
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
