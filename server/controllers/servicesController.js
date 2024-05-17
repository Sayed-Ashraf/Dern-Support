import services from "../models/Service.js";



class servicesController {
    static getServices = async (req, res) => {
        try{
            const allServices = await services.findAll();
            res.status(200).json(allServices)
        }
        catch(err){
            console.log("Error in getting services", err)
            res.status(500).json({message: "internal server error"});
        }
    }
    static showService = async(req, res) =>{
        if(req.role !== 'admin'){
            return res.status(403).json({ error: "Unauthorized - Admin access required" });
        }  
        try{
            const id = req.params.id;
            const service = await services.findOne({id:id});
            res.status(200).json({service: service});
        }
        catch(err){
            console.log("Error in showing service", err)
            res.status(500).json({message: "internal server error"});
        }
    }
    static addServices = async(req, res) => {
        if(req.role !== 'admin'){
            return res.status(403).json({ error: "Unauthorized - Admin access required" });
        } 
        const {title, description, category_name} = req.body;
        if(!(title && description && category_name)){
            return res.status(403).json({ error: "Missing input field"});
        }
        try{
            const service = await services.create({title: title, description: description, category_name: category_name});
            res.status(200).json("service added successfully");
        }
        catch(err){
            console.log("Error in adding service", err)
            res.status(500).json({message: "internal server error"});
        }
    }
    static updateService = async (req, res) => {
        if(req.role !== 'admin'){
            return res.status(403).json({ error: "Unauthorized - Admin access required" });
        }
        const {title, description, category_name} = req.body;
        if(!(title && description && category_name)){
            return res.status(500).json("Missing input fields");
        }
        try{
            const id = req.params.id;
            const service = await services.findOne({where: {id: id}});
            service.update({title: title, description: description, category_name});
            service.save();
            res.status(200).json("Service updated successfully");
        }
        catch(err){
            console.log("Error in updating services", err)
            res.status(500).json({message: "internal server error"});
        }
    }
    static deleteService = async(req, res) => {
        if(req.role !== 'admin'){
            return res.status(403).json({ error: "Unauthorized - Admin access required" });
        }
        try{
            const id = req.params.id;
            const service = await services.findOne({where: {id: id}});
            service.destroy();
            service.save();
            res.status(200).json("Service deleted successfully");
        }
        catch(err){
            console.log("Error in deleting services", err)
            res.status(500).json({message: "internal server error"});
        }
    }
}

export default servicesController