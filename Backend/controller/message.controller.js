
import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js";
import { getReceiverSocketId,io } from "../SocketIo/server.js";
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    conversation.messages.push(newMessage._id);

    await Promise.all([conversation.save(), newMessage.save()]);

    const receiversocketId=getReceiverSocketId(receiverId);
    if(receiversocketId){
      io.to(receiversocketId).emit("newMessage",newMessage)
    }

    return res.status(201).json({
      message: "Message sent successfully",
      newMessage,
    });

  } catch (error) {
    console.error("Error in sendMessage:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getMessage=async (req,res)=>{
    try {
        const {id:chatuser}=req.params;
    const senderId=req.user._id;
    const conversation=await Conversation.findOne({
        participants:{$all:[senderId,chatuser]},
    }).populate("messages");
    if(!conversation){
        return res.status(201).json({message:"No conversation found"});
    }
    const messages=conversation.messages;
     res.status(201).json({messages})
    } catch (error) {
        console.log("Message getting error" +error);
        res.status(500).json({error:"Internal server error"})
        
    }
}

