import React from 'react'
import Button from '../layouts/Button'
import { RiMicroscopeLine } from 'react-icons/ri'
import { MdHealthAndSafety } from 'react-icons/md'
import { FaHeartbeat } from 'react-icons/fa'
import ServicesCard from '../layouts/ServicesCard'

const icon1 = (<RiMicroscopeLine size={35} className='text-backgroundColor'/>)
const icon2 = (<MdHealthAndSafety size={35} className='text-backgroundColor'/>)
const icon3 = (<FaHeartbeat size={35} className='text-backgroundColor'/>)

const para1 = 'A lab test is a medical procedure that involves analyzing a sample of blood, urine, or other bodily fluids to help diagnose, monitor, or screen for health conditions.'
const para2 = 'A health check is a routine medical examination that assesses overall health and helps detect potential health issues early, often including physical exams, lab tests, and lifestyle assessments.'
const para3 = 'Heart health refers to the condition and functioning of the cardiovascular system. It involves maintaining healthy blood pressure, cholesterol levels, and lifestyle habits to prevent heart disease and promote long-term well-being'

const Services = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-24 lg:pt-16'>
        <div className='flex flex-col items-center lg:flex-row justify-between'>
            <div>
                <h1 className='text-4xl font-semibold text-center lg:text-start'>See Services</h1>
                <p className='mt-2 text-center lg:text-start'>Lab tests, health check-ups, heart health assessments, and comprehensive medical care tailored to your needs.</p>
            </div>
            <div className='mt-4 lg:mt-0'>
                <Button title={'See Services'}/>
            </div>
        </div>
        <div className='flex flex-col lg:flex-row gap-5 pt-14'>
            <ServicesCard icon={icon1} title="Lab Test" para={para1}/>
            <ServicesCard icon={icon2} title="Health Check" para={para2}/>
            <ServicesCard icon={icon3} title="Heart Health" para={para3}/>
        </div>
    </div>
  )
}

export default Services
