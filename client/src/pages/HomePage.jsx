import { useEffect, useState } from "react";
import MessageContainer from "../components/messages/MessageContainer";
import Sidebar from "../components/sidebar/Sidebar";

const Home = () => {

    const [selectedContact, setSelectedContact] = useState(null);

    const handleSelectContact = (contact) => {
        setSelectedContact(contact);
		console.log(contact)
    };

	return (
		<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<Sidebar handleSelectContact={handleSelectContact}/>
			<MessageContainer selectedContact={selectedContact} />
		</div>
	);
};
export default Home;