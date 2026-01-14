import React from 'react'
import User from './User'
import userGetAllUsers from "../../context/userGetAllUsers"
export default function Users() {
  const [allUsers, loading] = userGetAllUsers(); // ✅ Add parentheses to call the function

  console.log(allUsers)
  return (
    <div style={{ maxHeight: "calc(84vh - 1vh)" }}  className=' my-2 flex-ankit overflow-y-auto'>
      
      {allUsers.map((user,index)=>{
        return <User key={index} user={user} />
      })}
    
      
      
     

    </div>

  )
}
