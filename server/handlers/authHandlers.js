const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const generateAccessToken = require("../utils/generateTokens");

const signup = async (req, res) => {
    try {
        const { username, name, email, password, gender } = req.body;

        console.log("username", username, "name", name, "email", email, "password", password);
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(404).json({ error: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        console.log("salt", salt);
        const hashedPassword = await bcrypt.hash(password, salt);
        const profilePic = gender === "male" ? `https://avatar.iran.liara.run/public/boy?username=${username}` : `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            name: name,
            username: username,
            email: email,
            password: hashedPassword,
            profilePicture: profilePic,
        });

        newUser.save();

        res.status(200).json({ message: "User created successfully" });
    } catch (error) {
        console.log("", error);
    }
};

const login = async (req, res) => {
    try {
        console.log("Login");
        const { username, password } = req.body;
        console.log("Username: ", username, "Password: ", password);
        const user = await User.findOne({
            username,
        });

        if (!user) {
            return res.status(404).json({ error: "User does not exist" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        console.log("validPassword", validPassword);
        if (!validPassword) {
            return res.status(404).json({ error: "Invalid password" });
        }

        const token = await generateAccessToken(user._id);

        res.status(200).json({
            _id: user._id,
            username: user.username,
            name: user.name,
            profilePicture: user.profilePicture,
            token: token,
        });
    } catch (error) {
        console.log("", error);
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("access-token");
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.log("", error);
    }
};

const checkAuth = async (req, res) => {
    try {
        console.log("Checking authentication");
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log("Decoded", decoded);
        if (!decoded) res.status(401).json({ error: "Unauthorized" });
        res.status(200).json({ messsage: "Exisiting login found!!" });
    } catch (error) {
        console.log("", error);
        res.status(401).json({ error: "Unauthorized" });
    }
};

module.exports = { signup, login, logout, checkAuth };
