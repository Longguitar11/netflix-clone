import jwt from "jsonwebtoken"
import { JWT_SECRET, NODE_ENV } from "../config/env.js"

export const generateTokenAndSetCookie = async (userId, res) => {
    const token = jwt.sign({ userId }, JWT_SECRET, {expiresIn: '15d'});

    res.cookie('token', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in miliseconds
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks, make it not be accessed by JS
        secure: NODE_ENV === 'production', // only send cookie in production mode
        sameSite: 'strict' // CSRF attacks cross-site request forgery attacks
    })

    return token;
}