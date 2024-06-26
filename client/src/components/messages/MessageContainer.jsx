import { useEffect, useState } from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageContainer = ({ selectedContact}) => {

    const [message,setMessage]=useState([]);

    useEffect(()=>{
        console.log("messages from higher:",message)
    },[message])

    const handleSetMessage=(msg)=>{
        setMessage(msg);
    }

    return (
        <div className="md:min-w-[450px] flex flex-col">
            {selectedContact ? (
                <>
                    <div className="bg-slate-500 px-4 py-2 mb-2">
                        <span className="label-text">To:</span> <span className="text-gray-900 font-bold">{selectedContact.name}</span>
                    </div>

                    <Messages selectedConversation={selectedContact.id} selectedContact={selectedContact} selectedMessage={message} handleSetMessages={handleSetMessage}/>
                    <MessageInput selectedConversation={selectedContact} handleSetMessages={handleSetMessage}/>
                </>
            ) : (
                <>
                    <div className="flex items-center justify-center h-full">
                        <h1 className="text-2xl text-gray-900">Select a contact to start messaging</h1>
                    </div>
                </>
            )}
        </div>
    );
};
export default MessageContainer;
