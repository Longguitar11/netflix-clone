import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from '../utils/generateToken.js';

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if(!username || !email || !password) {
            return res.status(400).json({success: false, error: 'Please fill in all fields'});
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)) {
            return res.status(400).json({success: false, error: 'Invalid email format'});
        }

        if(password.length < 6) {
            return res.status(400).json({success: false, error: 'Password must be at least 6 characters long'});
        }

        const existingUserByUsername = await User.findOne({username});
        if(existingUserByUsername) {
            return res.status(400).json({success: false, error: 'Username already exists'});
        }

        const existingUserByEmail = await User.findOne({email});
        if(existingUserByEmail) {
            return res.status(400).json({success: false, error: 'Email already exists'});
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

		const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        const newUser = new User({
            username,
            email,
            password: passwordHash,
            image
        });

        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();

        res.status(201).json({success: true, message: 'User created successfully', user: {...newUser._doc, password: ''}});

    } catch (error) {
        console.log('Failed to signup:', error.message);
        res.status(500).json({success: false, error: 'Internal server error'});
    }
}

export const signin = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({email});

        if(!user) {
            return res.status(404).json({success: false, error: 'Invalid credentials'});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect) {
            return res.status(400).json({success: false, error: 'Invalid credentials'});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({success: true, message: 'Logged in successfully', user: {...user._doc, password: ''}});
    } catch (error) {
        console.log('Failed to signin:', error.message);
        res.status(500).json({success: false, error: 'Internal server error'});
    }
}

export const logout = async (req, res) => {

    try {
        res.clearCookie('token');
        res.status(200).json({success: true, message: 'Logged out successfully'})
    } catch (error) {
        console.log('Failed to logout:', error.message);
        res.status(500).json({success: false, error: 'Internal server error'});
    }
}

export const authCheck = async (req, res) => {
    try {
        console.log(req.user)
        res.status(200).json({success: true, user: req.user});
    } catch (error) {
        console.log('Failed to check auth:', error.message);
        res.status(500).json({success: false, error: 'Internal server error'});
        
    }
}