import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Guest from './guards/Guest'
import VerifiedAuth from './guards/VerifiedAuth'
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
import Announcement from './pages/Announcement'
import ForgotPassword from './pages/ForgotPassword'
import ChangePassword from './pages/ChangePassword'
import UnverifiedAuth from './guards/UnverifiedAuth'
import VerifyAccount from './pages/VerifyAccount'

const queryClient = new QueryClient({
    defaultOptions: {
        mutations: {
            networkMode: 'always',
        },
        queries: {
            networkMode: 'always',
        },
    },
})

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
                            path='/forgot-password'
                            element={
                                <Guest>
                                    <ForgotPassword />
                                </Guest>
                            }
                        />

                        <Route
                            path='/change-password'
                            element={
                                <Guest>
                                    <ChangePassword />
                                </Guest>
                            }
                        />

                        <Route
                            path='/verify'
                            element={
                                <UnverifiedAuth>
                                    <VerifyAccount />
                                </UnverifiedAuth>
                            }
                        />

                        <Route
                            path='/'
                            element={
                                <VerifiedAuth>
                                    <HasRole>
                                        <Index />
                                    </HasRole>
                                </VerifiedAuth>
                            }
                        >
                            <Route
                                path='message/:classId/:receiverId'
                                element={
                                    <VerifiedAuth>
                                        <HasRole>
                                            <Message />
                                        </HasRole>
                                    </VerifiedAuth>
                                }
                            ></Route>
                            <Route
                                path='announcements'
                                element={
                                    <VerifiedAuth>
                                        <HasRole>
                                            <Announcement />
                                        </HasRole>
                                    </VerifiedAuth>
                                }
                            ></Route>
                            <Route
                                path='manage/teachers'
                                element={
                                    <VerifiedAuth>
                                        <StudentGuard>
                                            <Enrolled>
                                                <Cr>
                                                    <ManageTeachers />
                                                </Cr>
                                            </Enrolled>
                                        </StudentGuard>
                                    </VerifiedAuth>
                                }
                            />
                            <Route
                                path='manage/students'
                                element={
                                    <VerifiedAuth>
                                        <StudentGuard>
                                            <Enrolled>
                                                <Cr>
                                                    <ManageStudents />
                                                </Cr>
                                            </Enrolled>
                                        </StudentGuard>
                                    </VerifiedAuth>
                                }
                            />
                        </Route>

                        <Route path='/role'>
                            <Route
                                index
                                element={
                                    <VerifiedAuth>
                                        <NoRole>
                                            <Role />
                                        </NoRole>
                                    </VerifiedAuth>
                                }
                            />
                            <Route
                                path='teacher'
                                element={
                                    <VerifiedAuth>
                                        <NoRole>
                                            <Teacher />
                                        </NoRole>
                                    </VerifiedAuth>
                                }
                            />
                            <Route
                                path='student'
                                element={
                                    <VerifiedAuth>
                                        <NoRole>
                                            <Student />
                                        </NoRole>
                                    </VerifiedAuth>
                                }
                            />
                            <Route
                                path='student/enroll-options'
                                element={
                                    <VerifiedAuth>
                                        <StudentGuard>
                                            <NotEnrolled>
                                                <EnrollOptions />
                                            </NotEnrolled>
                                        </StudentGuard>
                                    </VerifiedAuth>
                                }
                            />
                            <Route
                                path='student/join-existing-class'
                                element={
                                    <VerifiedAuth>
                                        <StudentGuard>
                                            <NotEnrolled>
                                                <JoinExistingClass />
                                            </NotEnrolled>
                                        </StudentGuard>
                                    </VerifiedAuth>
                                }
                            />
                            <Route
                                path='student/create-new-class'
                                element={
                                    <VerifiedAuth>
                                        <StudentGuard>
                                            <NotEnrolled>
                                                <CreateNewClass />
                                            </NotEnrolled>
                                        </StudentGuard>
                                    </VerifiedAuth>
                                }
                            />
                            <Route
                                path='student/pending'
                                element={
                                    <VerifiedAuth>
                                        <StudentGuard>
                                            <Enrolled>
                                                <Pending>
                                                    <PendingEnroll />
                                                </Pending>
                                            </Enrolled>
                                        </StudentGuard>
                                    </VerifiedAuth>
                                }
                            />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
)
