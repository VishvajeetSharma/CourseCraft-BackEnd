import jwt from 'jsonwebtoken';
import 'dotenv/config'
export const generateToken=(payload:any)=>{
  const token= jwt.sign(payload,process.env.JWT_SECRET as string,{expiresIn:'24h'})
 return token
}