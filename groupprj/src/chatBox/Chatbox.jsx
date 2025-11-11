import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import styles from "./chat.module.css";

export function Chatbox() {
  const socketRef = useRef(null);
  const messageContainer = useRef(null);
  const messageInput = useRef(null);

  const appendMessage = (text, type = "") => {
    const el = document.createElement("div");
    el.className = `${styles.message} ${type}`;
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

  const name =
    prompt("Enter your name:") || `User#${Math.floor(Math.random() * 1000)}`;

  // 🧩 Prevent duplicate join message
  const hasJoinedRef = { current: false };
  if (!hasJoinedRef.current) {
    appendMessage("You joined the chat", styles.system);
    hasJoinedRef.current = true;
  }

  socket.emit("new-user", name);

  socket.on("chat-message", (data) => {
    if (data.name === name) return;
    appendMessage(`${data.name}: ${data.message}`, styles.incoming);
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

    appendMessage(`You: ${message}`, styles.outgoing);
    socket.emit("send-chat-message", message);
    messageInput.current.value = "";
  };

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.chatContainer}>
        <header className={styles.header}>
          <h2>Realtime Chatting Channel</h2>
        </header>

        <div ref={messageContainer} className={styles.messages}></div>

        <footer className={styles.footer}>
          <form onSubmit={sendMessage} className={styles.form}>
            <input
              ref={messageInput}
              type="text"
              placeholder="Type a message..."
              className={styles.input}
            />
            <button type="submit" className={styles.button}>
              Send
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
}
