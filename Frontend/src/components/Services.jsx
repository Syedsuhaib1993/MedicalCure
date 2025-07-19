import React, { useState } from 'react';
import Button from '../layouts/Button';
import { RiMicroscopeLine } from 'react-icons/ri';
import { MdHealthAndSafety } from 'react-icons/md';
import { FaHeartbeat } from 'react-icons/fa';
import ServicesCard from '../layouts/ServicesCard';
import { AiOutlineClose } from 'react-icons/ai';

const icon1 = (<RiMicroscopeLine size={35} className='text-backgroundColor' />);
const icon2 = (<MdHealthAndSafety size={35} className='text-backgroundColor' />);
const icon3 = (<FaHeartbeat size={35} className='text-backgroundColor' />);

const para1 = 'A lab test is a medical procedure that involves analyzing a sample of blood, urine, or other bodily fluids to help diagnose, monitor, or screen for health conditions.';
const para2 = 'A health check is a routine medical examination that assesses overall health and helps detect potential health issues early, often including physical exams, lab tests, and lifestyle assessments.';
const para3 = 'Heart health refers to the condition and functioning of the cardiovascular system. It involves maintaining healthy blood pressure, cholesterol levels, and lifestyle habits to prevent heart disease and promote long-term well-being.';

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', para: '' });

  const openModal = (title, para) => {
    setModalContent({ title, para });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div id='services' className='min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-24 lg:pt-16'>
      <div className='flex flex-col items-center lg:flex-row justify-between'>
        <div>
          <h1 className='text-4xl font-semibold text-center lg:text-start'>See Services</h1>
          <p className='mt-2 text-center lg:text-start'>Lab tests, health check-ups, heart health assessments, and comprehensive medical care tailored to your needs.</p>
        </div>
        <div className='mt-4 lg:mt-0'>
          <Button title={'See Services'} />
        </div>
      </div>

      <div className='flex flex-col lg:flex-row gap-5 pt-14'>
        <ServicesCard icon={icon1} title="Lab Test" para={para1} onLearnMore={() => openModal('Lab Test', para1)} />
        <ServicesCard icon={icon2} title="Health Check" para={para2} onLearnMore={() => openModal('Health Check', para2)} />
        <ServicesCard icon={icon3} title="Heart Health" para={para3} onLearnMore={() => openModal('Heart Health', para3)} />
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-8 max-w-lg w-full relative'>
            <button onClick={closeModal} className='absolute top-4 right-4 text-gray-500 hover:text-black'>
              <AiOutlineClose size={24} />
            </button>
            <h2 className='text-2xl font-bold mb-4'>{modalContent.title}</h2>
            <p className='text-gray-700'>{modalContent.para}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
