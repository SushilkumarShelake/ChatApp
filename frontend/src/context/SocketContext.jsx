
// import { createContext,useEffect, useState } from "react";
// import { useAuth } from "./AuthProvider.js";
// import io from "socket.io-client"

// const SocketContext=createContext();

// export const socketProvider=({children})={
//     const [socket,setSocket]=useState(null);
//     const {authUser}=useAuth();

//     useEffect(()=>{
//         if(authUser){
//            const socket=io("http://localhost:4006/",{
//             query:{
//                 userId:authUser.user._id
//             }});
//         }
//         setSocket(socket)
//     },[authUser])
//      return(
//         <socketContext.Provider value={{socket}}>
//             {children}
//         </socketContext.Provider>
//      );
// };


// socketContext.js
import { createContext, useEffect, useState, useContext } from "react";
import { useAuth } from "./AuthProvider.jsx";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const { authUser } = useAuth();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]); // ❌ FIXED: was [] instead of useState([])

  useEffect(() => {
    if (authUser) {
      const newSocket = io("http://localhost:5000", {
        query: {
          userId: authUser.user._id,
        },
        transports: ["websocket"],
      });

      setSocket(newSocket);

    //   newSocket.on("getonline", (users) => {
    //     setOnlineUsers(users);
    //   });
      newSocket.on("getonline", (users) => {
  setOnlineUsers(users);
});

      return () => {
        newSocket.close();
      };
    } else {
      // If user logs out
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};


// export const useSocket = () => useContext(SocketContext);

