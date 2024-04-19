import { Router, Request, Response } from "express";
import { courseSchema } from "../schemas/courses";
import { instructorSchema } from "../schemas/instructors";
import { courseFileSchema } from "../schemas/coursefiles";
import seq from "../db";
import { Op } from "sequelize";
export const courseRouter = Router();

courseRouter.post("/", async (req: Request, res: Response) => {
  try {
    const instructor = await instructorSchema.findOne({
      where: { id: req.body.instructorId },
    });
    if (!instructor) {
      return res.status(404).json({ error: "Instructor not found" });
    }
    const course = await courseSchema.create(req.body);
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

courseRouter.get("/", async (req: Request, res: Response) => {
  try {
    const courses = await courseSchema.findAll({
      include: [
        {
          model: instructorSchema,
          as: "instructor",
        },
      ],
    });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

courseRouter.get("/instructor/:id", async (req: Request, res: Response) => {
  try {
    const instructor = await instructorSchema.findOne({
      where: { id: req.params.id },
    });
    if (!instructor) {
      return res.status(404).json({ error: "Instructor not found" });
    }
    const courses = await courseSchema.findAll({
      where: { instructorId: req.params.id },
      include: [
        // {
        //   model: instructorSchema,
        //   as: "instructor",
        // },
        {
          model: courseFileSchema,
          as: "courseFiles",
        },
      ],
    });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

courseRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const course = await courseSchema.findOne({
      where: { id: req.params.id },
    });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

courseRouter.patch("/:id", async (req: Request, res: Response) => {
  try {
    const course = await courseSchema.findOne({
      where: { id: req.params.id },
    });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    await courseSchema.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Course updated" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

courseRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const course = await courseSchema.findOne({
      where: { id: req.params.id },
    });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    await courseSchema.destroy({
      where: { id: req.params.id },
    });
    await courseFileSchema.destroy({
      where: { courseId: req.params.id },
    });

    res.status(200).json({ message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// search cource by name
courseRouter.get("/search/:name", async (req: Request, res: Response) => {
  try {
    const courses = await courseSchema.findAll({
      where: {
        name: {
          [Op.like]: `%${req.params.name}%`,
        },
      },
      include: [
        {
          model: instructorSchema,
          as: "instructor",
        },
      ],
    });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
