import { useState } from 'react'
import './App.css'

import Footer from './App/Footer';

import { Link } from 'react-router-dom';

function App() {
  return (
    <>

      <div className='flex justify-center'>
        <div className='p-10'>
            <h1 className='text-center text-blue-500 text-3xl'>
              Login <span className='text-orange-500'>Register</span> <span className='text-red-500'>Reset Password</span>
            </h1>
            <div className='h-1 w-7 rounded-full bg-orange-500'></div>
        </div>
      </div>
      <div className='flex justify-center gap-5 pb-10'>
        <Link to='/login' className='bg-green-200 text-green-500 rounded-full px-5 shadow-sm'>
            Login
        </Link>
        <Link to='/register' className='bg-blue-200 text-blue-500 rounded-full px-5 shadow-sm'>
          Register
        </Link>
        <Link to='/resetpassword' className='bg-red-200 text-red-500 rounded-full px-5 shadow-sm'>
          Reset Password
        </Link>
      </div>
      <Footer />
      
    </>
  )
}

export default App
