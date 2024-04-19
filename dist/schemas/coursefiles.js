"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseFileSchema = void 0;
const db_1 = __importDefault(require("../db"));
const sequelize_1 = __importDefault(require("sequelize"));
const courses_1 = require("./courses");
exports.courseFileSchema = db_1.default.define("course_files", {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    courseId: {
        type: sequelize_1.default.INTEGER,
        references: {
            model: courses_1.courseSchema,
            key: "id",
        },
    },
    video: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    pdf: {
        type: sequelize_1.default.STRING,
        allowNull: true,
        defaultValue: null,
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
