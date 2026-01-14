// import React from 'react'
// import useConversation from "../../statemanage/useConversation.js"
// export default function Chatuser() {
//     const {selectedConversation}=useConversation();
//     console.log(selectedConversation);
    
//     return (
//         <>
//             <div className=' pl-5 pt-5 pb-3 h-[12vh] flex space-x-4 bg-gray-900 hover:bg-gray-600 duration-300'>
//                 <div>
//                     <div className="avatar avatar-online">
//                         <div className="w-14 rounded-full">
//                             <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
//                         </div>

//                     </div>
//                 </div>
//                 <div>
//                     <h1 className='text-xl'>{selectedConversation.name}</h1>
//                     {/* <h1 className='text-xl'>Ankit</h1> */}
//                     <span className='text-xm'>Online</span>
//                 </div>
//             </div>
//         </>
//     )
// }

import React from 'react';
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from '../../context/SocketContext.jsx'; // ✅ Import

export default function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext(); // ✅ Get online users

  const isOnline = onlineUsers.includes(selectedConversation?._id); // ✅ Check online status

  return (
    <>
      <div className='pl-5 pt-5 pb-3 h-[12vh] flex space-x-4 bg-gray-900 hover:bg-gray-600 duration-300'>
        <div>
          <div className="avatar">
            <div className="w-14 rounded-full relative">
              <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" alt="avatar" />
              {isOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              )}
            </div>
          </div>
        </div>
        <div>
          <h1 className='text-xl'>{selectedConversation?.name}</h1>
          <span className='text-sm text-gray-400'>{isOnline ? "Online" : "Offline"}</span>
        </div>
      </div>
    </>
  );
}
