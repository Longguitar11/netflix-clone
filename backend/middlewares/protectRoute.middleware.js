import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import { User } from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        
        const token = req.cookies["token"];
        
        if(!token) return res.status(401).json({ success: false, error: "Unauthorized - No token provided" });

        const decoded = jwt.verify(token, JWT_SECRET);

        console.log("decoded", decoded);

        if(!decoded) return res.status(401).json({ success: false, error: "Unauthorized - Invalid token" });

        const user = await User.findById(decoded.userId);

        if(!user) return res.status(404).json({ success: false, error: "User not found" });

        req.user = user;
        next();
    } catch (error) {
        console.log("Fail to protect route", error.message);
        res.status(500).json({ success: false, error: "Internal server error" });        
    }


}