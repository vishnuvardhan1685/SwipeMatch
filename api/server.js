import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import path from 'path';

import connectDB from './config/db.js';
// routes
import authRoutes from './routes/authRoutes.js';
import matchRoutes from './routes/matchRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { initializeSocket } from './socket/socket.server.js';
dotenv.config();

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

initializeSocket(httpServer);
app.use(express.json({limit: '10mb'}));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
}));

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/matches",matchRoutes)
app.use("/api/messages",messageRoutes)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
    app.get("/*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
    })
}
httpServer.listen(PORT,() => {
    console.log(`Server started at this ${PORT}`);
    connectDB();
});

