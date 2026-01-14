// import React from 'react'
// import useConversation from '../../statemanage/useConversation.js'
// import { useSocketContext } from '../../context/SocketContext.jsx';

// export default function User({user}) {
//   const {selectedConversation,setSelectedConversation}=useConversation();
//   const isSelected=selectedConversation?._id === user._id;
//   const {socket, onlineUsers}=useSocketContext(); //this is new
//   const isOnline=onlineUsers.includes(user._id)
//   return (
//     <div className={`hover:bg-slate-600 duration-300 ${isSelected?"bg-slate-700" :""}`} onClick={()=>setSelectedConversation(user)}>
//       <div className='flex space-x-4 px-8 py-7 hover:bg-slate-600 duration-300 cursor-pointer'>
//       <div className={`avatar  ${isOnline ? "online":""}`}>
//         <div className="w-14 rounded-full">
//           <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
//         </div>

//       </div>
//       <div>
//         <h1 className='font-bold'>{user.name}</h1>
//         <span>{user.email}</span>
//       </div>

      
//       </div>
//     </div>
//   )
// }

import React from 'react';
import useConversation from '../../statemanage/useConversation.js';
import { useSocketContext } from '../../context/SocketContext.jsx';

export default function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { onlineUsers } = useSocketContext();

  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${isSelected ? 'bg-slate-700' : ''}`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className='flex space-x-4 px-8 py-7 cursor-pointer'>
        <div className='avatar relative'>
          <div className='w-14 rounded-full'>
            <img
              src='https://img.daisyui.com/images/profile/demo/gordon@192.webp'
              alt='avatar'
              className='rounded-full'
            />
            {isOnline && (
              <span className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full'></span>
            )}
          </div>
        </div>
        <div>
          <h1 className='font-bold'>
            {user.name} {isOnline && <span className='text-sm text-green-400'>(Online)</span>}
          </h1>
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  );
}
