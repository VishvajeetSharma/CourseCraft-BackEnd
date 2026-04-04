import { users } from "../../entities/user";
import "dotenv/config";
import { createResponse } from "../../helpers/createResponse";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../helpers/jwt";
import { forgetPasswordService } from "../../services/userForgetPasswordService";
import { uploadFile } from "../../helpers/fileUpload";
import { asyncHandler } from "../../helpers/asyncHandler";

export const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password = "Test@12345", mobile } = req.body;
  const isExist = await users.findOne({ where: { email } });
  if (isExist) return createResponse(res, false, 400, "User already exists", [], true);

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await users.save({ name, email, mobile, password: hashedPassword });
  return createResponse(res, true, 201, "User register successfully", result, false);
});

export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const isExist = await users.findOne({ where: { email } });
  if (!isExist) return createResponse(res, false, 404, "User Not Found", [], true);

  const isMatched = await bcrypt.compare(password, isExist.password);
  if (!isMatched) return createResponse(res, false, 401, "Please enter valid password", [], true);

  const payload = { email: isExist.email, id: isExist.id };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  const { password: _, ...userData } = isExist;
  return createResponse(res, true, 200, "Login successfull", { ...userData, accessToken, refreshToken }, false);
});

export const userForgetPassword = asyncHandler(async (req, res) => {
  const result = await forgetPasswordService(req.body.email);
  return createResponse(res, result.success, result.status, result.message, [], !result.success);
});

export const userUpdatePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await users.findOne({ where: { id: req.user.id } });
  if (!user) return createResponse(res, false, 404, "User not found", [], true);

  const isValid = await bcrypt.compare(oldPassword, user.password);
  if (!isValid) return createResponse(res, false, 400, "Old password is incorrect", [], true);

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  return createResponse(res, true, 200, "Password updated successfully", [], false);
});

export const userUpdateProfile = asyncHandler(async (req, res) => {
  const { name, email, mobile, address } = req.body;
  const userId = req.user.id;

  const user = await users.findOne({ where: { id: userId } });
  if (!user) return createResponse(res, false, 404, "User not found", [], true);

  let profileName = user.profile;
  if (req.files?.profile) {
    profileName = await uploadFile(req.files.profile, "uploads");
  }

  await users.update({ id: userId }, { name, email, mobile, address, profile: profileName });
  const updatedUser = await users.findOne({ where: { id: userId } });
  return createResponse(res, true, 200, "Profile updated successfully", updatedUser, false);
});
