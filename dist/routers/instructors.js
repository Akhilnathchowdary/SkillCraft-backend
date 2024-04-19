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
exports.instructorRouter = void 0;
const express_1 = require("express");
const instructors_1 = require("../schemas/instructors");
exports.instructorRouter = (0, express_1.Router)();
exports.instructorRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield instructors_1.instructorSchema.findOne({
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
exports.instructorRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkDuplicate = yield instructors_1.instructorSchema.findOne({
            where: { email: req.body.email },
        });
        if (checkDuplicate) {
            return res.status(400).json({ error: "User already exists" });
        }
        const user = yield instructors_1.instructorSchema.create(req.body);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
exports.instructorRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield instructors_1.instructorSchema.findAll();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
exports.instructorRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield instructors_1.instructorSchema.findOne({
            where: { id: req.params.id },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
exports.instructorRouter.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield instructors_1.instructorSchema.findOne({
            where: { id: req.params.id },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        yield instructors_1.instructorSchema.update(req.body, { where: { id: req.params.id } });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
exports.instructorRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield instructors_1.instructorSchema.findOne({
            where: { id: req.params.id },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        yield instructors_1.instructorSchema.destroy({ where: { id: req.params.id } });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
