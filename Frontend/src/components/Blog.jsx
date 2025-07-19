import React from 'react'
import Button from '../layouts/Button'
import BlogCards from '../layouts/BlogCards'
import blog1 from '../assets/img/blog1.jpg'
import blog2 from '../assets/img/blog2.jpg'
import blog3 from '../assets/img/blog3.jpg'
import blog4 from '../assets/img/blog4.jpg'
import blog5 from '../assets/img/blog5.jpg'
import blog6 from '../assets/img/blog6.jpg'
const Blog = () => {
  return (
    <div id='blog' className='min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-24'>
        <div className='flex flex-col items-center lg:flex-row justify-between'>
            <div>
                <h1 className='text-4xl font-semibold text-center lg:text-start'>Latest post</h1>
                <p className='mt-2 text-center lg:text-start'>Here's Some Articles about our Doctors Latest's Researches.</p>
            </div>
            <div className='mt-4 lg:mt-0'>
                <Button title={'Our Article'}/>
            </div>
        </div>
        <div className='my-8'>
            <div className='flex flex-wrap justify-center gap-5 '>
                <BlogCards img={blog1} headlines={'Unraveling the Mysteries of Human Body'}/>
                <BlogCards img={blog2} headlines={'The Heart Healthy Diet'}/>
                <BlogCards img={blog3} headlines={'Understanding Pediatic Health'}/>
                <BlogCards img={blog4} headlines={'Navigate the World of Mental Health'}/>
                <BlogCards img={blog5} headlines={'The Importance of Regular Exercise'}/>
                <BlogCards img={blog6} headlines={'Skin Health 101'}/>
            </div>
        </div>
    </div>
  )
}

export default Blog
