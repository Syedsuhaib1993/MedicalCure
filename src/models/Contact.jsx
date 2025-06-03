import React from 'react'
import Button from '../layouts/Button'

const Contact = ({closeForm}) => {
  return (
    <div className='fixed inset-0 flex items-center z-10 justify-center bg-black bg-opacity-50'>
        <div className='popup-form absolute mt-12 text-black '>
            <form className='w-80 md:w-96 space-y-5  p-5 rounded-xl bg-backgroundColor '>
                <h1 className='text-4xl font-semibold text-center'>Book Now</h1>
                <div className='flex flex-col'>
                    <input type="text"
                    name='FirstName' 
                    id="FirstName"
                    placeholder='First name'
                    className='py-3 px-2  rounded-lg opacity-80 focus:outline-none' />
                </div>
                <div className='flex flex-col '>
                    <input type="text"
                    name='LastName' 
                    id="LastName"
                    placeholder='Last name'
                    className='py-3 px-2 bg-backgroundcolor rounded-lg opacity-80 focus:outline-none' />
                </div>
                <div className='flex flex-col'>
                    <input type="email"
                    name='email' 
                    id="email"
                    placeholder='Your email'
                    className='py-3 px-2 bg-backgroundcolor rounded-lg opacity-80 focus:outline-none' />
                </div>
                <div className='flex flex-col'>
                    <input type="text"
                    name='phonenumber' 
                    id="phonenumber"
                    placeholder='Your Number.'
                    className='py-3 px-2 bg-backgroundcolor rounded-lg opacity-80 focus:outline-none' />
                </div>
                <div className='flex gap-5 justify-around text-lg'>
                    <Button title='Book Appointment'/>
                    <button className='bg-white sm:text-lg text-sm text-black px-8 rounded-lg active:bg-red-500' onClick={closeForm}>
                        Close
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Contact
