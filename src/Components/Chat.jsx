import React, { useState ,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {createSocketConnection} from '../utils/socket';
import { useSelector } from 'react-redux';

const Chat = () => {
  const {targetUserId} = useParams();
  const user = useSelector((state) => state.user);
  const userId = user?._id;
  const firstName = user?.firstName;
  if (!userId) {
    return <div>Please log in to view this page. </div>
  }

  const [messages,setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const socket = createSocketConnection();

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
        <div className="bg-blue-200 rounded-lg p-2 max-w-[70%]">
          <p className="text-sm">Hello there! How are you doing today?</p>
        </div>
      </div>

      {/* User 2 Message */}
      <div className="flex justify-end">
        <div className="bg-gray-200 rounded-lg p-2 max-w-[70%]">
          {messages.map((msg,index) => {
            return  <p key={index} className="text-sm font-medium text-gray-700">{msg.text}</p>
          })}
        </div>
      </div>

      {/* User 1 Message */}
      <div className="flex justify-start">
        <div className="bg-blue-200 rounded-lg p-2 max-w-[70%]">
          <p className="text-sm font-medium text-black">I'm also doing well. Just wanted to chat.</p>
        </div>
      </div>

      {/* more messages can be added here */}
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