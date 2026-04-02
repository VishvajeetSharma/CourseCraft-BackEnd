import { masterplan } from "../../entities/masterplan";
import { createResponse } from "../../helpers/createResponse";

export const getRecMasterPlan = async (req: any, res: any) => {
  try {
    const result = await masterplan.find({  where:{status:1, is_rec: "1"}});
    return createResponse(res, true, 200, "Plans fetched successfully", result, false);
  } catch (error: any) {
    return createResponse(res, false, 500, error.message || "Internal Server Error", [], true);
  }
}; 

export const getMasterPlan = async (req: any, res: any) => {
  try {
    const result = await masterplan.find({  where:{status:1}});
    return createResponse(res, true, 200, "Plans fetched successfully", result, false);
  } catch (error: any) {
    return createResponse(res, false, 500, error.message || "Internal Server Error", [], true);
  }
}; 