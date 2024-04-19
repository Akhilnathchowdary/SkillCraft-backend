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
exports.ratingRouter = void 0;
const express_1 = require("express");
const users_1 = require("../schemas/users");
const ratings_1 = require("../schemas/ratings");
exports.ratingRouter = (0, express_1.Router)();
exports.ratingRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.userSchema.findOne({
            where: { id: req.body.userId },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const rating = yield ratings_1.ratingSchema.create(req.body);
        res.status(200).json({
            message: "Rating created",
        });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
exports.ratingRouter.get("/:courseId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ratings = yield ratings_1.ratingSchema.findAll({
            where: { courseId: req.params.courseId },
            include: [
                {
                    model: users_1.userSchema,
                    as: "user",
                    attributes: ["id", "name"],
                },
            ],
        });
        res.status(200).json(ratings);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}));
