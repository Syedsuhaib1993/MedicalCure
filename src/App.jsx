import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Services from './components/Services'
import Doctors from './components/Doctors'
import Blog from './components/Blog'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Navbar/>
      
      <main>
        <div id='home'>
          <Home/>
        </div>
        <div id='services'>
          <Services/>
        </div>
        <div id='about'>
          <About/>
        </div>
        <div id='doctors'>
          <Doctors/>
        </div>
        <div id='blog'>
          <Blog/>
        </div>
      </main>
      <Footer/>
    </div>
  )
}

export default App
