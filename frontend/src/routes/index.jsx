import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './privateRoute'

import Login from './../pages/Auth/Login'
import Register from './../pages/Auth/Register'
import Dashboard from './../pages/Dashboard'
import MainLayout from './../layouts/MainLayout'

function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route element={ <MainLayout />}>
                <Route path='/dashboard' element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                } />
            </Route>
        </Routes>
    )
}

export default AppRoutes