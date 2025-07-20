import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function Profile() {
  const [admin, setAdmin] = useState(null);
  const [accordionOpen, setAccordionOpen] = useState(null);

  useEffect(() => {
    const getAdmin = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/687cb0b910e50ce416ca24ad`
        );
        setAdmin(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getAdmin();
  }, []);

  const toggleAccordion = (section) => {
    setAccordionOpen(accordionOpen === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AdminNavbar />
      <main className="flex flex-1">
        <Sidebar />
        <section className="flex-1 p-6 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-6">Admin Profile</h2>

          {admin ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center transform hover:scale-105 hover:shadow-2xl transition duration-300"
            >
              {/* Avatar */}
              {admin.image ? (
                <img
                  src={admin.image}
                  alt={admin.name}
                  className="w-36 h-36 rounded-full object-cover mx-auto mb-4 border-4 border-indigo-500 shadow"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-indigo-100 flex items-center justify-center text-4xl text-indigo-600 font-bold mx-auto mb-4 shadow border-2 border-indigo-500">
                  {admin.name?.charAt(0)}
                </div>
              )}

              {/* Info */}
              <h3 className="text-xl font-bold mb-1">{admin.name}</h3>
              <p className="text-gray-600 mb-1">{admin.email}</p>
              <p className="text-gray-500 mb-1">{admin.role}</p>
              <p className="text-gray-500 mb-4">{admin.specialty}</p>

              {/* Accordion */}
              <div className="text-left mt-6 w-full">
                {["About", "Education", "Experience"].map((section) => (
                  <div key={section} className="mb-3 border rounded-md overflow-hidden">
                    <button
                      onClick={() => toggleAccordion(section)}
                      className="w-full text-left px-4 py-3 bg-indigo-50 hover:bg-indigo-100 font-medium flex justify-between items-center transition-colors"
                    >
                      {section}
                      <span>{accordionOpen === section ? "▲" : "▼"}</span>
                    </button>

                    <AnimatePresence initial={false}>
                      {accordionOpen === section && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="px-4 py-3 text-gray-600 bg-white"
                        >
                          {section === "About" && (
                            <p>
                              Passionate hospital admin with a keen eye for detail and leadership.
                              Ensures smooth operations and staff satisfaction.
                            </p>
                          )}
                          {section === "Education" && (
                            <p>
                              MSc in Healthcare Administration — XYZ University. BSc in Management
                              — ABC College.
                            </p>
                          )}
                          {section === "Experience" && (
                            <p>
                              6+ years of experience overseeing medical teams, planning, and
                              strategy. Excellent at managing dynamic hospital environments.
                            </p>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <p>Loading profile...</p>
          )}
        </section>
      </main>
    </div>
  );
}
