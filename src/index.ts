import express from "express";
import seq from "./db";
import cors from "cors";
import { CONFIG } from "./config";
import fs from "fs";
import path from "path";
import { userRouter } from "./routers/users";
import { instructorRouter } from "./routers/instructors";
import { courseRouter } from "./routers/courses";
import { courseFileRouter } from "./routers/coursefiles";
import { ratingRouter } from "./routers/ratings";
import { notificationRouter } from "./routers/notifications";
import { userCourseRouter } from "./routers/usercourses";
const app = express();
app.use(cors());
app.use(express.json());
const PORT = CONFIG.PORT;
const publicFolder = path.join(process.cwd(), "public");
app.use(express.static(publicFolder));
const foldersToCreate = ["videos", "pdfs"];

async function startServer() {
  try {
    await seq.authenticate();
    console.log("Connection has been established successfully.");
    if (CONFIG.DB_SYNC) {
      await seq.sync({ alter: true });
      console.log("Database synchronized");
    }
    if (!fs.existsSync(publicFolder)) {
      fs.mkdirSync(publicFolder);
    }
    for (const folder of foldersToCreate) {
      const folderPath = path.join(publicFolder, folder);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }
    }
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();

app.use("/users", userRouter);
app.use("/instructors", instructorRouter);
app.use("/courses", courseRouter);
app.use("/coursefiles", courseFileRouter);
app.use("/ratings", ratingRouter);
app.use("/notifications", notificationRouter);
app.use("/usercourses", userCourseRouter);
