import 'dotenv/config'
import { createResponse } from "../../helpers/createResponse";
import bcrypt from 'bcrypt';
import { generateToken } from "../../helpers/jwt";
import { admin } from '../../entities/admin';
import { adminForgetPasswordService } from "../../services/adminForgetPasswordService";
export const adminRegister = async (req: any, res: any) => {
 try{
 const { name, email, password="Test@12345", mobile } = req.body;
  const isExist = await admin.findOne({ where: { email: email } });
  if (isExist) {
    return createResponse(res, false, 400, "User already exists", [], true);
  }else{
    const hashedPassword=await bcrypt.hash(password,10)
    const result= await admin.save({name,email,mobile,password:hashedPassword})
    return createResponse(res, true, 201, "User register successfully", result, false);
  }
 }catch(error){
 return createResponse(res, false, 500, "Internal Server Error", [], true);
 }
};

export const adminLogin = async (req: any, res: any) => {
  const {email,password}=req.body;
 try{  
    const isExist = await admin.findOne({ where: { email } });
     if(!isExist){
      return createResponse(res, false, 404, "Admin Not Found", [], true);
     }else{
         const isMatched=await bcrypt.compare(password,isExist?.password);
         if(!isMatched){
           return createResponse(res, false, 404, "Please enter valid password", [], true);
         }else{
          const payload={email:isExist?.email,id:isExist?.id}
          const token=generateToken(payload)
          
           return createResponse(res, true, 200, "Login successfull",{ ...isExist,token}, false,);
         }
     } 
 }catch(error){
  return createResponse(res, false, 500, "Internal Server Error", [], true);
 }
};

export const adminUpdatePassword = async (req: any, res: any) => {
  const { oldPassword, newPassword } = req.body;
  const adminId = req.user.id; // Assuming from auth middleware

  try {
    const adminUser = await admin.findOne({ where: { id: adminId } });
    if (!adminUser) {
      return createResponse(res, false, 404, "Admin not found", [], true);
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, adminUser.password);
    if (!isOldPasswordValid) {
      return createResponse(res, false, 400, "Old password is incorrect", [], true);
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    adminUser.password = hashedNewPassword;
    await adminUser.save();

    return createResponse(res, true, 200, "Password updated successfully", [], false);
  } catch (error) {
    return createResponse(res, false, 500, "Internal Server Error", [], true);
  }
};

export const adminForgetPassword = async (req: any, res: any) => {
  const { email } = req.body;
  
  const result = await adminForgetPasswordService(email);
  
  return createResponse(
    res,
    result.success,
    result.status,
    result.message,
    [],
    !result.success
  );
};
