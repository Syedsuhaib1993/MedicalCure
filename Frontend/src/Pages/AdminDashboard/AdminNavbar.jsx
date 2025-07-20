import React from "react";
import { Link, useNavigate } from "react-router-dom";


export default function AdminNavbar() {
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('user')
    navigate('/')
  }
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">MedicalCure Dashboard </h1>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="border hidden md:block rounded px-2 py-1"
        />
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">Log Out</button>
        <button className="bg-green-600 text-white px-4 py-2 rounded"><Link to="/">Return to Site</Link></button>
      </div>
    </header>
  );
}
