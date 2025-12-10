const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./models/User.js");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/user");

// REGISTER
app.post('/register', (req, res) => {
    userModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err));
});

// LOGIN
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    userModel.findOne({ email })
        .then(user => {
            if (!user) return res.json({ error: "User not found" });
            if (user.password !== password) return res.json({ error: "Incorrect password" });
            res.json({ message: "Success", user });
        })
        .catch(err => res.status(500).json(err));
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
