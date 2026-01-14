import axios from 'axios';
import React, { useState } from 'react'
import Cookies from "js-cookie"
import { IoLogOut } from "react-icons/io5";
import toast from 'react-hot-toast';
export default function Logout() {
    const [loading,setLoading]=useState(false);
    const handleLogout=async()=>{
        setLoading(true);
        try {
          const res=  await axios.post("/api/user/logout");
          localStorage.removeItem("messenger")
          Cookies.remove("jwt")
          setLoading(false);
          toast.success("Logout Successfully")
        } catch (error) {
            console.log(error);
            toast.error("Failed to Logout")
        }

    }
    return (
        <>
            <div className='w-[4%]  bg-slate-950 text-white flex flex-col justify-end'>



                <div className='px-3'>
                    <div className='flex space-x-3'>

                        <button>
                            {" "}
                          
                            <IoLogOut  className='text-5xl p-2 hover:bg-gray-600 rounded-lg duration-300 ' onClick={handleLogout}/>
                        </button>
                    </div>
                </div>



            </div>








        </>


    )
}
