import { Router, Request, Response } from "express";
import { courseFileSchema } from "../schemas/coursefiles";
import { courseSchema } from "../schemas/courses";
import seq from "../db";
import fs from "fs";
import path from "path";
import multer from "multer";
import { v4 as uuid } from "uuid";
export const courseFileRouter = Router();
const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "video") {
      cb(null, "public/videos");
    } else if (file.fieldname === "pdf") {
      cb(null, "public/pdfs");
    }
  },
  filename: (req, file, cb) => {
    cb(
      null,
      uuid() +
        file.originalname
          .slice(file.originalname.lastIndexOf("."))
          .toLowerCase()
    );
  },
});
export const upload = multer({ storage: Storage });

courseFileRouter.post(
  "/",
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  async (req: Request, res: Response) => {
    try {
      let body = {
        ...req.body,
      };
      
      const checkCourse = await courseSchema.findOne({
        where: { id: body.courseId },
      });
      if (!checkCourse) {
        return res.status(404).json({ error: "Course not found" });
      }
      const files = req.files as any;
      if (files.video) {
        body.video = files.video[0].filename;
      }
      if (files.pdf) {
        body.pdf = files.pdf[0].filename;
      }
      console.log(body,"body");
      await courseFileSchema.create(body);
      res.status(200).json({ message: "Course file created" });
    } catch (error) {
      console.log(error,"error");
      res.status(500).json({ error: error });
    }
  }
);

courseFileRouter.get("/:courseId", async (req: Request, res: Response) => {
  try {
    const courseFiles = await courseFileSchema.findAll({
      where: { courseId: req.params.courseId },
    });
    res.status(200).json(courseFiles);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

courseFileRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const courseFile: any = await courseFileSchema.findOne({
      where: { id: req.params.id },
    });
    if (!courseFile) {
      return res.status(404).json({ error: "Course file not found" });
    }
    if (courseFile.video) {
      fs.unlinkSync(
        path.join(process.cwd(), "public/videos", courseFile.video)
      );
    }
    if (courseFile.pdf) {
      fs.unlinkSync(path.join(process.cwd(), "public/pdfs", courseFile.pdf));
    }

    await courseFileSchema.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Course file deleted" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
