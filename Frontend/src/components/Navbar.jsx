import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { Link } from 'react-scroll'
import Contact from '../models/Contact'

const Navbar = ({setToast}) => {
    const [menu,setMenu]=useState(false)
    const [showForm,setShowForm] = useState(false)

    const handleChange=()=>{
        setMenu(!menu)
    }
    const closemenu=()=>{
        setMenu(false)
    }

    const openForm = ()=>{
        setShowForm(true)
        setMenu(false)
    }
    const closeForm = ()=>{
        setShowForm(false)
    }
    
  return (
    <div className='fixed w-full z-10 text-white'>
      <div>
        <div className='flex flex-row justify-between p-5 md:px-32 px-5 bg-backgroundColor shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
            <div className='flex flex-row items-center cursor-pointer'>
                <Link to='home' spy={true} smooth={true} duration={500} > 
                    <h1 className='text-2xl font-semibold '>MedicalCure</h1>
                </Link>
            </div>
            <nav className='hidden lg:flex flex-row items-center text-lg font-medium gap-8'>
                <Link to='home' spy={true} smooth={true} duration={500} className='hover:text-hoverColor transition-all cursor-pointer'>Home</Link>
                <Link to='services' spy={true} smooth={true} duration={500} className='hover:text-hoverColor transition-all cursor-pointer'>Services</Link>
                <Link to='about' spy={true} smooth={true} duration={500} className='hover:text-hoverColor transition-all cursor-pointer'>About</Link>
                <Link to='doctors' spy={true} smooth={true} duration={500} className='hover:text-hoverColor transition-all cursor-pointer'>Doctors</Link>
                <Link to='blog' spy={true} smooth={true} duration={500} className='hover:text-hoverColor transition-all cursor-pointer'>Blog</Link>
            </nav>
            <div className='hidden lg:flex'>
                <button onClick={openForm} 
                className='bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-300 trasition duration-300 ease-in-out'>
                    Book Now
                </button>
            </div>
                {showForm && <Contact setToast={setToast} closeForm={closeForm}/>}            
            <div className='lg:hidden  flex'>
                {menu?(
                    <AiOutlineClose size={28} onClick={handleChange}/>
                ):(
                    <AiOutlineMenu size={28} onClick={handleChange}/>
                )}
            </div>
        </div>
        <div className={`${menu?'translate-x-0':"-translate-x-full"} lg:hidden flex flex-col absolute  bg-backgroundColor text-white left-0 top-16 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300`}>
            <Link to='home' spy={true} smooth={true} duration={500} className='hover:text-yellow-300 transition-all cursor-pointer'>Home</Link>
                <Link onClick={closemenu} to='services' spy={true} smooth={true} duration={500} className='hover:text-yellow-300 text-lg transition-all cursor-pointer'>Services</Link>
                <Link onClick={closemenu} to='about' spy={true} smooth={true} duration={500} className='hover:text-yellow-300 text-lg transition-all cursor-pointer'>About</Link>
                <Link onClick={closemenu} to='doctors' spy={true} smooth={true} duration={500} className='hover:text-yellow-300 text-lg transition-all cursor-pointer'>Doctors</Link>
                <Link onClick={closemenu} to='blog' spy={true} smooth={true} duration={500} className='hover:text-yellow-300 text-lg transition-all cursor-pointer'>Blog</Link>
                <div className='lg:hidden '>
                <button onClick={openForm}
                className='bg-yellow-500 text-lg text-white px-4 py-2 rounded-md hover:bg-yellow-300 trasition duration-300 ease-in-out'>
                   Book Now
                </button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
