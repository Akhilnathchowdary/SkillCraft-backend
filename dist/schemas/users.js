"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const db_1 = __importDefault(require("../db"));
const sequelize_1 = __importDefault(require("sequelize"));
exports.userSchema = db_1.default.define("users", {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        unique: true,
    },
    mobile: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
});
