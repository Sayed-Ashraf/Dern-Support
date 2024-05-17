import express from "express";
import usersController from "../controllers/usersController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import authController from "../controllers/authController.js";
import servicesController from "../controllers/servicesController.js";
import adminController from "../controllers/adminsController.js";
import feedbacksController from "../controllers/feedbacksController.js";

const router = express.Router();

// Users Routes
router.get('/users', usersController.getUsers);
router.get('/users/:id', authMiddleware, usersController.showUser);
router.post('/users/add', authMiddleware, usersController.addUser);
router.put('/users/:id/update',  usersController.updateUser);
router.delete('/users/:id/delete', usersController.deleteUser);

// Admin Routes
router.get('/admins', authMiddleware, adminController.getAdmins);
router.get('/admins/:id', authMiddleware, adminController.showAdmin);
router.post('/admins/add', authMiddleware, adminController.addAdmin);
router.put('/admins/:id/update', authMiddleware, adminController.updateAdmin);
router.delete('/admins/:id/delete', authMiddleware, adminController.deleteAdmin);

// Auth Routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Services Routes
router.get('/services',  servicesController.getServices);
router.get('/services/:id', authMiddleware, servicesController.showService);
router.post('/services/add', authMiddleware, servicesController.addServices);
router.put('/services/:id/update', authMiddleware, servicesController.updateService);
router.delete('/services/:id/delete', authMiddleware, servicesController.deleteService);

// Feedbacks Routes
router.get('/feedbacks',  feedbacksController.getFeedbacks); 
router.get('/feedbacks/:id',  feedbacksController.showFeedback); 
router.post('/feedbacks/add', feedbacksController.addFeedback); 
router.delete('/feedbacks/:id/delete', authMiddleware, feedbacksController.deleteFeedback); 

export default router