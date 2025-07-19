import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoutes = () => {
    const Auth = localStorage.getItem('user')
  return  Auth=="Admin"? <Outlet/>:<Navigate to="/"/>
  
}

export default AdminRoutes
