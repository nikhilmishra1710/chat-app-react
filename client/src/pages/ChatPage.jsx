import React, { useEffect, useState } from "react";

const Chat = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [conversation, setConversation] = useState([]);
    const [getConversation, setGetConversation] = useState(false);
    const [activeContact, setActiveContact] = useState(null);
    useEffect(() => {
        document.title = "Chat";
        const fetchContacts = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const response = await fetch("http://localhost:3000/api/users/contacts", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    console.log(data);
                    setContacts(data.contacts);
                    setLoading(false);
                } else {
                    window.location.href = "/login";
                }
            } catch (error) {
                console.error("Error fetching contacts:", error);
                setLoading(false);
            }
        };
        fetchContacts();
    }, []);

    const sendMessage = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const response = await fetch(`http://localhost:3000/api/messages/sendmessage/${activeContact}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ message: "Hello 6.0" }),
                });
                const data = await response.json();
                console.log(data);
                setGetConversation(false);
                updateActiveUser(activeContact);
            } else {
                window.location.href = "/login";
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const updateActiveUser = async (id) => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                console.log("token", token);
                const response = await fetch(`http://localhost:3000/api/messages/getmessage/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                console.log(data);
                setActiveContact(id);
                setConversation(data.conversation);
                setGetConversation(true);
            } else {
                window.location.href = "/login";
            }
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    return (
        <div className="w-screen h-screen p-5 flex flex-col justify-center items-center bg-gradient-to-l from-yellow-400 to-lime-500">
            <div>Chat</div>
            <div className="flex flex-row justify-center items-center w-screen bg-blue-500 h-full">
                <div className="flex flex-col justify-center items-center w-1/4 bg-blue-500 h-full">
                    {loading ? (
                        <div>Loading...</div>
                    ) : contacts.length > 0 ? (
                        contacts.map((contact, index) => (
                            <div key={index} className="text-white flex gap-1 justify-center items-center">
                                <img src={contact.profilePicture} className=" w-5 h-5 rounded-full" alt="profile" />
                                <button onClick={() => updateActiveUser(contact._id)}>{contact.name}</button>
                            </div>
                        ))
                    ) : (
                        <div className="text-red">No contacts found</div>
                    )}
                </div>
                <div className="flex flex-col justify-center items-center w-3/4 bg-red-500 h-full p-5">
                    {activeContact ? (
                        <div className=" w-full">
                            <div>
                                {getConversation ? (
                                    conversation?.map((message) => (
                                        <div key={message._id} className={message.receiverId==activeContact?"text-white bg-blue-950 w-full text-right":"text-white bg-blue-950 w-full text-left"}>
                                            {message.message} sentAt: {message.updatedAt}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-red">Getting messages :{")"}</div>
                                )}
                            </div>
                            <div>
                                <input type="text" />
                                <button onClick={sendMessage}>Send</button>
                            </div>
                        </div>
                    ) : (
                        <div>Click on your contact to get Started</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chat;
