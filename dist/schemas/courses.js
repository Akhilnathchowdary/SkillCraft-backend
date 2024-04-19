"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseSchema = void 0;
const db_1 = __importDefault(require("../db"));
const sequelize_1 = __importDefault(require("sequelize"));
const instructors_1 = require("./instructors");
const coursefiles_1 = require("./coursefiles");
exports.courseSchema = db_1.default.define("courses", {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    duration: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    fee: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    instructorId: {
        type: sequelize_1.default.INTEGER,
        references: {
            model: instructors_1.instructorSchema,
            key: "id",
        },
    },
});
exports.courseSchema.belongsTo(instructors_1.instructorSchema, {
    foreignKey: "instructorId",
    targetKey: "id",
    as: "instructor",
    onDelete: "cascade",
});
exports.courseSchema.hasMany(coursefiles_1.courseFileSchema, {
    foreignKey: "courseId",
    sourceKey: "id",
    as: "courseFiles",
    onDelete: "cascade",
});
