import { Router, Request, Response } from "express";
import seq from "../db";
import { instructorSchema } from "../schemas/instructors";

export const instructorRouter = Router();

instructorRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const user = await instructorSchema.findOne({
      where: { email: req.body.email, password: req.body.password },
    });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

instructorRouter.post("/", async (req: Request, res: Response) => {
  try {
    const checkDuplicate = await instructorSchema.findOne({
      where: { email: req.body.email },
    });
    if (checkDuplicate) {
      return res.status(400).json({ error: "User already exists" });
    }
    const user = await instructorSchema.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

instructorRouter.get("/", async (req: Request, res: Response) => {
  try {
    const users = await instructorSchema.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

instructorRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const user = await instructorSchema.findOne({
      where: { id: req.params.id },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

instructorRouter.patch("/:id", async (req: Request, res: Response) => {
  try {
    const user = await instructorSchema.findOne({
      where: { id: req.params.id },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await instructorSchema.update(req.body, { where: { id: req.params.id } });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

instructorRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const user = await instructorSchema.findOne({
      where: { id: req.params.id },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await instructorSchema.destroy({ where: { id: req.params.id } });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
