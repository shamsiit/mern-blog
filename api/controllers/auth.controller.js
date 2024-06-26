import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === ''){
        next(errorHandler(400, 'All fields are required!'));
    }

    const hashedPasword = bcryptjs.hashSync(password, 10);

    const newUSer = new User({
        username,
        email,
        password: hashedPasword

    });

    try {
        await newUSer.save();
        res.json('Signup successful');
    } catch (error) {
        next(error);
    }

   
};