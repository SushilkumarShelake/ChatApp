// import React from 'react'
// import Messages from './Messages'
// import useGetMessage from '../../context/useGetMessage.js'
// import Loading from "../../components/Loading.jsx"

// export default function Message() {
//     const {messages,loading}=useGetMessage();
//     console.log(messages);
    
//     return (
//         <>
//       {loading?(<Loading></Loading>):(messages.length>0 && messages.map((message)=>{
//         <Messages key={message._id} message={message}/>
//       }))}


//            {/* <div className='' style={{minHeight:"calc(88vh - 10vh)"}}> */}
//            {!loading && (!messages || messages.length === 0) && (
//   <p className="text-center mt-[20%]">Say! Hi</p>
// )}

            
//            {/* </div> */}
//         </>
//     )
// }

// import React, { useEffect, useRef } from 'react'
// import Messages from './Messages'
// import useGetMessage from '../../context/useGetMessage.js'
// import Loading from "../../components/Loading.jsx"
// import useGetSocketMessage from '../../context/useGetSocketMessage.jsx';

// export default function Message() {
//   const { messages, loading } = useGetMessage();
// useGetSocketMessage();  //this can listen incomming message in real time
//   console.log(messages); // Always check what's actually returned
//   const lastMessageRef=useRef()
//   useEffect(()=>{
//     setTimeout(()=>{
//       if(lastMessageRef.current){
//         lastMessageRef.current.scrollIntoView({behavior:"smooth"})
//       }
//     },100)
//   },[messages])

//   return (
//     <>
//       {loading ? (
//         <Loading />
//       ) : Array.isArray(messages) && messages.length > 0 ? (
//         messages.map((message) => (
//           <Messages key={message._id} message={message} />
//         ))
//       ) : (
//         <div className="text-center mt-[20%]">
//           Say! Hi
//         </div>
//       )}
//     </>
//   );
// }
import useConversation from '../../statemanage/useConversation.js'
import { useEffect, useRef } from 'react';
import useGetMessage from '../../context/useGetMessage.js';
import useGetSocketMessage from '../../context/useGetSocketMessage.jsx';
import Messages from './Messages';
import Loading from "../../components/Loading.jsx";

export default function Message() {
  const { messages } = useConversation(); // Zustand state (live updates)
  const { loading } = useGetMessage();    // Initial fetch
  useGetSocketMessage();                  // Real-time listener

  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [messages]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : Array.isArray(messages) && messages.length > 0 ? (
        messages.map((message, i) => (
          <div key={message._id} ref={i === messages.length - 1 ? lastMessageRef : null}>
            <Messages message={message} />
          </div>
        ))
      ) : (
        <div className="text-center mt-[20%]">Say! Hi</div>
      )}
    </>
  );
}

// import React, { useEffect, useRef } from 'react';
// import Messages from './Messages';
// import useGetMessage from '../../context/useGetMessage.js';
// import useConversation from '../../statemanage/useConversation.js';
// import useGetSocketMessage from '../../context/useGetSocketMessage.jsx';
// import Loading from "../../components/Loading.jsx";

// export default function Message() {
//   const { loading } = useGetMessage(); // fetches once, fills Zustand
//   const { messages } = useConversation(); // Zustand read
//   useGetSocketMessage(); // live update

//   const lastMessageRef = useRef();
//   useEffect(() => {
//     setTimeout(() => {
//       if (lastMessageRef.current) {
//         lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
//       }
//     }, 100);
//   }, [messages]);

//   return (
//     <>
//       {loading ? (
//         <Loading />
//       ) : Array.isArray(messages) && messages.length > 0 ? (
//         messages.map((message, index) => (
//           <div key={message._id} ref={index === messages.length - 1 ? lastMessageRef : null}>
//             <Messages message={message} />
//           </div>
//         ))
//       ) : (
//         <div className="text-center mt-[20%]">Say! Hi</div>
//       )}
//     </>
//   );
// }

// import React, { useEffect, useRef } from 'react';
// import Messages from './Messages';
// import useGetMessage from '../../context/useGetMessage.js';
// import useConversation from '../../statemanage/useConversation.js';
// import useGetSocketMessage from '../../context/useGetSocketMessage.jsx';
// import Loading from '../../components/Loading.jsx';

// export default function Message() {
//   const { messages } = useConversation(); // ✅ Zustand live state
//   const { loading } = useGetMessage(); // only for initial load
//   useGetSocketMessage(); // ✅ listen for real-time

//   const lastMessageRef = useRef();

//   useEffect(() => {
//     setTimeout(() => {
//       if (lastMessageRef.current) {
//         lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
//       }
//     }, 100);
//   }, [messages]);

//   return (
//     <>
//       {loading ? (
//         <Loading />
//       ) : messages.length > 0 ? (
//         messages.map((message, index) => (
//           <div
//             key={message._id}
//             ref={index === messages.length - 1 ? lastMessageRef : null}
//           >
//             <Messages message={message} />
//           </div>
//         ))
//       ) : (
//         <div className="text-center mt-[20%]">Say! Hi</div>
//       )}
//     </>
//   );
// }
