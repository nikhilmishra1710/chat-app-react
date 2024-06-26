import { IoSearchSharp, IoAddCircle, IoLogOut } from "react-icons/io5";
import { useAuthContext } from "../../context/AuthContext";
import { useState } from "react";

const SearchInput = ({convo,handleSetConvo}) => {
    const { authUser,setAuthUser } = useAuthContext();
    const [addNewUser, setAddNewUser] = useState(false);
    const [newUser,setNewUser] = useState("");

    const handleLogout = () => {
        localStorage.removeItem("user-token");
        setAuthUser(null);
    };

    const showAddNewConversation = () => {
        setAddNewUser(true);
    };

    const handleAddNewConversation = async() => {
        try{
            const response = await fetch("http://localhost:3000/api/users/addContact",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authUser.token}`
                },
                body: JSON.stringify({username: newUser})
            });
            const data = await response.json();
            console.log(data);
            handleSetConvo([...convo,data.conversation]);
            setNewUser("");
        
        }catch(error){
            console.log("Error in handleAddNewConversation",error);
        }
    };


    return (
        <div>
            <div className="flex items-center gap-2">
                <input type="text" placeholder="Search…" className="input input-bordered rounded-full" />
                <button type="submit" className="btn btn-circle bg-sky-500 text-white">
                    <IoSearchSharp className="w-6 h-6 outline-none" />
                </button>
                <div className="flex flex-row gap-1">
                    {!addNewUser && (

                    <button onClick={showAddNewConversation} type="submit" className="btn btn-circle bg-sky-500 text-white">
                        <IoAddCircle className="w-6 h-6 outline-none" />
                    </button>
                    )}
                    <button onClick={handleLogout} type="submit" className="btn btn-circle bg-sky-500 text-white">
                        <IoLogOut className="w-6 h-6 outline-none" />
                    </button>
                </div>
            </div>
            {addNewUser && 
                (
                    <div className="flex items-center gap-2 mt-2">
                        <input type="text" value={newUser}  placeholder="Enter username…" onInput={(e)=>setNewUser(e.target.value)} className="input input-bordered rounded-full" />
                        <button type="submit" onClick={handleAddNewConversation} className="btn btn-circle bg-sky-500 text-white">
                            <IoAddCircle className="w-6 h-6 outline-none" />
                        </button>
                    </div>
                )
            }
        </div>
    );
};
export default SearchInput;
