const express = require("express");
const router = express.Router();
const AdminModel = require("../models/admin.models");
const { authMiddleware } = require("../middleware/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup",  async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        console.log(firstName, lastName, email, password);

        const existingUser = await AdminModel.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already exists" });

        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = new AdminModel({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

        res.status(201).json({ message: "Signup successful!", token, user: user });
    }
    catch (err) {
        next(err);
    }
});

router.post("/signin", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(email);
        const user = await AdminModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "User doesn't Exist" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Wrong Password" });
        }
        const payload = {
            id: user._id,
            email: user.email,
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY);
        res.json({ message: "Login successful!!!", token, user }).status(200);
    }
    catch (err) {
        next(err);
    }
});

module.exports = { authRoutes: router };
