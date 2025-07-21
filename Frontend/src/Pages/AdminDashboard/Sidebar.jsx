import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AiFillDashboard,
  AiFillEdit,
  AiOutlineForm,
  AiOutlineTable,
  AiOutlineUser,
} from "react-icons/ai";
import { FaUserMd } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/profile", label: "Admin Profile", icon: <AiOutlineUser /> },
    { to: "/doctorlist", label: "Doctors List", icon: <FaUserMd /> },
    { to: "/dashboard", label: "Dashboard", icon: <AiFillDashboard /> },
    { to: "/add-post", label: "Add Staff", icon: <AiFillEdit /> },
    { to: "/forms", label: "Patients Forms", icon: <AiOutlineForm /> },
    { to: "/tables", label: "Tables", icon: <AiOutlineTable /> },
  ];

  return (
    <>
      {/* Hamburger button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-2xl text-gray-800 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar for md and up */}
      <aside className="hidden md:block w-64 h-screen bg-white border-r">
        <div className="p-6">
          <h2 className="text-center text-xl font-bold mb-6 text-gray-800 uppercase tracking-wide">
            ADMIN PANEL
          </h2>
          <nav>
            <ul className="space-y-2">
              {links.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                        isActive
                          ? "bg-blue-100 text-backgroundColor font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className="text-xl">{link.icon}</span>
                      <span>{link.label}</span>
                      {isActive && (
                        <span className="ml-auto h-2 w-2 rounded-full bg-backgroundColor"></span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Slide-in Sidebar for smaller screens */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r z-40 transform transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <h2 className="text-center text-xl font-bold mb-6 text-gray-800 uppercase tracking-wide">
            ADMIN PANEL
          </h2>
          <nav>
            <ul className="space-y-2">
              {links.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                        isActive
                          ? "bg-blue-100 text-backgroundColor font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className="text-xl">{link.icon}</span>
                      <span>{link.label}</span>
                      {isActive && (
                        <span className="ml-auto h-2 w-2 rounded-full bg-backgroundColor"></span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
