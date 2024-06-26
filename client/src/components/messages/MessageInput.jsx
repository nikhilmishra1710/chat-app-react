import { useState } from "react";
import { BsSend } from "react-icons/bs";
import { useAuthContext } from "../../context/AuthContext";

const MessageInput = ({selectedConversation,handleSetMessages}) => {

    const [messageInput, setMessageInput] = useState("");
    const { authUser } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const convoId=selectedConversation.id;
    const handleSendMessage = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:3000/api/messages/sendmessage/${convoId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authUser.token}`,
                },
                body: JSON.stringify({
                    message: messageInput,
                    receiverId: selectedConversation.userId,
                }),
            });
            const data = await res.json();
            console.log("data from message input:", data.conversation);
            handleSetMessages(data.conversation);
            setMessageInput("");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className="px-4 my-3">
            <div className="w-full flex relative">
                <input type="text" value={messageInput} onInput={(e)=>{setMessageInput(e.target.value)}} className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white" placeholder="Send a message" />
                <button type="submit" onClick={(e)=>{handleSendMessage(e)}} className="absolute inset-y-0 end-0 flex items-center pe-3">
                    <BsSend />
                </button>
            </div>
        </form>
    );
};
export default MessageInput;
