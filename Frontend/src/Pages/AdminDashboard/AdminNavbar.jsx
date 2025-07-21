import React from "react";
import { Link, useNavigate } from "react-router-dom";


export default function AdminNavbar() {
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('user')
    navigate('/')
  }
  return (
    <header className="bg-white shadow md:p-4 px-1 py-1 flex justify-between items-center">
      <h1 className="md:text-2xl text-base pl-10 md:pl-0  font-bold">MedicalCure Dashboard </h1>
      <div className="flex items-center gap-2 md:gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="border hidden md:block rounded px-2 py-1"
        />
        <button onClick={handleLogout} className="bg-red-600 text-sm md:text-base text-white px-4 py-2 rounded">Log Out</button>
        <button className="bg-green-600 text-white text-sm md:text-base px-4 py-2 rounded"><Link to="/">Return to Site</Link></button>
      </div>
    </header>
  );
}
