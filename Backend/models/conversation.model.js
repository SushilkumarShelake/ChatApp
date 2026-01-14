//sender and receiver id store

import mongoose from "mongoose";
import User from "../models/user.model.js"
import Message from "./message.model.js";

const conversationSchema= new mongoose.Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:User,
        },
    ],
    messages:[
        {
             type:mongoose.Schema.Types.ObjectId,
             ref:Message,
             default:[], //for empty message
        }
    ]
    
},{
    timestamps:true
});

const Conversation = mongoose.model("conversation",conversationSchema);
export default Conversation;