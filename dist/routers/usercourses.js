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
exports.userCourseRouter = void 0;
const express_1 = require("express");
const userCourses_1 = require("../schemas/userCourses");
const courses_1 = require("../schemas/courses");
const coursefiles_1 = require("../schemas/coursefiles");
const users_1 = require("../schemas/users");
exports.userCourseRouter = (0, express_1.Router)();
exports.userCourseRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkDuplicate = yield userCourses_1.userCourseSchema.findOne({
            where: { userId: req.body.userId, courseId: req.body.courseId },
        });
        if (checkDuplicate) {
            return res.status(400).json({ error: "User already enrolled" });
        }
        const userCourse = yield userCourses_1.userCourseSchema.create(req.body);
        res.status(200).json(userCourse);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
exports.userCourseRouter.get("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const userCourses = yield userCourses_1.userCourseSchema.findAll({
            where: { userId: userId },
            include: [
                {
                    model: courses_1.courseSchema,
                    as: "course",
                },
                {
                    model: coursefiles_1.courseFileSchema,
                    as: "files",
                },
            ],
        });
        res.status(200).json(userCourses);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
exports.userCourseRouter.get("/course/:courseId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.courseId;
        const userCourses = yield userCourses_1.userCourseSchema.findAll({
            where: { courseId: courseId },
            include: [
                {
                    model: users_1.userSchema,
                    as: "user",
                    attributes: ["id", "name", "email"],
                },
            ],
        });
        res.status(200).json(userCourses);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
