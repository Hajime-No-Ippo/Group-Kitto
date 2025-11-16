import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import styles from "../style/chat.module.css";
import user from "../Data/user.js";  
import { useNavigate } from "react-router-dom";


export function Chatbox() {
  const socketRef = useRef(null);
  const messageContainer = useRef(null);
  const messageInput = useRef(null);
  const navigate = useNavigate();
  const currentUser = user[0].username; // Simulated logged-in user

  const location = useLocation();
  const seller = location.state?.seller || "Seller";
  //console.log("Chatting with seller:", seller);

  const appendMessage = (text, type = "") => {
    const el = document.createElement("div");
    // Tailwind bubble styling
  el.className =  
  type === "self"
    ? "bg-blue-500 text-white px-3 py-2 rounded-lg max-w-xs ml-auto animate-slide-left"
    : "bg-gray-200 text-gray-900 px-3 py-2 rounded-lg max-w-xs mr-auto animate-slide-right";
    el.textContent = text;
    messageContainer.current.appendChild(el);
    messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
  };

  useEffect(() => {
  // prevent multiple socket connections
  if (socketRef.current) return;

  const SERVER_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://grateful-francene-maynoothuniversity-7d5783cc.koyeb.app";

  const socket = io(SERVER_URL, { withCredentials: true });
  socketRef.current = socket;

    socket.on("connect", () => {
    socketRef.current.id = socket.id;
    console.log("My socket ID:", socket.id);
  });

  {/*const name =
    prompt("Enter your name:") || `User#${Math.floor(Math.random() * 1000)}`;*/}

  const name = currentUser || `User#${Math.floor(Math.random() * 1000)}`;

  // 🧩 Prevent duplicate join message
  const hasJoinedRef = { current: false };
  if (!hasJoinedRef.current) {
    appendMessage("You joined the chat", styles.system);
    hasJoinedRef.current = true;
  }

  socket.emit("new-user", name);

socket.on("chat-message", (data) => {
  const myId = socketRef.current.id;
  console.log("myId =", myId, " senderId =", data.senderId);  

  if (data.senderId === myId) {
    appendMessage(`You: ${data.message}`, "self");
  } else {
    appendMessage(`${data.name}: ${data.message}`, "incoming");
  }
});
  
  socket.on("user-connected", (user) => {
    if (user !== name) appendMessage(`${user} joined the chat`, styles.system);
  });

  socket.on("user-disconnected", (user) => {
    appendMessage(`${user} left the chat`, styles.system);
  });

  return () => {
    socket.disconnect();
    socketRef.current = null;
  };
}, []);


  // ✅ Safe send handler
  const sendMessage = (e) => {
    e.preventDefault();
    const message = messageInput.current?.value.trim();
    const socket = socketRef.current;
    if (!message || !socket) return;

    socket.emit("send-chat-message", message);
    messageInput.current.value = "";
  };

  return (
  <div className="flex w-full h-screen bg-gray-100">
    <div className="w-full h-full bg-white rounded-2xl flex flex-col overflow-hidden">


      {/* Header */}
      <header className="flex border-b px-6 py-4 bg-gray-50 rounded-t-2xl">
        <button
        className="btn btn-outline-secondary mt-2 mb-4 translate-y-[-10px]"
        onClick={() => navigate("/home")}
      >
        ← Back
      </button>
        <h2 className="text-2xl font-semibold translate-x-[10px]">{seller}</h2>

      </header>
       <div className="flex flex-col flex-1 overflow-y-auto">
      {/* Messages */}
      <div
        ref={messageContainer}
        className="flex flex-col w-full overflow-y-auto p-4 space-y-3 gap-3"
      ></div>
      </div>

      {/* Footer Input */}
      <footer className="border-t p-4 bg-gray-50 sticky bottom-0 left-0 z-50">
        <form
          onSubmit={sendMessage}
          className="flex items-center gap-3"
        >
          <input
            ref={messageInput}
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="px-5 py-2 bg-black text-white rounded-lg 
                       hover:bg-gray-800 transition"
          >
            Send
          </button>
        </form>
      </footer>

    </div>
  </div>
);
}
