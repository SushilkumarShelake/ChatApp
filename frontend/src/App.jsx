import { useState } from 'react'
import Left from './Home/Left/left';
import Right from './Home/Right/right';
import Logout from './Home/left1/Logout';
import Signup from './components/Signup';
import Login from './components/Login';
import { useAuth } from './context/AuthProvider';
import { Routes, Route, Navigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';


function App() {
  const { authUser, setAuthUser } = useAuth(); // ✅ Fixed here
  console.log(authUser)

  return (
    <>
    
      <Routes>
        <Route path='/' element={
          authUser ? (<div className='flex h-screen'>
            <Logout />
            <Left />
            <Right />
  

          </div>) : (
            <Navigate to={"/login"} />
          )}
        />

        <Route path='/login' element={authUser ? <Navigate to={"/"} /> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to={"/"} /> : <Signup />} />
      </Routes>
      <Toaster />

    </>
  );
}

export default App;

