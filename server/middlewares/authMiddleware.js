import jwt from 'jsonwebtoken';
import users from '../models/User.js';

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['x-access-token'];
    if(!authHeader){
        return res.status(401).json({ error: "Unauthorized - Missing authorization header" });
    }
    const token = authHeader;
    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await users.findOne({
            where: { email: decodedToken.email },
            attributes: { exclude: ["password"] },
        });
        if(!user) {
            return res.status(401).json({ error: "Unauthorized - User not found" });
        }
        req.role = user.role;
        next();
    }
    catch(error){
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Unauthorized - Token expired" });
        } else {
            console.error("Error verifying token:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export default authMiddleware