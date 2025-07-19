import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DoctorsLogin({setToast}) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    doctorName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // You can add your login logic here (e.g., API call)
    try {
          const response = await axios.post("http://localhost:8080/api/login",{
            email: formData.email,
            password: formData.password,
            doctor:formData.doctorName
          })
          console.log(response.data.staff.role);
          localStorage.setItem('user',response.data.staff.role)
          if(response.data.staff.role === "Doctor"){
            setToast({ message: "Login Successfull", type: "success" })
          setTimeout(() => {
             setToast({ message: "", type: "" })
          }, 2000);
          setTimeout(() => {
             navigate('/doctorDashboard')
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
          Doctor Login
        </h2>

        <div className="mb-4">
          <label
            htmlFor="doctorName"
            className="block text-gray-700 mb-2 font-medium"
          >
            Select Doctor Name
          </label>
          <select
            name="doctorName"
            id="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option disabled value="">-- Select Doctor --</option>
            <option value="Dr. Serena Mitchell">Dr. Serena Mitchell</option>
            <option value="Dr. Julian Bennett">Dr. Julian Bennett</option>
            <option value="Dr. Camila Ruiz">Dr. Camila Ruiz</option>
            <option value="Dr. Victor Nguyen">Dr. Victor Nguyen</option>
            <option value="Dr. Ethan Carter">Dr. Ethan Carter</option>
            <option value="Dr. Olivia Martinez">Dr. Olivia Martinez</option>
          </select>
        </div>

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
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="doctor@example.com"
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
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-500 text-white font-semibold py-3 rounded-md hover:bg-teal-600 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}
