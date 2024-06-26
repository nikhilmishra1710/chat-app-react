const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./db/connectDB");
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const messageRouter = require("./routers/messageRouter");
const { app, io, server } = require("./socket/socket");

require("dotenv").config();

app.use(cookieParser());
app.use(express.json());
app.use(cors())
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);

const PORT = process.env.PORT || 3000;
connectDB();

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
