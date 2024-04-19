"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const users_1 = require("../schemas/users");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.userSchema.findOne({
            where: { email: req.body.email, password: req.body.password },
        });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
exports.userRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkDuplicate = yield users_1.userSchema.findOne({
            where: { email: req.body.email },
        });
        if (checkDuplicate) {
            return res.status(400).json({ error: "User already exists" });
        }
        const user = yield users_1.userSchema.create(req.body);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
exports.userRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield users_1.userSchema.findAll();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
exports.userRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.userSchema.findOne({ where: { id: req.params.id } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
exports.userRouter.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.userSchema.findOne({ where: { id: req.params.id } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        yield users_1.userSchema.update(req.body, { where: { id: req.params.id } });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
exports.userRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.userSchema.findOne({ where: { id: req.params.id } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        yield users_1.userSchema.destroy({ where: { id: req.params.id } });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
