import { users } from "../../entities/user";
import "dotenv/config";
import { createResponse } from "../../helpers/createResponse";
import bcrypt from "bcrypt";
import { generateToken } from "../../helpers/jwt";
import { forgetPasswordService } from "../../services/userForgetPasswordService";
import { uploadFile } from "../../helpers/fileUpload";
export const userRegister = async (req: any, res: any) => {
  try {
    const { name, email, password = "Test@12345", mobile } = req.body;
    const isExist = await users.findOne({ where: { email: email } });
    if (isExist) {
      return createResponse(res, false, 400, "User already exists", [], true);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await users.save({
        name,
        email,
        mobile,
        password: hashedPassword,
      });
      return createResponse(
        res,
        true,
        201,
        "User register successfully",
        result,
        false,
      );
    }
  } catch (error) {
    return createResponse(res, false, 500, "Internal Server Error", [], true);
  }
};
export const userLogin = async (req: any, res: any) => {
  const { email, password } = req.body;
  try {
    const isExist = await users.findOne({ where: { email } });
    if (!isExist) {
      return createResponse(res, false, 404, "User Not Found", [], true);
    } else {
      const isMatched = await bcrypt.compare(password, isExist?.password);
      if (!isMatched) {
        return createResponse(
          res,
          false,
          404,
          "Please enter valid password",
          [],
          true,
        );
      } else {
        const payload = { email: isExist?.email, id: isExist?.id };
        const token = generateToken(payload);

        return createResponse(
          res,
          true,
          200,
          "Login successfull",
          { ...isExist, token },
          false,
        );
      }
    }
  } catch (error) {
    return createResponse(res, false, 500, "Internal Server Error", [], true);
  }
};

export const userForgetPassword = async (req: any, res: any) => {
  const { email } = req.body;
  
  const result = await forgetPasswordService(email);
  
  return createResponse(
    res,
    result.success,
    result.status,
    result.message,
    [],
    !result.success
  );
};

export const userUpdatePassword = async (req: any, res: any) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id; // Assuming from auth middleware

  try {
    const user = await users.findOne({ where: { id: userId } });
    if (!user) {
      return createResponse(res, false, 404, "User not found", [], true);
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      return createResponse(res, false, 400, "Old password is incorrect", [], true);
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    return createResponse(res, true, 200, "Password updated successfully", [], false);
  } catch (error) {
    return createResponse(res, false, 500, "Internal Server Error", [], true);
  }
};
export const userUpdateProfile = async (req: any, res: any) => {
  const { name, email, mobile, address } = req.body;
  const userId = req.user.id;
  const profile = req.files?.profile;

  try {
    const user = await users.findOne({ where: { id: userId } });

    if (!user) {
      return createResponse(res, false, 404, "User not found", [], true);
    }

    let profileName = user.profile;

    if (profile) {
  uploadFile(profile, "uploads", async (err: any, fileName: any) => {
    if (err) {
      return createResponse(res, false, 500, err, [], true);
    }

    profileName = fileName;

    await users.update({ id: userId },
      { name, email, mobile, address, profile: profileName },
  
    );

  
    const updatedUser = await users.findOne({ where: { id: userId } });

    return createResponse(res, true, 200, "Profile updated successfully", updatedUser, false);
  });
} else {
  await users.update({ id: userId },
    { name, email, mobile, address, profile: profileName },

  );

  const updatedUser = await users.findOne({ where: { id: userId } });

  return createResponse(res, true, 200, "Profile updated successfully", updatedUser, false);
}

  } catch (error) {
    return createResponse(res, false, 500, "Internal Server Error", [], true);
  }
};