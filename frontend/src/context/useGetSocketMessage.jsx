// import React, { useEffect } from 'react'
// import { useSocketContext } from './SocketContext.jsx'
// import useConversation from '../statemanage/useConversation.js';
// import sound from "../assets/noti.mp3"

// export default function useGetSocketMessage() {
//     const {socket}=useSocketContext();
//     const {messages,setMessages}=useConversation();
//     useEffect(()=>{
//         socket.on("newMessage",(newMessage)=>{
//             const notification=new Audio(sound);
//             notification.play()
//             setMessages(...messages,newMessage)
//         });
//         return ()=>socket.off("newMessage")
//     },[socket,messages,setMessages])

// }

import { useEffect } from 'react';
import { useSocketContext } from './SocketContext.jsx';
import useConversation from '../statemanage/useConversation.js';
import sound from '../assets/noti.mp3';

export default function useGetSocketMessage() {
  const { socket } = useSocketContext();
  const { setMessages } = useConversation();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      const notification = new Audio(sound);
      notification.play();

      // ✅ Update messages using updater function to prevent stale state
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [socket, setMessages]);
}

// import { useEffect } from 'react';
// import { useSocketContext } from './SocketContext.jsx';
// import useConversation from '../statemanage/useConversation.js';
// import sound from '../assets/noti.mp3';

// export default function useGetSocketMessage() {
//   const { socket } = useSocketContext();
//   const { selectedConversation, setMessages } = useConversation();

//   useEffect(() => {
//     if (!socket) return;

//     const handleNewMessage = (newMessage) => {
//       const notification = new Audio(sound);
//       notification.play();

//       // Only add if the message is for current conversation
//       if (selectedConversation?._id === newMessage.senderId || selectedConversation?._id === newMessage.receiverId) {
//         setMessages((prev) => [...prev, newMessage]); // ✅ use callback for freshness
//       }
//     };

//     socket.on('newMessage', handleNewMessage);

//     return () => {
//       socket.off('newMessage', handleNewMessage);
//     };
//   }, [socket, selectedConversation, setMessages]);
// }

// import { useEffect } from 'react';
// import { useSocketContext } from './SocketContext.jsx';
// import useConversation from '../statemanage/useConversation.js';
// import sound from '../assets/noti.mp3';

// export default function useGetSocketMessage() {
//   const { socket } = useSocketContext();
//   const { selectedConversation, setMessages } = useConversation();

//   useEffect(() => {
//     if (!socket) return;

//     const handleNewMessage = (newMessage) => {
//       const notification = new Audio(sound);
//       notification.play();

//       // ✅ Only show if it's for the current selected conversation
//       const isRelevant =
//         selectedConversation &&
//         (selectedConversation._id === newMessage.senderId ||
//          selectedConversation._id === newMessage.receiverId);

//       if (isRelevant) {
//         setMessages((prevMessages) => [...prevMessages, newMessage]); // ✅ Properly update messages
//       }
//     };

//     socket.on('newMessage', handleNewMessage);

//     return () => {
//       socket.off('newMessage', handleNewMessage);
//     };
//   }, [socket, selectedConversation, setMessages]);
// }
