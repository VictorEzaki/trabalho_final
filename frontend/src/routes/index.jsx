import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './privateRoute'

import Login from './../pages/Auth/Login'
import Register from './../pages/Auth/Register'
import Home from './../pages/Home'
import MainLayout from './../layouts/MainLayout'

function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route element={ <MainLayout />}>
                <Route path='/home' element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                } />
            </Route>
        </Routes>
    )
}

export default AppRoutes