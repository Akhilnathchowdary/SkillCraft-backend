import { Router, Request, Response } from "express";
import { userSchema } from "../schemas/users";
import { ratingSchema } from "../schemas/ratings";
import seq from "../db";

export const ratingRouter = Router();

ratingRouter.post("/", async (req: Request, res: Response) => {
  try {
    const user = await userSchema.findOne({
      where: { id: req.body.userId },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const rating = await ratingSchema.create(req.body);
    res.status(200).json({
      message: "Rating created",
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

ratingRouter.get("/:courseId", async (req: Request, res: Response) => {
  try {
    const ratings = await ratingSchema.findAll({
      where: { courseId: req.params.courseId },
      include: [
        {
          model: userSchema,
          as: "user",
          attributes: ["id", "name"],
        },
      ],
    });
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});


