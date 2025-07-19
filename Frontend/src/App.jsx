import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Doctors from "./components/Doctors";
import Blog from "./components/Blog";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Admin from "./Pages/Admin";
import Select from "./Pages/Select";
import DoctorPanel from "./Pages/DoctorPanel";

const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Services />
              <About />
              <Doctors />
              <Blog />
              <Footer />
            </>
          }
        />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/select" element={<Select/>}/>
        <Route path="/doctorpanel" element={<DoctorPanel/>}/>
      </Routes>
    </div>
  );
};

export default App;
