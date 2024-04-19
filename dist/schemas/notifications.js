"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationSchema = void 0;
const db_1 = __importDefault(require("../db"));
const sequelize_1 = __importDefault(require("sequelize"));
exports.notificationSchema = db_1.default.define("notifications", {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    message: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.default.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
});
