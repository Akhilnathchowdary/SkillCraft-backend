import { Router, Request, Response } from "express";
import { notificationSchema } from "../schemas/notifications";
import { userSchema } from "../schemas/users";
import { userCourseSchema } from "../schemas/userCourses";
import seq from "../db";

export const notificationRouter = Router();

notificationRouter.post("/", async (req: Request, res: Response) => {
  try {
    const users: any = await userCourseSchema.findAll({
      where: { courseId: req.body.courseId },
    });
    
    for (let i = 0; i < users.length; i++) {
      const user: any = await userSchema.findOne({
        where: { id: users[i].userId },
      });
      if (user) {
        await notificationSchema.create({
          userId: user.id,
          message: req.body.message,
        });
      }
    }
    res.status(200).json({
      message: "Notification created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

notificationRouter.get("/:userId", async (req: Request, res: Response) => {
  try {
    const notifications = await notificationSchema.findAll({
      where: { userId: req.params.userId, status: 0 },
    });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

notificationRouter.patch("/:id", async (req: Request, res: Response) => {
  try {
    const notification = await notificationSchema.findOne({
      where: { id: req.params.id },
    });
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    await notificationSchema.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Notification updated" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
