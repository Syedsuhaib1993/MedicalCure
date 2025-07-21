import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";

export default function DoctorsList({ setToast }) {
  const [imageuri, setImageuri] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [doctorToEdit, setDoctorToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);

  const diseases = [
    "Orthopedic Surgeon",
    "Cardiologist",
    "Pediatrician",
    "Neurologist",
    "Dermatologist",
    "Ophthalmologist",
    "Surgeon",
    "Orthopedist",
    "Urologist",
    "Orthodontist",
    "Anesthesiologist",
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialty: "",
  });

  const getDoctors = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URI || "http://localhost:8080"}/api/get`
      );
      const doctorList = response.data.filter((user) => user.role === "Doctor");
      setDoctors(doctorList);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageuri(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const addDoctor = async (e) => {
    e.preventDefault();
    try {
      let image = "";
      if (imageuri) {
        const imageData = new FormData();
        imageData.append("image", imageuri);
        const res = await axios.post(
          `${import.meta.env.VITE_URI || "http://localhost:8080"}/api/image`,
          imageData
        );
        image = res.data.imageUrl;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_URI || "http://localhost:8080"}/api/staff`,
        {
          ...formData,
          image,
          role: "Doctor",
        }
      );

      setDoctors([...doctors, res.data.staff || res.data]);
      setFormData({ name: "", email: "", password: "", specialty: "" });
      setImageuri(null);
      setImagePreview(null);
      setIsModalOpen(false);
      setToast({ message: "Doctor added successfully!", type: "success" });
      setTimeout(() => setToast({ message: "", type: "" }), 2000);
    } catch (error) {
      console.log(error.message);
      setToast({ message: "Failed to add Doctor", type: "error" });
      setTimeout(() => setToast({ message: "", type: "" }), 2000);
    }
  };

  const confirmDeleteDoctor = (doctor) => {
    setDoctorToDelete(doctor);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteDoctor = async () => {
    if (!doctorToDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_URI || "http://localhost:8080"}/api/${doctorToDelete._id}`
      );
      setDoctors(doctors.filter((doc) => doc._id !== doctorToDelete._id));
      setIsDeleteModalOpen(false);
      setDoctorToDelete(null);
      setToast({ message: "Doctor deleted successfully!", type: "success" });
      setTimeout(() => setToast({ message: "", type: "" }), 2000);
    } catch (error) {
      console.log(error.message);
      alert("Failed to delete doctor.");
    }
  };

  const handleEditDoctor = (doctor) => {
    setDoctorToEdit(doctor);
    setFormData({
      name: doctor.name || "",
      email: doctor.email || "",
      password: "",
      specialty: doctor.specialty || "",
    });
    setImagePreview(doctor.image || null);
    setImageuri(null);
    setIsEditModalOpen(true);
  };

  const updateDoctor = async (e) => {
    e.preventDefault();
    if (!doctorToEdit) return;

    try {
      let image = doctorToEdit.image;

      if (imageuri) {
        const imageData = new FormData();
        imageData.append("image", imageuri);
        const res = await axios.post(
          `${import.meta.env.VITE_URI || "http://localhost:8080"}/api/image`,
          imageData
        );
        image = res.data.imageUrl;
      }
      console.log(image);
      

      const res = await axios.put(
        `${import.meta.env.VITE_URI || "http://localhost:8080"}/api/${doctorToEdit._id}`,
        {
          ...formData,
          image:image,
        }
      );
      console.log(res.data);
      
      setDoctors(
        doctors.map((doc) =>
          doc._id === doctorToEdit._id ? res.data.staff || res.data : doc
        )
      );

      setIsEditModalOpen(false);
      setDoctorToEdit(null);
      setFormData({ name: "", email: "", password: "", specialty: "" });
      setImageuri(null);
      setImagePreview(null);
      setToast({ message: "Doctor updated successfully!", type: "success" });
      setTimeout(() => setToast({ message: "", type: "" }), 2000);
    } catch (error) {
      console.log(error.message);
      setToast({ message: "Failed to update Doctor", type: "error" });
      setTimeout(() => setToast({ message: "", type: "" }), 2000);
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

          {doctors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {doctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center text-center transform hover:scale-105 transition-transform"
                >
                  {doctor.image ? (
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-indigo-500"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-4xl text-indigo-600 font-bold mb-4">
                      {doctor.name?.charAt(0)}
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-1">{doctor.name}</h3>
                  <p className="text-gray-600 mb-1">{doctor.specialty}</p>
                  <p className="text-gray-500 text-sm mb-4">{doctor.email}</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEditDoctor(doctor)}
                      className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                    >
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

          {/* Add Modal */}
          {isModalOpen && (
            <DoctorFormModal
              title="Add New Doctor"
              formData={formData}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSubmit={addDoctor}
              handleCancel={() => {
                setIsModalOpen(false);
                setFormData({ name: "", email: "", password: "", specialty: "" });
                setImageuri(null);
                setImagePreview(null);
              }}
              imagePreview={imagePreview}
              diseases={diseases}
              submitLabel="Add Doctor"
            />
          )}

          {/* Edit Modal */}
          {isEditModalOpen && (
            <DoctorFormModal
              title="Edit Doctor"
              formData={formData}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSubmit={updateDoctor}
              handleCancel={() => {
                setIsEditModalOpen(false);
                setDoctorToEdit(null);
                setFormData({ name: "", email: "", password: "", specialty: "" });
                setImageuri(null);
                setImagePreview(null);
              }}
              imagePreview={imagePreview}
              diseases={diseases}
              submitLabel="Update Doctor"
            />
          )}

          {/* Delete Modal */}
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

// ✅ Extracted reusable modal (put this in same file or separate file)
function DoctorFormModal({
  title,
  formData,
  handleChange,
  handleImageChange,
  handleSubmit,
  handleCancel,
  imagePreview,
  diseases,
  submitLabel,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full shadow-lg relative">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-3"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-3"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3"
              placeholder="••••••••"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Specialty:</label>
            <select
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-3"
            >
              <option value="" disabled>
                Select a specialty
              </option>
              {diseases.map((spec, idx) => (
                <option key={idx} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">
              Upload Image:
            </label>
            <label className="w-full flex flex-col items-center justify-center border-2 border-dashed rounded-md p-6 text-center cursor-pointer relative">
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="opacity-0 absolute inset-0 w-full h-full"
              />
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mx-auto h-32 w-32 object-cover rounded-full shadow-md"
                />
              ) : (
                <p>Click or drag to upload an image</p>
              )}
            </label>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
