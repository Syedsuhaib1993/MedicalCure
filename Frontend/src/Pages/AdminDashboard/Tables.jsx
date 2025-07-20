import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";
import axios from "axios";

export default function Tables() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const getPatients = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/getPatient");
        setPatients(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    getPatients();
  }, []);

  const totalPatients = patients.length;
  const pendingAppointments = patients.filter(
    (p) => p.status === "Pending"
  ).length;
  const confirmedAppointments = patients.filter(
    (p) => p.status === "Confirmed"
  ).length;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AdminNavbar />
      <main className="flex flex-1">
        <Sidebar />
        <section className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Patients Dashboard</h2>

          {/* DASHBOARD CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Patients</h3>
              <p className="text-3xl font-bold text-indigo-600">{totalPatients}</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Pending Appointments</h3>
              <p className="text-3xl font-bold text-yellow-500">{pendingAppointments}</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Confirmed Appointments</h3>
              <p className="text-3xl font-bold text-green-500">{confirmedAppointments}</p>
            </div>
          </div>

          {/* PATIENTS TABLE */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Disease</th>
                  <th className="py-3 px-4 text-left">Doctor</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{patient.name}</td>
                    <td className="py-3 px-4">{patient.email}</td>
                    <td className="py-3 px-4">{patient.disease}</td>
                    <td className="py-3 px-4">{patient.doctor}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          patient.status === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : patient.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {patient.status || "Active"}
                      </span>
                    </td>
                  </tr>
                ))}

                {patients.length === 0 && (
                  <tr>
                    <td
                      className="py-4 px-4 text-center text-gray-500"
                      colSpan="5"
                    >
                      No patients found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
