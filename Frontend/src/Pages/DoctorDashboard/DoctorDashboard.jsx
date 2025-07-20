import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; // ✅ Fancy icon

export default function DoctorDashboard() {
  const [doctor, setDoctor] = useState("");
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const docData = localStorage.getItem("doctor");
    setDoctor(docData);

    const getPatients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/getPatient"
        );
        setPatients(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    getPatients();
  }, []);

  const myPatients = patients.filter(
    (p) => p.doctor && p.doctor.toLowerCase() === doctor?.toLowerCase()
  );

  const totalPatients = myPatients.length;
  const pendingAppointments = myPatients.filter(
    (p) => p.status === "Pending"
  ).length;
  const confirmedAppointments = myPatients.filter(
    (p) => p.status === "Confirmed"
  ).length;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // ✅ Handle status update
  const handleStatusUpdate = async (id) => {
    try {
      await axios.patch(`http://localhost:8080/api/${id}`, {
        status: "Confirmed",
      });

      // ✅ Update local state too
      setPatients((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, status: "Confirmed" } : p
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-backgroundColor px-6 py-4 flex justify-between items-center text-white shadow">
        <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="font-medium">{doctor}</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-400 px-4 py-2 rounded text-sm"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Dashboard Cards */}
      <section className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Total Patients
          </h3>
          <p className="text-3xl font-bold text-backgroundColor">
            {totalPatients}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Pending Appointments
          </h3>
          <p className="text-3xl font-bold text-yellow-500">
            {pendingAppointments}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Confirmed Appointments
          </h3>
          <p className="text-3xl font-bold text-green-500">
            {confirmedAppointments}
          </p>
        </div>
      </section>

      {/* Patients Table */}
      <section className="p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {doctor} Patients
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-backgroundColor text-white">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Disease</th>
                <th className="py-3 px-4 text-left">Doctor</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {myPatients.map((patient) => (
                <tr key={patient._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{patient.name}</td>
                  <td className="py-3 px-4">{patient.email}</td>
                  <td className="py-3 px-4">{patient.disease}</td>
                  <td className="py-3 px-4">{patient.doctor}</td>
                  <td className="py-3 px-4 flex items-center gap-2">
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
                    {patient.status === "Pending" && (
                      <button
                        onClick={() => handleStatusUpdate(patient._id)}
                        className="text-green-600 hover:text-green-800 transition"
                        title="Mark as Confirmed"
                      >
                        <FaCheckCircle size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {myPatients.length === 0 && (
                <tr>
                  <td
                    className="py-4 px-4 text-center text-gray-500"
                    colSpan="5"
                  >
                    No patients found for you.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
