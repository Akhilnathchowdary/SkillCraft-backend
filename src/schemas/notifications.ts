import seq from "../db";
import DataTypes from "sequelize";

export const notificationSchema = seq.define("notifications", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
});
