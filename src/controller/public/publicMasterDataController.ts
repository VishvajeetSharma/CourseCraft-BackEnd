import { MasterPlan } from "../../entities/masterplan";
import { createResponse } from "../../helpers/createResponse";
import { asyncHandler } from "../../helpers/asyncHandler";
import { AppDataSource } from "../../dbconfig/dbconfig";

export const getRecMasterPlan = asyncHandler(async (_req, res) => {
  const masterplanRepository = AppDataSource.getRepository(MasterPlan);
  const result = await masterplanRepository.find({ where: { status: 1, is_rec: 1 } });
  return createResponse(res, true, 200, "Plans fetched successfully", result, false);
});

export const getMasterPlan = asyncHandler(async (_req, res) => {
  const masterplanRepository = AppDataSource.getRepository(MasterPlan);
  const result = await masterplanRepository.find({ where: { status: 1 } });
  return createResponse(res, true, 200, "Plans fetched successfully", result, false);
});
