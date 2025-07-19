import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";

export default function Profile() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const getAdmin = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/687b4b2a54216665dc5c3d2a`);
        setAdmin(response.data); // ✅ Save to state
      } catch (error) {
        console.log(error.message);
      }
    };
    getAdmin();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AdminNavbar />
      <main className="flex flex-1">
        <Sidebar />
        <section className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4">User Profile</h2>

          {admin ? (
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
              <p className="mb-2">
                <span className="font-semibold">Name:</span> {admin.name}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Email:</span> {admin.email}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Role:</span> {admin.role}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Designation:</span> {admin.specialty}
              </p>
              {/* Add more fields if your backend returns them */}
            </div>
          ) : (
            <p>Loading profile...</p>
          )}
        </section>
      </main>
    </div>
  );
}
