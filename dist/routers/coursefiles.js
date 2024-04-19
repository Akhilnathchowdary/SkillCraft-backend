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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.courseFileRouter = void 0;
const express_1 = require("express");
const coursefiles_1 = require("../schemas/coursefiles");
const courses_1 = require("../schemas/courses");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
exports.courseFileRouter = (0, express_1.Router)();
const Storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "video") {
            cb(null, "public/videos");
        }
        else if (file.fieldname === "pdf") {
            cb(null, "public/pdfs");
        }
    },
    filename: (req, file, cb) => {
        cb(null, (0, uuid_1.v4)() +
            file.originalname
                .slice(file.originalname.lastIndexOf("."))
                .toLowerCase());
    },
});
exports.upload = (0, multer_1.default)({ storage: Storage });
exports.courseFileRouter.post("/", exports.upload.fields([
    { name: "video", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let body = Object.assign({}, req.body);
        const checkCourse = yield courses_1.courseSchema.findOne({
            where: { id: body.courseId },
        });
        if (!checkCourse) {
            return res.status(404).json({ error: "Course not found" });
        }
        const files = req.files;
        if (files.video) {
            body.video = files.video[0].filename;
        }
        if (files.pdf) {
            body.pdf = files.pdf[0].filename;
        }
        console.log(body, "body");
        yield coursefiles_1.courseFileSchema.create(body);
        res.status(200).json({ message: "Course file created" });
    }
    catch (error) {
        console.log(error, "error");
        res.status(500).json({ error: error });
    }
}));
exports.courseFileRouter.get("/:courseId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseFiles = yield coursefiles_1.courseFileSchema.findAll({
            where: { courseId: req.params.courseId },
        });
        res.status(200).json(courseFiles);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
exports.courseFileRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseFile = yield coursefiles_1.courseFileSchema.findOne({
            where: { id: req.params.id },
        });
        if (!courseFile) {
            return res.status(404).json({ error: "Course file not found" });
        }
        if (courseFile.video) {
            fs_1.default.unlinkSync(path_1.default.join(process.cwd(), "public/videos", courseFile.video));
        }
        if (courseFile.pdf) {
            fs_1.default.unlinkSync(path_1.default.join(process.cwd(), "public/pdfs", courseFile.pdf));
        }
        yield coursefiles_1.courseFileSchema.destroy({
            where: { id: req.params.id },
        });
        res.status(200).json({ message: "Course file deleted" });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
