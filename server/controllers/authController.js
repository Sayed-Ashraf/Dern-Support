import users from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

class authController{
    static register = async(req, res) => {
        const {username, email, password} = req.body;
        if (!(username && email && password)) {
            return res.status(401).json({ error: "Missing input fields" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        try{
            const user = await users.create({username: username, email: email, password: hashedPassword});
            // const token = jwt.sign({id: user.id, name, email: user.email, password: hashedPassword, inTeam: user.inteam, currentTeamId: user.currentTeamId,}, process.env.JWT_SECRET_KEY, {expiresIn: "30d",});
            res.json({msg: "Account Created Successfully"});
        }
        catch(err){
            if (err.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({ error: "Email address already exists" });
              } else {
                console.error("Error creating admin user:", err);
                res.status(500).json({ error: "Internal Server Error" });
              }
        }
    }
    static login = async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Missing email or password" });
        }
        try {
            const user = await users.findOne({ where: { email: email } });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            const matchedPassword = await bcrypt.compare(password, user.password);
            if (!matchedPassword) {
                return res.status(401).json({ error: "Incorrect email or password" });
            }
            const token = jwt.sign(
                {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                },
                process.env.JWT_SECRET_KEY,
            // "JWT_SECRET_KEY",
                {
                    expiresIn: "30d",
                }
            );
            res.status(200).json({
                msg: "Login Successful",
                auth: true,
                token,
            });
        } catch (err) {
            console.error("Error during Login:", err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
}

export default authController