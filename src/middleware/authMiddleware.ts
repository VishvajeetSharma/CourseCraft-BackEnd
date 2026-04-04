import jwt from "jsonwebtoken";
import { createResponse } from "../helpers/createResponse";
import { verifyAccessToken, verifyRefreshToken, generateAccessToken } from "../helpers/jwt";

export const verifyToken = (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return createResponse(res, false, 401, "No token provided", null, true);
    }
    const token = authHeader.split(" ")[1];
    req.user = verifyAccessToken(token);
    next();
  } catch (error: any) {
    return createResponse(res, false, 401, "Invalid or expired token", null, true);
  }
};

export const refreshTokenHandler = (req: any, res: any) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return createResponse(res, false, 401, "Refresh token required", null, true);
    }
    const decoded: any = verifyRefreshToken(refreshToken);
    const accessToken = generateAccessToken({ email: decoded.email, id: decoded.id });
    return createResponse(res, true, 200, "Token refreshed", { accessToken }, false);
  } catch (error) {
    return createResponse(res, false, 401, "Invalid or expired refresh token", null, true);
  }
};