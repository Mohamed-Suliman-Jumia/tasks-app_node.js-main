const createError = require("http-errors");
const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/User');
const router = express.Router();

router.post("/register", async (req, res, next) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!(email && password && first_name && last_name)) {
            return next(createError(400, 'All inputs(first_name, last_name, email, password) is required'))
        }
        const oldUser = await UserModel.findOne({ email });
        if (oldUser) {
            return next(createError(409, 'User Already Exist. Please Login'))
        }

        encryptedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });
        return res.status(201).json(user);

    } catch (err) {
        console.log(err);
    }

    return next(createError(500, 'Internal Error'))
});

router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return next(createError(400, 'All input(email, password) is required'))
        }
        const user = await UserModel.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            user.token = token;
            return res.status(200).json(user);
        }
        return res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }

    return next(createError(500, 'Internal Error'))
});


module.exports = router;
