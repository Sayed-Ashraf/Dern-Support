import users from '../models/User.js';
import bcrypt from 'bcryptjs';

class usersController {
    static getUsers = async(req, res) => {

        try{
            const allUsers = await users.findAll({ attributes: { exclude: ["password"] } });
            res.status(200).json(allUsers);
        }
        catch(err){
            console.log("Error in getting users", err)
            res.status(500).json({message: "internal server error"});
        }
    }
    static showUser = async(req, res) => {
        try{
            const id = req.params.id;
            const user = await users.findOne({where: {id: id}});
            res.status(200).json(user);
        }
        catch(err){
            console.log("Error in getting the user", err)
            res.status(500).json({message: "internal server error"});
        }
    }
    static addUser = async(req, res) => {
        if(req.role !== "admin"){
            return res.status(403).json({ error: "Unauthorized - Admin access required" });
        }
        const {username, email, password} = req.body;
        if (!(username && email && password)) {
            return res.status(401).json({ error: "Missing input fields" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        try{
            const user = await users.create({username, email, password: hashedPassword, role: "user"});
            res.json("admin created successfully");
        }
        catch(err){
            console.log("Error adding admin" + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    static updateUser = async(req, res) => {
        const {username, email, password} = req.body;
        if(!(username && email && password)){
            return res.status(500).json("Missing input fields")
        }
        try{
            const {id} = req.params;
            const user = await users.findOne({where: {id: id}});;
            user.update({username: username, email: email, password: password});
            user.save();
            res.json("user updated successfully")
        }
        catch(err){
            console.log("Error in updating user", err);
            res.status(500).json({message: "internal server error"});
        }
    }
    static deleteUser = async(req, res) => {
        try{
            const id = req.params.id;
            const user = await users.findOne({where: {id: id}});
            user.destroy(); 
            user.save();
            res.json("user deleted successfully");
        }
        catch(err){
            console.log("Error in deleting user", err);
            res.status(500).json({message: "internal server error"});
        }
    }
}

export default usersController;