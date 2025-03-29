import React from 'react'
import { useParams } from 'react-router-dom'

const Chat = () => {
  const {targetUserId} = useParams();

  return (
    <div className="container mx-auto p-10 mb-10">
    <h1 className="text-center rounded-md p-4 bg-slate-600 text-white font-semibold">Messages</h1>

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
          <p className="text-sm font-medium text-gray-700">I'm doing great, thanks! What about you?</p>
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
      type="text"
      placeholder="Type your message..."
      className="flex-grow border rounded-l-lg p-2 focus:outline-none"
    />
    <button className="bg-blue-500 text-white rounded-r-lg p-2 px-4 font-semibold">
      Send
    </button>
    </div>
    </div>
  )
}

export default Chat