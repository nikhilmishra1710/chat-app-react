const User = require("../models/userModel");
const Conversation = require("../models/conversationModel");
const { getRecieverSocketId, io } = require("../socket/socket");

const getContacts = async (req, res) => {
    try {
        const userId = req.user.userId;
        console.log("userId", userId);

        const conversations = await Conversation.find({
            members: userId // Search for conversations where userId is present in the members array
        })
        .populate("members", "username profilePicture")
        .select("members _id updatedAt")
        .sort({ updatedAt: -1 })
        console.log(conversations)
        return res.status(200).json({ conversations: conversations });
    } catch (error) {
        console.log("Error in getContacts handler", error);
        return res.status(401).json({ message: "internal server error" });
    }
};

const addContact = async (req, res) => {
    try {
        const userId = req.user.userId;
        console.log("userId", userId);
        const { username } = req.body;
        console.log("username:",username)
        const user = await User.findById(userId);
        const user2 = await User.findOne({ username: username });
        if (!user2) {
            return res.status(401).json({ message: "user not found" });
        }
        const newConversation = new Conversation({
            members: [user._id, user2._id],
            messages: [],
        });
        await newConversation.save();
        const receiverSocket= getRecieverSocketId(user2._id);
        if(receiverSocket){
            console.log(201)
            io.to(receiverSocket).emit("new-conversation",newConversation);
        }
        return res.status(200).json({ message: "contact added", conversation: newConversation});
    } catch (error) {
        console.log("Error in addContact handlers", error);
        return res.status(401).json({ message: "internal server error" });
    }
};

module.exports = { getContacts, addContact };
