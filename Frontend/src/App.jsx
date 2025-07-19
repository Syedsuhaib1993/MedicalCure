import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Doctors from "./components/Doctors";
import Blog from "./components/Blog";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Select from "./Pages/Select";
import AdminLogin from "./Pages/AdminLogin";
import DoctorsLogin from "./Pages/DoctorsLogin";
import NotFound from "./Pages/NotFound";
import {AnimatePresence, motion} from 'framer-motion'
import Dashboard from "./Pages/AdminDashboard/Dashboard";
import AddPost from "./Pages/AdminDashboard/AddPost";
import Forms from "./Pages/AdminDashboard/Forms";
import Tables from "./Pages/AdminDashboard/Tables";
import Profile from "./Pages/AdminDashboard/Profile";
import DoctorDashboard from "./Pages/DoctorDashboard/DoctorDashboard";
import AdminRoutes from "./routes/adminRoutes";
import DoctorRoutes from "./routes/DoctorRoutes";
import DoctorsList from "./Pages/AdminDashboard/DoctorsList";
const App = () => {
  const [toast, setToast] = useState({ message: "", type: "" });
  return (
    <div>
       {/* ✅ Inline Toast using framer-motion */}
      <AnimatePresence>
        {toast.message && (
          <motion.div
            key="toast"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded shadow-lg text-white font-semibold
              ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}
            `}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
      <Routes>
        <Route path="/adminlogin" element={<AdminLogin setToast={setToast}/>} />
        <Route path="/" element={<Select/>}/>
        <Route path="/doctorslogin" element={<DoctorsLogin setToast={setToast}/>}/>
        <Route path="*" element={<NotFound/>} />
          <Route element={<AdminRoutes/>}>
        <Route path="/dashboard" element={<Dashboard setToast={setToast} />} />
        <Route path="/add-post" element={<AddPost setToast={setToast} />} />
        <Route path="/forms" element={<Forms setToast={setToast} />} />
        <Route path="/tables" element={<Tables setToast={setToast} />} />
        <Route path="/profile" element={<Profile setToast={setToast} />} />
        <Route path="/doctorlist" element={<DoctorsList setToast={setToast} />} />
        </Route>
        <Route element={<DoctorRoutes/>}>
        <Route path="/doctorDashboard" element={<DoctorDashboard />} />
        </Route>

        <Route
          path="/patient"
          element={
            <>
              <Navbar setToast={setToast} />
              <Home />
              <Services />
              <About />
              <Doctors />
              <Blog />
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
