// import React, { useState } from 'react'
// import { IoSend } from "react-icons/io5";
// import useSendMessage from '../../context/useSendMessage.js';

// function Type() {
//     const {loading,sendMessages}=useSendMessage();
//     const [message,setMessage]=useState("");
//     const handleSubmit=async(e)=>{
//         e.preventDefault();
//        await sendMessages(message);
//        setMessage("");
//     }
//     return (
//         <>
//           <form onSubmit={handleSubmit}>
//              <div className='flex space-x-3 h-[9vh] text-center bg-gray-800'>

//                 <div className='w-[70%] mx-4'>


//                     <input type="text"  value={message} onChange={(e)=>{
//                       setMessage(e.target.value)
//                     }} placeholder="Type here" className="border-[1px] border-gray-700 rounded-xl flex items-center w-full py-3 px-3 grow outline-none bg-slate-900 mt-1" />

//                 </div>
//                 <button className='text-3xl items-center '>
//                     <IoSend />
//                 </button>
//             </div>
//           </form>

//         </>
//     )
// }

// export default Type

// import React, { useState } from 'react';
// import { IoSend } from "react-icons/io5";
// import useSendMessage from '../../context/useSendMessage.js';

// function Type() {
//   const { loading, sendMessages } = useSendMessage();
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!message.trim()) return;
//     await sendMessages(message);
//     setMessage("");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className='flex space-x-3 h-[9vh] text-center bg-gray-800'>
//         <div className='w-[70%] mx-4'>
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type here"
//             className="border border-gray-700 rounded-xl w-full py-3 px-3 bg-slate-900 text-white"
//           />
//         </div>
//         <button className='text-3xl text-white' disabled={loading}>
//           <IoSend />
//         </button>
//       </div>
//     </form>
//   );
// }

// export default Type;

import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import useSendMessage from '../../context/useSendMessage.js';

function Type() {
  const { loading, sendMessages } = useSendMessage();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessages(message);
    setMessage(""); // clear input
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-3 h-[9vh] bg-gray-800 items-center px-4">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type here"
        className="flex-grow border border-gray-700 rounded-xl py-3 px-4 bg-slate-900 text-white outline-none"
        disabled={loading}
      />
      <button type="submit" className="text-3xl text-white" disabled={loading || !message.trim()}>
        <IoSend />
      </button>
    </form>
  );
}

export default Type;
