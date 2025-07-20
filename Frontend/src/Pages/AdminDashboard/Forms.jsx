import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";
import axios from "axios";
import { motion } from "framer-motion";

export default function Forms() {
  const [patients, setPatients] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDisease, setSelectedDisease] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    const getPatient = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/getPatient"
        );
        setPatients(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPatient();
  }, []);

  const doctors = Array.from(
    new Set(patients.map((p) => p.doctor).filter((d) => d))
  );

  const diseases = Array.from(
    new Set(patients.map((p) => p.disease).filter((d) => d))
  );

  const filteredPatients = patients.filter((p) => {
    const doctorMatch = selectedDoctor ? p.doctor === selectedDoctor : true;
    const diseaseMatch = selectedDisease ? p.disease === selectedDisease : true;
    const statusMatch = selectedStatus ? p.status === selectedStatus : true;
    return doctorMatch && diseaseMatch && statusMatch;
  });

  const resetFilters = () => {
    setSelectedDoctor("");
    setSelectedDisease("");
    setSelectedStatus("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AdminNavbar />
      <main className="flex flex-1">
        <Sidebar />
        <section className="flex-1 p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Patients ({filteredPatients.length})
            </h2>

            <div className="flex flex-col md:flex-row gap-4">
              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
              </select>

              {/* Disease Filter */}
              <select
                value={selectedDisease}
                onChange={(e) => setSelectedDisease(e.target.value)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Diseases</option>
                {diseases.map((disease, idx) => (
                  <option key={idx} value={disease}>
                    {disease}
                  </option>
                ))}
              </select>

             
                 {/* Doctor Filter */}
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Doctors</option>
                {doctors.map((doctor, idx) => (
                  <option key={idx} value={doctor}>
                    {doctor}
                  </option>
                ))}
              </select>
              {/* Reset Filters */}
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-backgroundColor text-white rounded-md hover:bg-gray-300 hover:text-backgroundColor transition"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {filteredPatients.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredPatients.map((patient) => (
                <motion.div
                  key={patient._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative bg-white p-6 rounded-xl shadow-md flex flex-col justify-between hover:shadow-lg transition transform hover:-translate-y-1 duration-300"
                >
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        patient.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : patient.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {patient.status || "Active"}
                    </span>
                  </div>

                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold shadow">
                      {patient.name?.charAt(0).toUpperCase()}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-indigo-600 mb-2 text-center">
                      {patient.name}
                    </h3>
                    <p className="text-gray-700 mb-1 text-center">
                      <span className="font-semibold">Email:</span> {patient.email}
                    </p>
                    <p className="text-gray-700 mb-1 text-center">
                      <span className="font-semibold">Number:</span> {patient.number}
                    </p>
                    <p className="text-gray-700 mb-1 text-center">
                      <span className="font-semibold">Doctor:</span> {patient.doctor}
                    </p>
                    <p className="text-gray-700 mb-1 text-center">
                      <span className="font-semibold">Disease:</span> {patient.disease}
                    </p>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <button className="px-4 py-2 bg-backgroundColor text-white rounded-full hover:bg-indigo-600 transition">
                      View Details
                    </button>
                  </div>
                </motion.div>
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
