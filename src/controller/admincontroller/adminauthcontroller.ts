import 'dotenv/config';
import { createResponse } from "../../helpers/createResponse";
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from "../../helpers/jwt";
import { admin } from '../../entities/admin';
import { adminForgetPasswordService } from "../../services/adminForgetPasswordService";
import { asyncHandler } from "../../helpers/asyncHandler";
import { AppDataSource } from "../../dbconfig/dbconfig";

export const adminRegister = asyncHandler(async (req, res) => {
  const { name, email, password = "Test@12345", mobile } = req.body;
  const adminRepository = AppDataSource.getRepository(admin);
  const isExist = await adminRepository.findOne({ where: { email } });
  if (isExist) return createResponse(res, false, 400, "User already exists", [], true);

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await adminRepository.save({ name, email, mobile, password: hashedPassword });
  return createResponse(res, true, 201, "User register successfully", result, false);
});

export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const adminRepository = AppDataSource.getRepository(admin);
  const isExist = await adminRepository.findOne({ where: { email } });
  if (!isExist) return createResponse(res, false, 404, "Admin Not Found", [], true);

  const isMatched = await bcrypt.compare(password, isExist.password);
  if (!isMatched) return createResponse(res, false, 401, "Please enter valid password", [], true);

  const payload = { email: isExist.email, id: isExist.id };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  const { password: _, ...adminData } = isExist;
  return createResponse(res, true, 200, "Login successfull", { ...adminData, accessToken, refreshToken }, false);
});

export const adminUpdatePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const adminRepository = AppDataSource.getRepository(admin);
  const adminUser = await adminRepository.findOne({ where: { id: req.user.id } });
  if (!adminUser) return createResponse(res, false, 404, "Admin not found", [], true);

  const isValid = await bcrypt.compare(oldPassword, adminUser.password);
  if (!isValid) return createResponse(res, false, 400, "Old password is incorrect", [], true);

  adminUser.password = await bcrypt.hash(newPassword, 10);
  await adminRepository.save(adminUser);
  return createResponse(res, true, 200, "Password updated successfully", [], false);
});

export const adminForgetPassword = asyncHandler(async (req, res) => {
  const result = await adminForgetPasswordService(req.body.email);
  return createResponse(res, result.success, result.status, result.message, [], !result.success);
});
