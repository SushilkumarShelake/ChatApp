import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors"
import userRoute from "./routes/user.route.js"
import User from "./models/user.model.js"; // ✅ Import the User model
import messageRoute from "./routes/message.route.js"
import {app, server} from "./SocketIo/server.js"




dotenv.config();

// const app = express();
dotenv.config();
app.use(express.json())
app.use(cookieParser())



app.use(cors({
  origin: "http://localhost:4010",  // <-- Your frontend port (match it exactly)
  credentials: true                 // <-- Allow sending cookies
}));

const PORT=5000
const URI=process.env.MONGODB_URI

try {
    mongoose.connect(URI);
    console.log("MongoDB connected");
    await User.deleteMany({
      _id: {
        $in: [
          "686a5eb78cb518c85e1bd5ea",
          "686a606a20adeeb990e8fb6c",
          "686a60d71c79711261288e7a",
          "686aa793ce3c05badd6f554b"
        ]
      }
    });
    console.log("🗑️ Deleted 4 users");
    
} catch (error) {
    console.log(error)
    
}
app.use("/api/user", userRoute)
app.use("/api/message",messageRoute)


server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

// index.js
// import express from "express"
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import userRoute from "./routes/user.route.js";
// import messageRoute from "./routes/message.route.js";
// import { app, server } from "./SocketIo/server.js";
// import User from "./models/user.model.js";


// dotenv.config();

// app.use(express.json());
// app.use(cookieParser());

// app.use(
//   cors({
//     origin: "http://localhost:4006",
//     credentials: true,
//   })
// );

// const PORT = 5000;
// const URI = process.env.MONGODB_URI;

// try {
//   await mongoose.connect(URI);
//   console.log("✅ MongoDB connected");

//   // Optional: Only for seeding/testing
//   await User.deleteMany({
//     _id: {
//       $in: [
//         "686a5eb78cb518c85e1bd5ea",
//         "686a606a20adeeb990e8fb6c",
//         "686a60d71c79711261288e7a",
//         "686aa793ce3c05badd6f554b",
//       ],
//     },
//   });
//   console.log("🗑️ Deleted 4 test users");
// } catch (error) {
//   console.error("❌ MongoDB connection error:", error);
// }

// app.use("/api/user", userRoute);
// app.use("/api/message", messageRoute);

// server.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });
