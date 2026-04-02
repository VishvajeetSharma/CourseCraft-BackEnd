import jwt from "jsonwebtoken";
import { createResponse } from "../helpers/createResponse";

export const verifyToken = (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return createResponse(res, false, 401, "No token provided", null, true);
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    req.user = decoded;

    next();
  } catch (error: any) {
    return createResponse(res, false, 401, "Invalid or expired token", error?.message || null, true);
  }
};