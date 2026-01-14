// import { Server } from "socket.io";
// import http from "http";
// import express from "express";

// const app=express();
// const server=http.createServer(app);
// const io=new Server(server,{
//     cors:{
//         origin:"http://localhost:4006/",
//         methods:["GET","POST"]
//     }
// });
// const users={};
// io.on("connection",(socket)=>{
//     console.log("new client connected",socket.id);

//     const userId=socket.handshake.query.userId;
//     if(userId){
//         users[userId]=socket.id;
//         console.log(users);
        
//     }
//     io.emit("getonline",Object.keys(users));
    
//     socket.on("disconnected",()=>{
//         console.log("Client disconnected",socket.id);
//         delete users[userId];
//         io.emit("getonline",Object.keys(users));
        
//     })
// })

// export {app,io,server}

// server.js
// import { Server } from "socket.io";
// import http from "http";
// import express from "express";

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:4006", // frontend port
//     methods: ["GET", "POST"],
//   },
// });

// //real time message

// export const getReceiverSocketId=(receierId)=>{
//     return users[receierId]
// }

// const users = {}; // userId -> socketId

// io.on("connection", (socket) => {
//   console.log("New client connected:", socket.id);

//   const userId = socket.handshake.query.userId;

//   if (userId) {
//     users[userId] = socket.id;

//     // ✅ Emit online user list to everyone
//     io.emit("getonline", Object.keys(users));
//   }

//   socket.on("disconnect", () => {
//     console.log("Client disconnected:", socket.id);

//     // Remove user from users object
//     for (let id in users) {
//       if (users[id] === socket.id) {
//         delete users[id];
//         break;
//       }
//     }

//     // ✅ Emit updated list
//     io.emit("getonline", Object.keys(users));
//   });
// });

// export { app, io, server };

// server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:4006", // frontend origin
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {}; // userId -> socket.id

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // Notify all clients about current online users
  io.emit("getonline", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    if (userId) {
      delete userSocketMap[userId];
    }
    io.emit("getonline", Object.keys(userSocketMap));
  });
});

export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

export { app, server, io };
