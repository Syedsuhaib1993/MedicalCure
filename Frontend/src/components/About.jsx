import React from "react";
import about from "../assets/img/about.jpg";
const About = () => {
  return (
    <div id="about" className="min-h-screen flex flex-col lg:flex-row justify-between items-center lg:px-32 px-5 pt-24 lg:pt-16 gap-5">
      <div className="w-full lg:w-3/4 space-y-4">
        <h1 className="text-4xl font-semibold text-center lg:text-start">
          About us
        </h1>
        <p className="text-justify lg:text-start">
          We are a trusted healthcare provider committed to delivering
          high-quality medical services that are accessible, affordable, and
          patient-focused. Our services range from routine lab tests and
          comprehensive health checks to specialized heart health assessments,
          all designed to promote early detection and prevention.
        </p>
        <p className="text-justify lg:text-start">
          With a team of skilled doctors, technicians, and support staff, we
          ensure that every patient receives personalized care in a safe and
          comfortable environment. We combine advanced technology with
          compassionate service to support your journey toward better health.
        </p>
        <p className="text-justify lg:text-start">
          At the heart of our mission is a simple goal: to help you live a
          healthier, longer life with confidence and peace of mind. Your health
          is our purpose.
        </p>
      </div>
      <div className="w-full lg:w-3/4">
        <img src={about} alt="About image" className="rounded-lg" />
      </div>
    </div>
  );
};

export default About;
about;
