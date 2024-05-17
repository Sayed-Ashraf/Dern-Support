import users from "../models/User.js";
import bcrypt from 'bcryptjs'

class adminsController {
    static getAdmins = async(req, res) =>{
        if(req.role !== "admin"){
            return res.status(403).json({ error: "Unauthorized - Admin access required" });
        }
        try{
            const admins = await users.findAll({where: {role: "admin"}});
            res.status(200).json({ admins });
        }
        catch(err){
            console.log("Error fetching admins" + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    static addAdmin = async(req, res) => {
        if(req.role !== "admin"){
            return res.status(403).json({ error: "Unauthorized - Admin access required" });
        }
        const {username, email, password} = req.body;
        if (!(username && email && password)) {
            return res.status(401).json({ error: "Missing input fields" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        try{
            const admin = await users.create({username, email, password: hashedPassword, role: "admin"});
            res.json("admin created successfully");
        }
        catch(err){
            console.log("Error adding admin" + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    static showAdmin = async(req, res) => {
        if(req.role !== "admin"){
            return res.status(403).json({ error: "Unauthorized - Admin access required" });
        }
        try{
            const id = req.params.id;
            const admin = await users.findOne({ id: id, role: "admin" });
            res.status(200).json(admin);
        }
        catch(err){
            console.log("Error adding admin" + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    static updateAdmin = async(req, res) => {
        if(req.role !== "admin"){
            return res.status(403).json({ error: "Unauthorized - Admin access required" });
        }
        const {username, email, password} = req.body;
        if (!(username && email && password)) {
            return res.status(401).json({ error: "Missing input fields" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        try{
            const {id} = req.params;
            const admin = await users.findOne({where: {role: "admin", id: id}});
            admin.update({username: username, email: email, password: hashedPassword});
            admin.save();
            res.json("admin updated successfully");
        }
        catch(err){
            console.log("Error updating admin" + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } 
    static deleteAdmin = async(req, res) => {
        if(req.role !== "admin"){
            return res.status(403).json({ error: "Unauthorized - Admin access required" });
        }
        try{
            const id = req.params.id;
            const admin = await users.findOne({where: {role: "admin", id: id}});
            admin.destroy();
            admin.save();
            res.json("admin deleted successfully");
        }
        catch(err){
            console.log("Error updating admin" + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export default adminsController