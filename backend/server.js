const express = require("express");
const chats = require("./data/data");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const colors = require('colors');
const userRoutes = require("./routes/userRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const app = express();
app.use(cors());
dotenv.config();
connectDB()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Everything okay. I am from chat application.");
});

// user api 
app.use("/api/user",userRoutes)


// get all chat
app.get("/api/chat", (req, res) => {
    res.status(200).send(chats);
});


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

app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT;
app.listen(PORT, console.log("Server Started on PORT",PORT.blue.bold));
