// import React, { useEffect } from 'react'
// import Chatuser from './Chatuser'
// import Message from './Message'
// import Type from './Type'
// import useConversation from '../../statemanage/useConversation.js'
// import { useAuth } from '../../context/AuthProvider.jsx'

// export default function Right() {
//   const { selectedConversation,setSelectedConversation}=useConversation();   //refresh binfding correct
//   useEffect(()=>{          
//     return setSelectedConversation(null);
//   },[selectedConversation]);
//   return (
//     <div className="w-full bg-slate-950 text-gray-300">
//     <div>
//     {!selectedConversation? (<Nochat></Nochat>):(<> 

//       <div className="flex-none">
//       {/* Header */}
//         <Chatuser />
//       </div>

//       {/* Message List */}
//       <div className="flex-1 overflow-y-auto px-2">
//         <Message />
//       </div>

//       {/* Input Box */}
//       <div className="flex-none px-2 py-2">
//         <Type />
//       </div>
//      </>

//       )}
//     </div>
//     </div>
   
   
//   )
// }

// const Nochat = () => {
//   const authUser = useAuth();

//   return (
//     <div className='flex h-screen items-center justify-center flex-col'>
//       <h1 className='text-center  font-semibold text-xl'>No conversation selected
//         <br></br>
//        Select a conversation to start a chat</h1>
//       {authUser?.name && <p className='text-sm mt-1'>Welcome, {authUser.name}</p>}
//     </div>
//   );
// };


import React, { useEffect } from 'react';
import Chatuser from './Chatuser';
import Message from './Message';
import Type from './Type';
import useConversation from '../../statemanage/useConversation.js';
import { useAuth } from '../../context/AuthProvider.jsx';

export default function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, []);

  return (
    <div className="w-full h-screen bg-slate-950 text-gray-300">
      {!selectedConversation ? (
        <Nochat />
      ) : (
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex-none">
            <Chatuser />
          </div>

          {/* Message Area (grows + scrolls) */}
          <div className="flex-1 overflow-y-auto">
            <Message />
          </div>

          {/* Input Box */}
          <div className="flex-none">
            <Type />
          </div>
        </div>
      )}
    </div>
  );
}

const Nochat = () => {
  const { authUser } = useAuth();
  return (
    <div className="flex h-screen items-center justify-center flex-col">
      <h1 className="text-center font-semibold text-xl">Welcome  <span>{authUser.user.name}</span>
        No conversation selected<br />
        Select a conversation to start a chat
      </h1>
      {/* {authUser?.name && <p className="text-sm mt-1">Welcome, {authUser.user.name}</p>} */}
    </div>
  );
};
