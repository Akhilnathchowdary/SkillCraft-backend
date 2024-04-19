"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingSchema = void 0;
const db_1 = __importDefault(require("../db"));
const sequelize_1 = __importDefault(require("sequelize"));
const users_1 = require("./users");
const courses_1 = require("./courses");
exports.ratingSchema = db_1.default.define("ratings", {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    rating: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.default.INTEGER,
        references: {
            model: users_1.userSchema,
            key: "id",
        },
    },
    courseId: {
        type: sequelize_1.default.INTEGER,
        references: {
            model: courses_1.courseSchema,
            key: "id",
        },
    },
    description: {
        type: sequelize_1.default.STRING,
        allowNull: true,
        defaultValue: null,
    },
});
exports.ratingSchema.belongsTo(users_1.userSchema, {
    foreignKey: "userId",
    targetKey: "id",
    as: "user",
    onDelete: "cascade",
});
