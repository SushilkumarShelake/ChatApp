// import React, { useState } from 'react'
// import useConversation from '../statemanage/useConversation.js';
// import axios from 'axios';

// export default function useSendMessage() {
//      const [loading, setLoading] = useState(false)
//     const { messages, setMessages, selectedConversation } = useConversation();
//      const sendMessages = async (message) => {
//             setLoading(true);
//             if (selectedConversation && selectedConversation._id) {
//                 try {
//                     const res = await axios.get(
//                         `/api/message/send/${selectedConversation._id}/messages`,{message}
//                     );

//                     setMessages([...messages,res.data]); 
//                 } catch (error) {
//                     console.log("Error in send messages:", error);
//                 } finally {
//                     setLoading(false); 
//                 }
//             }
//         };
//         sendMessages();
//   return {loading,sendMessages}
    
  
// }


// import { useState } from 'react';
// import useConversation from '../statemanage/useConversation.js';
// import axios from 'axios';

// export default function useSendMessage() {
//     const [loading, setLoading] = useState(false);
//     const { messages, setMessages, selectedConversation } = useConversation();

//     const sendMessages = async (message) => {
//         setLoading(true);
//         if (selectedConversation && selectedConversation._id) {
//             try {
//                 const res = await axios.post( // ✅ use POST not GET
//                     `/api/message/send/${selectedConversation._id}/messages`,
//                     { message } // ✅ pass message in body
//                 );
//                 setMessages([...messages, res.data.newMessage]); // make sure your backend returns newMessage
//             } catch (error) {
//                 console.log("Error in send messages:", error);
//             } finally {
//                 setLoading(false);
//             }
//         }
//     };

//     return { loading, sendMessages }; // ✅ Don't call sendMessages here
// }

// // context/useSendMessage.js
// import { useState } from 'react';
// import useConversation from '../statemanage/useConversation';
// import axios from 'axios';

// export default function useSendMessage() {
//   const [loading, setLoading] = useState(false);
//   const { messages, setMessages, selectedConversation } = useConversation();

//   const sendMessages = async (message) => {
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         `/api/message/send/${selectedConversation._id}/messages`,
//         { message },
//         { withCredentials: true }
//       );

//       // ✅ Add the new message to state immediately
//       setMessages([...messages, res.data.newMessage]);

//     } catch (error) {
//       console.log("Error in sendMessages:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { loading, sendMessages };
// }

// import { useState } from 'react';
// import useConversation from '../statemanage/useConversation.js';
// import axios from 'axios';

// export default function useSendMessage() {
//   const [loading, setLoading] = useState(false);
//   const { messages, setMessages, selectedConversation } = useConversation();

//   const sendMessages = async (message) => {
//     if (!selectedConversation || !selectedConversation._id) return;

//     setLoading(true);
//     try {
//       const res = await axios.post(
//         `/api/message/send/${selectedConversation._id}`,
//         { message },
//         { withCredentials: true }  // add if your auth is cookie-based
//       );

//       setMessages([...messages, res.data.newMessage]); // ✅ append new message
//     } catch (error) {
//       console.log("Error in send messages:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { loading, sendMessages };
// }

// import { useState } from 'react';
// import useConversation from '../statemanage/useConversation.js';
// import axios from 'axios';

// export default function useSendMessage() {
//   const [loading, setLoading] = useState(false);
//   const { messages, setMessages, selectedConversation } = useConversation();

//   const sendMessages = async (message) => {
//     setLoading(true);
//     try {
//       const res = await axios.post(`/api/message/send/${selectedConversation._id}`, { message });
//       setMessages([...messages, res.data.newMessage]);
//     } catch (error) {
//       console.log("Error in sendMessages:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { loading, sendMessages };
// }

import { useState } from 'react';
import useConversation from '../statemanage/useConversation.js';
import axios from 'axios';

export default function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessages = async (message) => {
    if (!selectedConversation?._id) return;
    
    setLoading(true);
    try {
      const res = await axios.post(`/api/message/send/${selectedConversation._id}`, { message });
      setMessages([...messages, res.data.newMessage]); // update messages
    } catch (error) {
      console.error("Error in sendMessages:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessages };
}

