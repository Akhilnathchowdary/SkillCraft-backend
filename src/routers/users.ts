import { Router, Request, Response } from "express";
import seq from "../db";
import { userSchema } from "../schemas/users";

export const userRouter = Router();

userRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const user = await userSchema.findOne({
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

userRouter.post("/", async (req: Request, res: Response) => {
  try {
    const checkDuplicate = await userSchema.findOne({
      where: { email: req.body.email },
    });
    if (checkDuplicate) {
      return res.status(400).json({ error: "User already exists" });
    }
    const user = await userSchema.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

userRouter.get("/", async (req: Request, res: Response) => {
  try {
    const users = await userSchema.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

userRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const user = await userSchema.findOne({ where: { id: req.params.id } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

userRouter.patch("/:id", async (req: Request, res: Response) => {
  try {
    const user = await userSchema.findOne({ where: { id: req.params.id } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await userSchema.update(req.body, { where: { id: req.params.id } });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

userRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const user = await userSchema.findOne({ where: { id: req.params.id } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await userSchema.destroy({ where: { id: req.params.id } });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
