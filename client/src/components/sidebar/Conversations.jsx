import { useEffect, useState } from "react";
import Conversation from "./Conversation";
import { useAuthContext } from './../../context/AuthContext';

const Conversations = ({handleSelectContact,convo}) => {

    const [conversations, setConversations] = useState(convo);
    const {authUser}=useAuthContext();
    const [loading,setLoading]=useState(false);


    useEffect(() => {
        const getContacts = async () => {
            try {
                console.log("auth: ",authUser.token);
                const res = await fetch("http://localhost:3000/api/users/contacts",{
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${authUser.token}`,
                    },
                });
                const data = await res.json();
                console.log("data", data);
                setConversations(data.conversations);
            } catch (error) {
                console.log(error);
            }
        };
        setLoading(true);
        getContacts();
        setLoading(false);
    },[])

    const handleDeleteConversation=async(conversationId)=>{
        try{
            console.log("Delete initiated:",conversationId)
            const res = await fetch(`http://localhost:3000/api/users/deleteConversation/${conversationId}`,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authUser.token}`,
                },
            });
            const data = await res.json();
            console.log("data", data);
            setConversations(data.conversations);
        }catch(error){
            console.log(error);
        }
    }

    return (
        loading ? <div>Loading...</div> :
        <div className="py-2 flex flex-col overflow-auto">
            {conversations?.map((contact) => (
                <Conversation key={contact._id} handleDeleteConversation={handleDeleteConversation}  contact={contact} handleSelectContact={handleSelectContact}/>
            
            ))}
        </div>
    );
};
export default Conversations;
