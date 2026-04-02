import { Request, Response, NextFunction } from "express";
import { createResponse } from "../helpers/createResponse";

const validationRules: { [key: string]: any } = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Invalid email format",
  },
  password: {
    minLength: 6,
    message: "Password must be at least 6 characters long",
  },
  mobile: {
    pattern: /^[6-9]\d{9}$/,
    message: "Invalid mobile number",
  },
  name: {
    minLength: 2,
    message: "Name must be at least 2 characters long",
  },
  title: {
    minLength: 3,
    message: "Title must be at least 3 characters long",
  },
  description: {
    minLength: 5,
    message: "Description must be at least 5 characters long",
  },
  desc: {
    minLength: 5,
    message: "Description must be at least 5 characters long",
  },
  price: {
    pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
    message: "Invalid price format",
  },
  credit: {
    pattern: /^[0-9]+$/,
    message: "Credit must be a number",
  },
  offer: {
    pattern: /^[0-9]+$/,
    message: "Offer must be a number",
  },
  duration: {
    pattern: /^[0-9]+$/,
    message: "Duration must be a number",
  },
  level: {
    minLength: 2,
    message: "Level must be at least 2 characters long",
  },
  rating: {
    pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
    message: "Invalid rating format",
  },
  type: {
    minLength: 2,
    message: "Type must be at least 2 characters long",
  },
  status: {
    pattern: /^[0-1]$/,
    message: "Status must be 0 or 1",
  },
  is_rec: {
    pattern: /^[0-1]$/,
    message: "is_rec must be 0 or 1",
  },
};

export const validateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const errors: { [key: string]: string } = {};
    const trimmedBody: { [key: string]: any } = {}; // NEW OBJECT

    for (const [field, value] of Object.entries(body)) {
      // Trim string values
      const trimmedValue = typeof value === "string" ? value.trim() : value;
      trimmedBody[field] = trimmedValue; // Add to new object

      // Required check
      if (trimmedValue === "" || trimmedValue === null || trimmedValue === undefined) {
        errors[field] = `${field} is required`;
        continue;
      }

      const rule = validationRules[field];
      if (rule) {
        // Pattern validation
        if (rule.pattern && !rule.pattern.test(String(trimmedValue))) {
          errors[field] = rule.message;
        }

        // Min length validation
        if (rule.minLength && String(trimmedValue).length < rule.minLength) {
          errors[field] = rule.message;
        }
      }
    }

    // Replace req.body with trimmed object
    req.body = trimmedBody;

    if (Object.keys(errors).length > 0) {
      return createResponse(res, false, 400, "Validation error", errors, true);
    }

    next();
  } catch (error: any) {
    return createResponse( res, false, 500, error?.message || "Internal server error", error instanceof Error ? error.message : "Unknown error", true );
  }
};