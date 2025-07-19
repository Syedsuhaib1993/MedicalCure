import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserShield, FaUserMd, FaUser } from "react-icons/fa";

export default function Select() {
  const navigate = useNavigate();
  const user = localStorage.getItem('user')

  const cards = [
    {
      title: "Admin",
      icon: <FaUserShield className="text-6xl text-white" />,
      route: user == "Admin"?"/dashboard":"/adminlogin",
      bg: "bg-gradient-to-r from-indigo-500 to-purple-600",
    },
    {
      title: "Doctor",
      icon: <FaUserMd className="text-6xl text-white" />,
      route: user == "Doctor"?"/doctorDashboard":"/doctorslogin",
      bg: "bg-gradient-to-r from-green-400 to-teal-500",
    },
    {
      title: "Patient",
      icon: <FaUser className="text-6xl text-white" />,
      route: "/patient",
      bg: "bg-gradient-to-r from-pink-500 to-rose-600",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Select User Type</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card) => (
          <div
            key={card.title}
            onClick={() => navigate(card.route)}
            className={`cursor-pointer ${card.bg} p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center text-center`}
          >
            {card.icon}
            <h2 className="text-2xl text-white font-semibold mt-4">{card.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
