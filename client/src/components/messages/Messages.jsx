import Message from "./Message";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { useSocketContext } from "../../context/SocketContext";
import notificationSound from "../../assets/notification_sound.mp3";

const Messages = ({ selectedConversation, selectedContact, selectedMessage, handleSetMessages}) => {
    const [messages, setMessages] = useState([]);
    const { authUser } = useAuthContext();
    const lastMessageRef = useRef();

    useEffect(() => {
        setMessages(selectedMessage);
    }, [selectedMessage, selectedConversation]);
    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);
    const [loading, setLoading] = useState(false);
    const { socket } = useSocketContext();
    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/messages/getmessage/${selectedConversation}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authUser.token}`,
                    },
                });
                const data = await res.json();
                handleSetMessages(data.conversation);
                setMessages(data.conversation);
                console.log("messages: ", messages);
            } catch (error) {
                console.log(error);
            }
        };
        setLoading(true);
        getMessages();
        setLoading(false);
    }, [authUser, selectedConversation]);

    useEffect(() => {
        socket?.on("message", (msg) => {
            console.log("message from socket:", msg);
            handleSetMessages(msg);
            setMessages(msg);
            const notif = new Audio(notificationSound);
            notif.play();
        });

        return () => socket?.off("message");
    }, [socket, setMessages, messages]);

    return (
        <div className="px-4 flex-1 overflow-auto">
            {loading ? (
                <div>Loading...</div>
            ) : (
                messages?.map((message) => (
                    <div key={message._id} ref={lastMessageRef}>
                        <Message key={message._id} message={message} receiverPicture={selectedContact.pic} />
                    </div>
                ))
            )}
        </div>
    );
};
export default Messages;
