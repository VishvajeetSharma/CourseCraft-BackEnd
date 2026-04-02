import express from "express";
import { getMasterPlan, getRecMasterPlan } from "../../controller/public/publicMasterDataController";

const publicRouter = express.Router();

publicRouter.get("/get-rec-plan",  getRecMasterPlan);
publicRouter.get("/get-master-plan", getMasterPlan); 

export default publicRouter;
