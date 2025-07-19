import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";
import axios from "axios";

export default function Forms() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const getPatient = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/getPatient");
        console.log(response.data);
        setPatients(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPatient();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AdminNavbar />
      <main className="flex flex-1">
        <Sidebar />
        <section className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Patients</h2>

          {patients.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {patients.map((patient) => (
                <div
                  key={patient._id}
                  className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-between hover:shadow-lg transition"
                >
                  <div>
                    <h3 className="text-xl font-bold text-indigo-600 mb-2">
                      {patient.name}
                    </h3>
                    <p className="text-gray-700 mb-1">
                      <span className="font-semibold">Email:</span> {patient.email}
                    </p>
                    <p className="text-gray-700 mb-1">
                      <span className="font-semibold">Number:</span> {patient.number}
                    </p>
                    <p className="text-gray-700 mb-1">
                      <span className="font-semibold">Doctor:</span> {patient.doctor}
                    </p>
                    <p className="text-gray-700 mb-1">
                      <span className="font-semibold">Disease:</span> {patient.disease}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No patients found.</p>
          )}
        </section>
      </main>
    </div>
  );
}
