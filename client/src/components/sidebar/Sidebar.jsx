import { useEffect, useState } from "react";
import Conversations from "./Conversations";
import SearchBar from "./SearchBar";
import { useSocketContext } from "../../context/SocketContext";

const Sidebar = ({handleSelectContact}) => {

    const [conversation,setConversation]=useState([]);
	const {socket}=useSocketContext();

    const handleSetConvo=(convo)=>{
        setConversation(convo);
    }

    useEffect(() => {
		socket?.on("new-conversation", (data) => {
            console.log("new-conversation",data);
            setConversation([...conversation,data.conversation]);
        });
	}
	, [socket,conversation,setConversation]);
    return (
        <div className="border-r border-slate-500 p-4 flex flex-col">
            
            <SearchBar handleSetConvo={handleSetConvo} convo={conversation} />
            <div className="divider px-3"></div>
            <Conversations convo={conversation} handleSelectContact={handleSelectContact}/>
        </div>
    );
};
export default Sidebar;
