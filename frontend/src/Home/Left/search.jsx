// import React from 'react'
// import { useState } from 'react';
// import { IoSearch } from "react-icons/io5";
// import userGetAllUsers from '../../context/userGetAllUsers.jsx';
// import useConversation from '../../statemanage/useConversation.js';
// export default function Search() {
//     const [search, setSearch] = useState("");
//     const [allUsers] = userGetAllUsers();
//     const { setSelectedConversation } = useConversation()
//     return (

//         <div className='h-[10vh]'>

//             <div className='px-6 py-4'>
//                 <form onSubmit={handleSubmit = (e)=>{
//                     e.preventDefault()
//                     if (!search) return;
//                     const conversation=allUsers.find((user)=>{
//                         return user.name.toLowerCase().includes(search.toLowerCase())
//                     })
//                       if(conversation)  {
//                         setSelectedConversation(conversation);
//                         setSearch(" ")
//                       }else{
//                         alert("User not found");
//                       }
                    
                    
//                 }}
//                 <div className='flex space-x-3'>
//                     <label className="border-[1px] border-gray-700 bg-slate-900 rounded-lg flex items-center gap-2 w-[80%] p-3">
//                         <input type="text" className="grow outline-none bg-slate-900" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />

//                     </label>
//                     <button>

//                         <IoSearch className='text-5xl p-2 hover:bg-gray-600 rounded-full duration-300' />
//                     </button>
//                 </div>
//             </div>
//            </form>
//         </div >


//     )
// }
import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import userGetAllUsers from '../../context/userGetAllUsers.jsx';
import useConversation from '../../statemanage/useConversation.js';
import toast from 'react-hot-toast';

export default function Search() {
  const [search, setSearch] = useState("");
  const [allUsers] = userGetAllUsers();
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    const conversation = allUsers.find((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch(""); // ✅ Clear input field
    } else {
      toast.error("User not found");
    }
  };

  return (
    <div className='h-[10vh]'>
      <form onSubmit={handleSubmit} className='px-6 py-4'>
        <div className='flex space-x-3'>
          <label className="border border-gray-700 bg-slate-900 rounded-lg flex items-center gap-2 w-[80%] p-3">
            <input
              type="text"
              className="grow outline-none bg-slate-900 text-white"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <button type="submit">
            <IoSearch className='text-5xl p-2 hover:bg-gray-600 rounded-full duration-300' />
          </button>
        </div>
      </form>
    </div>
  );
}



