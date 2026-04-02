import express from "express";
import { userForgetPassword, userLogin, userRegister, userUpdatePassword, userUpdateProfile } from "../../controller/usercontroller/userauthcontroller";
import { validateMiddleware } from "../../middleware/validationMiddleware";
import { verifyToken } from "../../middleware/authMiddleware";
import { getUserDashboardStats, userPurchasedPlan, userPurchasePlan, userViewCourse } from "../../controller/usercontroller/usermastermasterdata";
const userRouter = express.Router();

// Auth
userRouter.post("/register", validateMiddleware, userRegister);  
userRouter.post("/login", validateMiddleware, userLogin);

// Dashboard State
userRouter.get("/user-state", verifyToken, getUserDashboardStats);

// Plan
userRouter.post("/user-purchase-plan",verifyToken,userPurchasePlan); 
userRouter.get("/user-purchased-plan",verifyToken,userPurchasedPlan);

// Course
userRouter.get("/user-view-course",verifyToken,userViewCourse);

userRouter.post("/forget-password", userForgetPassword);
userRouter.put("/update-password", verifyToken, userUpdatePassword);
userRouter.put("/update-profile", verifyToken, userUpdateProfile);
export default userRouter;
