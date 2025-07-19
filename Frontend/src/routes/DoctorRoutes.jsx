import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const DoctorRoutes = () => {
 const Auth = localStorage.getItem('user')
  return  Auth=="Doctor"? <Outlet/>:<Navigate to="/"/>
}

export default DoctorRoutes
