import express, { Request, Response, NextFunction } from "express";
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

app.use(cors());
app.use(express.json());
app.use(expressfileupload());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));
app.use("/file", express.static(path.join(__dirname, "../uploads")));

app.get("/get-image/:imageName", (req: Request, res: Response) => {
  const imageName = req.params["imageName"] as string;
  const filePath = path.join(__dirname, "../uploads", imageName);
  res.sendFile(filePath, (err) => {
    if (err) res.status(404).json({ success: false, message: "Image not found" });
  });
});

app.use("/public", publicRouter);
app.use("/admin", adminRouter);
app.use("/user", userRouter);

// 404 - undefined routes
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, code: 404, message: "Route not found" });
});

// Global error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("[GlobalError]", err);
  res.status(err.status || 500).json({
    success: false,
    code: err.status || 500,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 6000;

// AppDataSource.initialize()
//   .then(() => {
//     console.log("Database connected successfully..");
//     app.listen(PORT, () => {
//       console.log(`Server running on port: ${PORT}`);
//       console.log(`Swagger UI: http://localhost:${PORT}/api-docs/`);
//     });
//   })
//   .catch((err) => {
//     console.error("Database connection failed:", err);
//     process.exit(1);
//   });


AppDataSource.initialize()
  .then(() => {
    console.log("DB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB Error:", err.message);
    process.exit(1);
  });



  