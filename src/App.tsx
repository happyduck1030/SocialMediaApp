import React from 'react'
import { Route,Routes } from 'react-router-dom'
import './globals.css'
import { Toaster } from "@/components/ui/sonner"

import  SignInForm  from './auth/forms/SignInForm'
import  SignUpForm  from './auth/forms/SignUpForm'
import AuthLayout from './auth/AuthLayout'
import {Home} from './pages/index'

const App = () => {
  return (
   <main>
    <Routes>
    {/* public routes */}
    <Route element={<AuthLayout/>}>
      <Route path='/Login' element={<SignInForm/>}></Route>
      <Route path='/SignUp' element={<SignUpForm/>}></Route>
    </Route>
    {/* private routes */}

    </Routes>
      <Toaster />
   </main>
  )
}

export default App