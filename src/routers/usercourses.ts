import { Router, Request, Response } from "express";
import { userCourseSchema } from "../schemas/userCourses";
import { courseSchema } from "../schemas/courses";
import { courseFileSchema } from "../schemas/coursefiles";
import { userSchema } from "../schemas/users";
export const userCourseRouter = Router();

userCourseRouter.post("/", async (req: Request, res: Response) => {
  try {
    const checkDuplicate = await userCourseSchema.findOne({
      where: { userId: req.body.userId, courseId: req.body.courseId },
    });
    if (checkDuplicate) {
      return res.status(400).json({ error: "User already enrolled" });
    }
    const userCourse = await userCourseSchema.create(req.body);
    res.status(200).json(userCourse);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

userCourseRouter.get("/:userId", async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const userCourses = await userCourseSchema.findAll({
      where: { userId: userId },
      include: [
        {
          model: courseSchema,
          as: "course",
        },
        {
          model: courseFileSchema,
          as: "files",
        },
      ],
    });
    res.status(200).json(userCourses);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

userCourseRouter.get(
  "/course/:courseId",
  async (req: Request, res: Response) => {
    try {
      const courseId = req.params.courseId;
      const userCourses = await userCourseSchema.findAll({
        where: { courseId: courseId },
        include: [
          {
            model: userSchema,
            as: "user",
            attributes: ["id", "name", "email"],
          },
        ],
      });
      res.status(200).json(userCourses);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);
