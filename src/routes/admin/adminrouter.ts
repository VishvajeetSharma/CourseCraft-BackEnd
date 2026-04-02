import express from 'express';
import { adminLogin, adminRegister, adminUpdatePassword, adminForgetPassword } from '../../controller/admincontroller/adminauthcontroller';
import { 
  createmastercourse, getmastercourse, getmastercoursebyid, updatemastercourse, deletemastercourse, 
  createmasterplan, getmasterplan, getmasterplanbyid, updatemasterplan, deletemasterplan, 
  getUsers, deleteUser, getDashboardStats 
} from '../../controller/admincontroller/mastermasterdata';
import { validateMiddleware } from '../../middleware/validationMiddleware';
import { verifyToken } from '../../middleware/authMiddleware';

const adminRouter = express.Router();

// Auth Routes
adminRouter.post("/register", validateMiddleware, adminRegister);
adminRouter.post("/login", validateMiddleware, adminLogin);
adminRouter.post("/forget-password", adminForgetPassword);
adminRouter.put("/update-password", verifyToken, adminUpdatePassword);

// Dashboard Stats
adminRouter.get("/get-dashboard-stats", verifyToken, getDashboardStats);

// Master Plan Routes
adminRouter.post("/create-master-plan", verifyToken, validateMiddleware, createmasterplan);
adminRouter.get("/get-master-plan", verifyToken, getmasterplan);
adminRouter.get("/get-master-plan/:id", verifyToken, getmasterplanbyid);
adminRouter.put("/update-master-plan/:id", verifyToken, validateMiddleware, updatemasterplan);
adminRouter.delete("/delete-master-plan/:id", verifyToken, deletemasterplan);

// Master Course Routes
adminRouter.post("/create-master-course", verifyToken, validateMiddleware, createmastercourse);
adminRouter.get("/get-master-course", verifyToken, getmastercourse);
adminRouter.get("/get-master-course/:id", verifyToken, getmastercoursebyid);
adminRouter.put("/update-master-course/:id", verifyToken, validateMiddleware, updatemastercourse);
adminRouter.delete("/delete-master-course/:id", verifyToken, deletemastercourse);

// User Management
adminRouter.get("/get-all-users", verifyToken, getUsers);
adminRouter.delete("/delete-user/:id", verifyToken, deleteUser);

export default adminRouter;