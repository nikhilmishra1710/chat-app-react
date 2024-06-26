const Message = require('../models/messageModel');
const  {io} = require('../socket/socket');
const Conversation = require('../models/conversationModel');
const { getRecieverSocketId } = require('../socket/socket');

const getMessages = async (req, res) => {
    try {

        const convId = req.params.receiverId;
        const conversation = await Conversation.findOne({ _id:convId }).populate({
            path: "messages",
            select: "_id message senderId createdAt",
        });
        return res.status(200).json({ conversation: conversation.messages});
    } catch (error) {
        console.log("Error in getMessages handler", error);
        return res.status(401).json({ message: "internal server error" });
    }
}

const sendMessage = async (req, res) => {
    try {
        const userId = req.user.userId;
        const receiverId = req.body.receiverId;
        const convoId=req.params.recieverId;
        console.log("receiverId",receiverId, "userId",userId, "convoId",convoId);
        const  message  = req.body.message;
        const newMessage = new Message({
            senderId: userId,
            receiverId: receiverId,
            message: message,
        });
        newMessage.save();
        const conversation = await Conversation.findOneAndUpdate(
            { _id: convoId }, 
            { $push: { messages: newMessage._id } }, 
            { new: true }
        ).populate({
            path: "messages",
            select: "_id message senderId createdAt",
        });
        console.log("conversation", conversation);
        const socketReceiver=getRecieverSocketId(receiverId)
        if(socketReceiver){
            console.log(101)
            io.to(socketReceiver).emit("message",conversation.messages)
        }
        if (conversation) {
            return res.status(200).json({ message: "message sent", conversation: conversation.messages});
        } else {
            const newConversation = new Conversation({
                members: [userId, receiverId],
                messages: [newMessage._id],
            });
            await newConversation.save();
        }
        await newMessage.save();
        return res.status(200).json({ message: "message sent" });
    } catch (error) {
        console.log("Error in sendMessage handler", error);
        return res.status(401).json({ message: "internal server error" });
    }
}

module.exports = { getMessages, sendMessage };