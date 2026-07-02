import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './privateRoute'

import Login from './../pages/Auth/Login'
import Register from './../pages/Auth/Register'
import Dashboard from './../pages/Dashboard'
import Expenses from './../pages/Expenses'
import Categories from './../pages/Categories'
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
                <Route path='/expenses' element={
                    <PrivateRoute>
                        <Expenses />
                    </PrivateRoute>
                } />
                <Route path='/categories' element={
                    <PrivateRoute>
                        <Categories />
                    </PrivateRoute>
                } />
            </Route>
        </Routes>
    )
}

export default AppRoutes