import React, { useState } from 'react';
import Button from '../layouts/Button';
import axios from 'axios';

// Example doctors data
const data = [
  {
    img: 'doc1',
    name: 'Dr. Serena Mitchell',
    specialties: 'Orthopedic Surgeon',
  },
  {
    img: 'doc2',
    name: 'Dr. Julian Bennett',
    specialties: 'Cardiologist',
  },
  {
    img: 'doc3',
    name: 'Dr. Camila Rodriguez',
    specialties: 'Pediatrician',
  },
  {
    img: 'doc4',
    name: 'Dr. Victor Nguyen',
    specialties: 'Neurologist',
  },
  {
    img: 'doc5',
    name: 'Dr. Ethan Carter',
    specialties: 'Dermatologist',
  },
  {
    img: 'doc6',
    name: 'Dr. Olivia Martinez',
    specialties: 'Ophthalmologist',
  },
];

// Example diseases list
const diseases = [
  "Diabetes",
  "Hypertension",
  "Asthma",
  "Heart Disease",
  "Arthritis",
  "Allergies",
  "Migraine",
  "Depression",
];

const Contact = ({ closeForm }) => {
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDisease, setSelectedDisease] = useState('');
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [number,setNumber] = useState('')

  const handleDoctorChange = (e) => {
    const doctorName = e.target.value;
    setSelectedDoctor(doctorName);

    const doctor = data.find(doc => doc.name === doctorName);
    if (doctor) {
      setSelectedSpecialty(doctor.specialties);
    } else {
      setSelectedSpecialty('');
    }
  };
  const handleSubmit=async(e)=>{
    e.preventDefault()
    // console.log(name,email,number,selectedDisease,selectedDoctor,selectedSpecialty);
    try {
      const response = await axios.post('http://localhost:8080/api/create',{
        name:name,
        email:email,
        number:number,
        disease:selectedDisease,
        doctor:selectedDoctor,
        specialty:selectedSpecialty
      })
      alert('Appointment Form Submitted')
      console.log(response.data);
      
    } catch (error) {
      console.log(error.message);
      
    }
    
    
    setSelectedDisease('')
    setSelectedDoctor('')
    setSelectedSpecialty('')
    setName('')
    setEmail('')
    setNumber('')
  }
  return (
    <div className='fixed inset-0 flex items-center z-10 justify-center bg-black bg-opacity-50 px-4'>
      <div className='popup-form absolute mt-8 text-black'>
        <form onSubmit={handleSubmit} className='w-full max-w-lg md:max-w-xl space-y-4 p-8 rounded-2xl bg-backgroundColor shadow-lg'>
          <h1 className='text-3xl font-bold text-center mb-4'>Book Appointment</h1>

          <div className='flex flex-col'>
            <label htmlFor='FirstName' className='mb-1 font-medium'>First Name</label>
            <input
              type="text"
              name='FirstName'
              id="FirstName"
              placeholder='Enter your first name'
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className='py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary w-full'
            />
          </div>


          <div className='flex flex-col'>
            <label htmlFor='email' className='mb-1 font-medium'>Email</label>
            <input
              type="email"
              name='email'
              id="email"
              placeholder='you@example.com'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className='py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary w-full'
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor='phonenumber' className='mb-1 font-medium'>Phone Number</label>
            <input
              type="text"
              name='phonenumber'
              id="phonenumber"
              placeholder='e.g., +1 234 567 890'
              value={number}
              onChange={(e)=>setNumber(e.target.value)}
              className='py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary w-full'
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor='commonDisease' className='mb-1 font-medium'>Common Disease</label>
            <select
              name='commonDisease'
              id='commonDisease'
              value={selectedDisease}
              onChange={(e) => setSelectedDisease(e.target.value)}
              className='py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary w-full'
            >
              <option value="" disabled>Select a disease</option>
              {diseases.map((disease, idx) => (
                <option key={idx} value={disease}>{disease}</option>
              ))}
            </select>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='doctor' className='mb-1 font-medium'>Select Doctor</label>
            <select
              name="doctor"
              id="doctor"
              value={selectedDoctor}
              onChange={handleDoctorChange}
              className='py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary w-full'
            >
              <option value="" disabled>Select a doctor</option>
              {data.map((doc, idx) => (
                <option key={idx} value={doc.name}>{doc.name}</option>
              ))}
            </select>
          </div>

          {selectedSpecialty && (
            <div className='flex flex-col'>
              <label htmlFor='specialties' className='mb-1 font-medium'>Specialty</label>
              <input
                type="text"
                name="specialties"
                id="specialties"
                value={selectedSpecialty}
                readOnly
                className='py-3 px-4 rounded-lg border border-gray-300 bg-gray-100 w-full cursor-not-allowed'
              />
            </div>
          )}

          <div className='flex gap-5 justify-between pt-4'>
            <Button title='Book Appointment' submit="submit" />
            <button
              type="button"
              className='bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition'
              onClick={closeForm}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
