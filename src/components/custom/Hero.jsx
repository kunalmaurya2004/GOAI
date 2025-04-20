import React from 'react'
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    
    <div className='flex flex-col items-center sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10 gap-9 text-center'>
      <h1 className='font-extrabold text-[45px] text-center mt-16'>
        <span className='text-[#f56551]'>Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips</h1>
        <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator, creating custom Itineraries talored to your interests and budget.</p>
        <Link to={'/create-trip'}>
        <Button>Get started, it's Free</Button></Link>
        <img src="/landing.png"/>
    </div>
  )
}

export default Hero;
