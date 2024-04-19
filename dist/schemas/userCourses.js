"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCourseSchema = void 0;
const db_1 = __importDefault(require("../db"));
const sequelize_1 = __importDefault(require("sequelize"));
const users_1 = require("./users");
const courses_1 = require("./courses");
const coursefiles_1 = require("./coursefiles");
exports.userCourseSchema = db_1.default.define("userCourses", {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    courseId: {
        type: sequelize_1.default.INTEGER,
        references: {
            model: courses_1.courseSchema,
            key: "id",
        },
    },
    paidAmount: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    paymentMode: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
});
exports.userCourseSchema.belongsTo(courses_1.courseSchema, {
    foreignKey: "courseId",
    targetKey: "id",
    as: "course",
    onDelete: "cascade",
});
exports.userCourseSchema.belongsTo(users_1.userSchema, {
    foreignKey: "userId",
    targetKey: "id",
    as: "user",
    onDelete: "cascade",
});
exports.userCourseSchema.hasMany(coursefiles_1.courseFileSchema, {
    foreignKey: "courseId",
    sourceKey: "courseId",
    as: "files",
    onDelete: "cascade",
});
