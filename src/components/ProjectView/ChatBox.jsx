import keycloak from "../../keycloak";

const ChatBox = () => {

    return (
        <div>
            {keycloak.authenticated &&
                (<div className="flex flex-col h-64 bg-white border border-gray-300 rounded-md shadow-md p-2 m-7">
                    <div className="flex-grow overflow-auto"></div>
                    <div className="flex items-center">
                        <input type="text" placeholder="Type your message here"
                               className="flex-grow border-none py-2 text-lg"/>
                        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md ml-2">Send</button>
                    </div>
                </div>)}
        </div>

    );
}

export default ChatBox;