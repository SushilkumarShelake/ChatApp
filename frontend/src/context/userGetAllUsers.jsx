import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie"
import axios from "axios"

export default function userGetAllUsers() {
    const [allUsers,setAllUsers]=useState([])
    const [loading,setLoading]=useState([])
    useEffect(()=>{
        const getUsers=async()=>{
            setLoading(true)   //ab tak data nahi hai isliye
            try {
           const token=Cookies.get("jwt");
         const responce = await axios.get("/api/user/getUserProfile",{
               withCredentials:"include",
               headers:{
                   Authorization:`Bearer ${token}`,
               }
           });
           setAllUsers(responce.data.filteredUsers);

           setLoading(false);
            
        } catch (error) {
            console.log("error in userGetAllUsers"+error);
        }
        }
        getUsers()
        
        
    },[]);
    return [allUsers,loading];
       
  
  
}
