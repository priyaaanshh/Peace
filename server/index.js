import Express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import questionsRoutes from "./routes/questions.js";
import chatRoutes from "./routes/chat.js";
import notesRoutes from "./routes/notes.js";

import { errorHandler } from "./utils/errorHandler.js";
import { ConnectDB } from "./utils/mongoDB.js";

dotenv.config();
const app = Express();

ConnectDB();


const users = [{}];

// middleware
app.use(cors());
app.use(cookieParser());
app.use(Express.json());

app.use('/', (req, res) => {
    res.send("Hello");
});
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/questions', questionsRoutes);
app.use('/api/v1/chat', chatRoutes);
app.use('/api/v1/notes', notesRoutes);

app.use(errorHandler);

const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on('leaveRoom', (roomId) => {
        socket.leave(roomId);
        console.log(`User with ID: ${socket.id} left room: ${roomId}`);
    });


    socket.on('send_message', (data) => {
        console.log(`Msg sent from ${data.author}`)
        io.to(data.room).emit('receive_message', data);
    });

    socket.on('disconnect', () => {
        console.log(`${users[socket.id]} left`);
    });
});


server.listen(process.env.PORT, () => {
    console.log('Connected to Backend on PORT: ', process.env.PORT);
});