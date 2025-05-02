import React, { useState ,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {createSocketConnection} from '../utils/socket';
import { useSelector } from 'react-redux';

const Chat = () => {
  const {targetUserId} = useParams();
  const user = useSelector((state) => state.user);
  const userId = user?._id;
  const firstName = user?.firstName;
  const [currentTime,setCurrentTime] = useState("");

  if (!userId) {
    return <div>Please log in to view this page. </div>
  }

  const [messages,setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const socket = createSocketConnection();
    const now = new Date();

    const formattedTime = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // use true for 12-hour format with AM/PM
    });
    setCurrentTime(formattedTime);

    // As soon as the page loads, we join the chat sokcet is created and joinchat event is emitted.
    socket.emit("joinChat",{userId,targetUserId});

    // listen for incoming messages
    socket.on("receiveMessage",({firstName,text}) => {
      console.log(firstName + ": " + text)
      setMessages((messages) => [...messages,{firstName,text}]);
    })
  

    // keep the socket disconnected when the component unmounts.
    return () => {
      socket.disconnect();
    };
  },[targetUserId])

 


  

  const sendMessage = () => {
    const socket = createSocketConnection();

    socket.emit("sendMessage",{
      firstName,
      userId,
      targetUserId,
      text: newMessage
    });
  }

  return (
    <div className="container mx-auto p-10 mb-10">
    <h1 className="text-center rounded-md p-4 bg-slate-600 text-white font-semibold">Messages of  {user.firstName}</h1>

    <div className="flex flex-col h-[60vh] border rounded-lg overflow-y-auto mb-4">
    {/* Message Area */}
    <div className="flex flex-col space-y-2 p-4">
      {/* User 1 Message */}
      <div className="flex justify-start">
        <div className="chat chat-start">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src={user?.photoUrl}
      />
    </div>
  </div>
  <div className="chat-header">
    {firstName}
    <h1>Chat with userId: {targetUserId}</h1>
    <time className="text-xs opacity-50 p-1">{currentTime}</time>
  </div>
  <div className="chat-bubble">You were the Chosen One!</div>
  <div className="chat-footer opacity-50">Delivered</div>
</div>
    
      </div>

      {/* User 2 Message */}
      <div className="flex justify-end">
        <div className=" rounded-lg p-2 max-w-[70%]">
          {messages.map((msg,index) => {
            return (
              <div className="chat chat-end">
          <div className="chat-image avatar">
          <div className="w-10 rounded-full">
           <img
             alt="Tailwind CSS chat bubble component"
             src={user?.photoUrl}
           />
        </div>
      </div>
       <div className="chat-header">
           {firstName}
          <time className="text-xs opacity-50">{currentTime}</time>
        </div>
      <div className="chat-bubble">{msg.text}</div>
          <div className="chat-footer opacity-50">Seen at 12:46</div>
        </div>
            )
            // return  <p key={index} className="text-sm font-medium text-gray-700">{msg.text}</p>
          })}
        </div>
      </div>
    </div>
    </div>

  {/* Input Area */}
    <div className="flex">
    <input
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
      type="text"
      placeholder="Type your message..."
      className="flex-grow border rounded-l-lg p-2 focus:outline-none"
    />
    <button onClick={sendMessage} className="bg-blue-500 text-white rounded-r-lg p-2 px-4 font-semibold">
      Send
    </button>
    </div>
    </div>
  )
}

export default Chat