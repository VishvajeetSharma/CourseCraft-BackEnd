import path from "path";
import fs from "fs";

export const uploadFile = (file: any, folderName: string = "uploads"): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error("File not provided"));

    const uploadPath = path.join(__dirname, `../../${folderName}`);
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

    const fileName = Date.now() + "_" + file.name;
    file.mv(path.join(uploadPath, fileName), (err: any) =>
      err ? reject(err) : resolve(fileName)
    );
  });
};