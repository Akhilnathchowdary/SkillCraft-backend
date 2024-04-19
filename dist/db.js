"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("./config");
const seq = new sequelize_1.Sequelize(config_1.CONFIG.DB_URL, { dialect: "mysql" });
exports.default = seq;
