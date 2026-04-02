import path from "path";
import fs from "fs";

export const uploadFile = ( file: any,  folderName: string = "uploads", callback: (err: any, fileName?: string) => void ) => {
  if (!file) {
    return callback("File not provided");
  }

  const uploadPath = path.join(__dirname, `../../${folderName}`);
 
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }
 
  const fileName = Date.now() + "_" + file.name;
  const filePath = path.join(uploadPath, fileName);
 
  file.mv(filePath, (err: any) => {
    if (err) {
      return callback(err);
    }
    return callback(null, fileName);
  });
};