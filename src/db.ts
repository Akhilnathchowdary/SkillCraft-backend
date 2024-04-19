import { Sequelize } from "sequelize";
import { CONFIG } from "./config";
const seq = new Sequelize(CONFIG.DB_URL, { dialect: "mysql" });

export default seq;
