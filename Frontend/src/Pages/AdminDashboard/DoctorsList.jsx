import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";

export default function DoctorsList({setToast}) {
  const [imageuri,setImageuri] = useState("")
  const [doctors, setDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialty: "",
  });

  // Fetch doctors
  const getDoctors = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/get`);
      const doctorList = response.data.filter((user) => user.role === "Doctor");
      setDoctors(doctorList);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  // Form handlers
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add Doctors
  const addDoctor = async (e) => {
    e.preventDefault();
    try {
      //  console.log(imageuri);
       const imageURI = new FormData()
       imageURI.append('image', imageuri)
       const response = await axios.post('http://localhost:8080/api/image', imageURI)
       const image = response.data.imageUrl

      const res = await axios.post("http://localhost:8080/api/staff", {
        ...formData,
        image,
        role: "Doctor",
      });
      setDoctors([...doctors, res.data.staff || res.data]);
      setFormData({
        name: "",
        email: "",
        password: "",
        specialty: "",
      });
      setIsModalOpen(false);
      setToast({ message: "Doctor added Successfull", type: "success" })
      setTimeout(() => {
         setToast({ message: "", type: "" })
      }, 2000);
    } catch (error) {
      console.log(error.message);
      setToast({ message: "Failed to add Doctor", type: "error" })
      setTimeout(() => {
         setToast({ message: "", type: "" })
      }, 2000);
    }
  };

  // Open confirmation modal
  const confirmDeleteDoctor = (doctor) => {
    setDoctorToDelete(doctor);
    setIsDeleteModalOpen(true);
  };

  // Delete Doctor
  const handleDeleteDoctor = async () => {
    if (!doctorToDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/${doctorToDelete._id}`);
      setDoctors(doctors.filter((doc) => doc._id !== doctorToDelete._id));
      setIsDeleteModalOpen(false);
      setDoctorToDelete(null);
      setToast({ message: "Doctor deleted successfully!", type: "success" })
      setTimeout(() => {
         setToast({ message: "", type: "" })
      }, 2000);
      
    } catch (error) {
      console.log(error.message);
      alert("Failed to delete doctor.");
    }
  };

 
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AdminNavbar />
      <main className="flex flex-1">
        <Sidebar />
        <section className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Doctors List</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"
            >
              + Add Doctor
            </button>
          </div>

          {/* Doctors Cards */}
          {doctors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {doctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center text-center transform hover:scale-105 transition-transform"
                >
                  <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-4xl text-indigo-600 font-bold mb-4">
                    {doctor.name?.charAt(0)}
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{doctor.name}</h3>
                  <p className="text-gray-600 mb-1">{doctor.specialty}</p>
                  <p className="text-gray-500 text-sm mb-4">{doctor.email}</p>
                  <div className="flex gap-3">
                    <button className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500">
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDeleteDoctor(doctor)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No doctors found.</p>
          )}

          {/* Add Doctor Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg p-8 max-w-lg w-full shadow-lg relative">
                <h3 className="text-xl font-bold mb-4">Add New Doctor</h3>
                <form onSubmit={addDoctor}>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 font-medium">
                      Name:
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Doctor Name"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 font-medium">
                      Email:
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="doctor@example.com"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 font-medium">
                      Password:
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="••••••••"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2 font-medium">
                      Specialty:
                    </label>
                    <input
                      type="text"
                      name="specialty"
                      value={formData.specialty}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g., Cardiologist"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2 font-medium">
                      image:
                    </label>
                    <input
                      type="file"
                      name="image"
                      onChange={(e)=>setImageuri(e.target.files[0])}
                      required
                      className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
                    >
                      Add Doctor
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {isDeleteModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg p-8 max-w-sm w-full shadow-lg text-center">
                <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
                <p className="mb-6">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold">{doctorToDelete?.name}</span>?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteDoctor}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
