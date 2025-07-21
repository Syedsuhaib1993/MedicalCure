import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin({setToast}) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log("Admin login data:", formData);
    // Add your admin login logic here (API call, validation, etc.)
    try {
      const response = await axios.post(`${import.meta.env.VITE_URI  || "http://localhost:8080"}/api/login`,{
        email: formData.email,
        password: formData.password,
      })
      console.log(response.data.staff.role);
      localStorage.setItem('user',response.data.staff.role)
      if(response.data.staff.role === "Admin"){
        setToast({ message: "Login Successfull", type: "success" })
      setTimeout(() => {
         setToast({ message: "", type: "" })
      }, 2000);
      setTimeout(() => {
         navigate('/dashboard')
      }, 2000);

      }

    } catch (error) {
        setToast({ message: "Login failed", type: "error" })
      setTimeout(() => {
         setToast({ message: "", type: "" })
      }, 2000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Admin Login
        </h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 mb-2 font-medium"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="admin@example.com"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 mb-2 font-medium"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white font-semibold py-3 rounded-md hover:bg-indigo-600 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}
