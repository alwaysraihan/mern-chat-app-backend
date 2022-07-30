const express = require("express");
const chats = require("./data/data");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const colors = require('colors');
const userRoutes = require("./routes/userRoutes");
const app = express();
app.use(cors());
dotenv.config();
connectDB()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// user api 
app.use("/api/user",userRoutes)
app.get("/", (req, res) => {
    res.status(200).send("Everything okay. I am from chat application.");
});

// get all chat
app.get("/api/chat", (req, res) => {
    res.status(200).send(chats);
});

// user api 
app.use("/api/user",userRoutes)


// get chat by id
app.get("/api/chat/:id", (req, res) => {
    const id = req.params.id;
    try {
        const chat = chats.find((c) => c._id === id);
        res.send(chat);
    } catch (error) {
        res.send(error);
    }
});
const PORT = process.env.PORT;
app.listen(PORT, console.log("Server Started on PORT",PORT.blue.bold));
