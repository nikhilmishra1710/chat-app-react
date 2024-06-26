import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import { IoTrash } from "react-icons/io5";

const Conversation = ({ contact, handleSelectContact, handleDeleteConversation }) => {
    const { authUser } = useAuthContext();
    const conversationId = contact._id;
    const conversationDetails = contact.members.filter((member) => {
        console.log("member", member._id, authUser._id);
        if (member._id !== authUser._id) return member;
    })[0];
    const userId = conversationDetails._id;
    const displayName = conversationDetails.username;
    const picture = conversationDetails.profilePicture;
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.find((user) => user === userId);

    return (
        <div onClick={() => handleSelectContact({ id: conversationId, name: displayName, pic: picture, userId: userId })}>
            <div className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer">
                <div className={isOnline ? "avatar online" : "avatar"}>
                    <div className="w-12 rounded-full">
                        <img src={conversationDetails.profilePicture} alt="user avatar" />
                    </div>
                </div>

                <div className="flex flex-col flex-1">
                    <div className="flex gap-3 justify-between">
                        <p className="font-bold text-gray-200">{displayName}</p>
                        <span className="text-xl">
                            <IoTrash onClick={handleDeleteConversation(conversationId)} className="w-6 h-6"></IoTrash>
                        </span>
                    </div>
                </div>
            </div>

            <div className="divider my-0 py-0 h-1" />
        </div>
    );
};
export default Conversation;
