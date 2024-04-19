import seq from "../db";
import DataTypes from "sequelize";
import { courseSchema } from "./courses";

export const courseFileSchema = seq.define("course_files", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  courseId: {
    type: DataTypes.INTEGER,
    references: {
      model: courseSchema,
      key: "id",
    },
  },
  video: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pdf: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false
  }
});
