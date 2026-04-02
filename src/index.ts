import express from "express";
import "dotenv/config";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { AppDataSource } from "./dbconfig/dbconfig";
import userRouter from "./routes/user/userrouter";
import adminRouter from "./routes/admin/adminrouter";
import expressfileupload from "express-fileupload";
import swaggerOptions from "./config/swagger";
import path from "path";
import publicRouter from "./routes/public/publicRouter";

const app = express();
app.use(expressfileupload());
app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));
app.use("/file", express.static(path.join(__dirname, "../uploads")));

// Dedicated API to get images
app.get("/get-image/:imageName", (req: any, res: any) => {
  const { imageName } = req.params;
  const filePath = path.join(__dirname, "../uploads", imageName);
  res.sendFile(filePath, (err: any) => {
    if (err) {
      res.status(404).send({ success: false, message: "Image not found" });
    }
  });
});

const PORT = process.env.PORT || 8000;
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully..");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/public", publicRouter);
app.use("/admin", adminRouter);
app.use("/user", userRouter);   

app.listen(PORT, () => {
  console.log("server is running on port:" + PORT);
  console.log("swagger ui:" + "http://localhost:8000/api-docs/");
  
});
