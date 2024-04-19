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
exports.notificationRouter = void 0;
const express_1 = require("express");
const notifications_1 = require("../schemas/notifications");
const users_1 = require("../schemas/users");
const userCourses_1 = require("../schemas/userCourses");
exports.notificationRouter = (0, express_1.Router)();
exports.notificationRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userCourses_1.userCourseSchema.findAll({
            where: { courseId: req.body.courseId },
        });
        for (let i = 0; i < users.length; i++) {
            const user = yield users_1.userSchema.findOne({
                where: { id: users[i].userId },
            });
            if (user) {
                yield notifications_1.notificationSchema.create({
                    userId: user.id,
                    message: req.body.message,
                });
            }
        }
        res.status(200).json({
            message: "Notification created",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}));
exports.notificationRouter.get("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notifications = yield notifications_1.notificationSchema.findAll({
            where: { userId: req.params.userId, status: 0 },
        });
        res.status(200).json(notifications);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
exports.notificationRouter.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notification = yield notifications_1.notificationSchema.findOne({
            where: { id: req.params.id },
        });
        if (!notification) {
            return res.status(404).json({ error: "Notification not found" });
        }
        yield notifications_1.notificationSchema.update(req.body, {
            where: { id: req.params.id },
        });
        res.status(200).json({ message: "Notification updated" });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
