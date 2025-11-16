import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, "../../dist")));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../../dist/index.html"));
});

const PORT = process.env.PORT || 3000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

const io = new Server(server, {
  cors: {
    origin: [CLIENT_ORIGIN, "http://127.0.0.1:5173"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

const users = {};

io.on("connection", (socket) => {
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });

  socket.on("send-chat-message", (message) => {
    const sender = users[socket.id];
    io.emit("chat-message", { senderId: socket.id, name: sender, message }); // 👈 everyone gets the same message once
  });

  socket.on("disconnect", () => {
    const name = users[socket.id];
    if (name) io.emit("user-disconnected", name);
    delete users[socket.id];
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
