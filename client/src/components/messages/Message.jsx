import React from "react";
import { useAuthContext } from "../../context/AuthContext";

const Message = ({message,receiverPicture}) => {
    const { authUser } = useAuthContext();
    const formattedTime = new Date(message.createdAt).toLocaleTimeString();
    const messageBg = message.senderId === authUser._id ? "bg-blue-500" : "bg-gray-500";
    const messageAlign = message.senderId === authUser._id ? "chat-start" : "chat-end";
    const image = message.senderId === authUser._id ? authUser.profilePicture : receiverPicture;
    return (
        <div className={`chat ${messageAlign}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" src={image} />
                </div>
            </div>
            <div className={`chat-bubble text-white ${messageBg} pb-2`}>{message.message}</div>
            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{formattedTime}</div>
        </div>
    );
};

export default Message;
