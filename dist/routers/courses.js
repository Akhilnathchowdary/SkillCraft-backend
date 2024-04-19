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
exports.courseRouter = void 0;
const express_1 = require("express");
const courses_1 = require("../schemas/courses");
const instructors_1 = require("../schemas/instructors");
const coursefiles_1 = require("../schemas/coursefiles");
const sequelize_1 = require("sequelize");
exports.courseRouter = (0, express_1.Router)();
exports.courseRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const instructor = yield instructors_1.instructorSchema.findOne({
            where: { id: req.body.instructorId },
        });
        if (!instructor) {
            return res.status(404).json({ error: "Instructor not found" });
        }
        const course = yield courses_1.courseSchema.create(req.body);
        res.status(200).json(course);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
exports.courseRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield courses_1.courseSchema.findAll({
            include: [
                {
                    model: instructors_1.instructorSchema,
                    as: "instructor",
                },
            ],
        });
        res.status(200).json(courses);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
exports.courseRouter.get("/instructor/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const instructor = yield instructors_1.instructorSchema.findOne({
            where: { id: req.params.id },
        });
        if (!instructor) {
            return res.status(404).json({ error: "Instructor not found" });
        }
        const courses = yield courses_1.courseSchema.findAll({
            where: { instructorId: req.params.id },
            include: [
                // {
                //   model: instructorSchema,
                //   as: "instructor",
                // },
                {
                    model: coursefiles_1.courseFileSchema,
                    as: "courseFiles",
                },
            ],
        });
        res.status(200).json(courses);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
exports.courseRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield courses_1.courseSchema.findOne({
            where: { id: req.params.id },
        });
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        res.status(200).json(course);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
exports.courseRouter.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield courses_1.courseSchema.findOne({
            where: { id: req.params.id },
        });
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        yield courses_1.courseSchema.update(req.body, {
            where: { id: req.params.id },
        });
        res.status(200).json({ message: "Course updated" });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
exports.courseRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield courses_1.courseSchema.findOne({
            where: { id: req.params.id },
        });
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        yield courses_1.courseSchema.destroy({
            where: { id: req.params.id },
        });
        yield coursefiles_1.courseFileSchema.destroy({
            where: { courseId: req.params.id },
        });
        res.status(200).json({ message: "Course deleted" });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
// search cource by name
exports.courseRouter.get("/search/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield courses_1.courseSchema.findAll({
            where: {
                name: {
                    [sequelize_1.Op.like]: `%${req.params.name}%`,
                },
            },
            include: [
                {
                    model: instructors_1.instructorSchema,
                    as: "instructor",
                },
            ],
        });
        res.status(200).json(courses);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
