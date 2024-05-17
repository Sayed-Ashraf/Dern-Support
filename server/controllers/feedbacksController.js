import feedbacks from "../models/Feedback.js";

class feedbacksController {
    static getFeedbacks = async(req, res) => {
        try{
            const allFeedbacks = await feedbacks.findAll();
            res.status(200).json(allFeedbacks);
        }
        catch(err){
            console.log("Error getting feedbacks" + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    static showFeedback = async(req, res) => {
        try{
            const id = req.params.id;
            const feedback = await feedbacks.findOne({ id: id });
            res.status(200).json(feedback);
        }
        catch(err){
            console.log("Error showing feedback" + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    static addFeedback = async(req, res) => {
        const {description, user_id} = req.body;
        try{
            const feedback = await feedbacks.create({description: description, user_id: user_id});
            res.status(200).send("Feedback added successfully");
        }
        catch(err){
            console.log("Error adding feedbacks" + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    static deleteFeedback = async(req, res) => {
        if(req.role !== "admin"){
            return res.status(403).json({ error: "Unauthorized - Admin access required" });
        }
        try{
            const id = req.params.id;
            const feedback = await feedbacks.findOne({ id: id });
            feedback.destroy();
            feedback.save();
            res.status(200).send("Feedback deleted successfully");
        }
        catch(err){
            console.log("Error deleting feedbacks" + err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export default feedbacksController