import React from 'react'
import bgImg from "../../public/assets/images/side-img.svg"
import SignInForm from './forms/SignInForm'
import { Outlet } from 'react-router-dom'


const AuthLayout = () => {
  return (
   <main className='flex w-full h-screen'>
    <div className='flex w-1/2 '>
        <Outlet></Outlet>
    </div>
    
    <div className='picture w-1/2 hidden xl:block'>
    <img src={bgImg} alt="logo" className='w-full h-full object-cover' />
    </div>
    </main>
  )
}

export default AuthLayout