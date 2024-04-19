import seq from "../db";
import DataTypes from "sequelize";
 import { userSchema } from "./users";
import { courseSchema } from "./courses";
import { courseFileSchema } from "./coursefiles";

export const userCourseSchema = seq.define("userCourses", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  courseId: {
    type: DataTypes.INTEGER,
    references: {
      model: courseSchema,
      key: "id",
    },
  },
  paidAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  paymentMode: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});


userCourseSchema.belongsTo(courseSchema, {
  foreignKey: "courseId",
  targetKey: "id",
  as: "course",
  onDelete: "cascade",
});

userCourseSchema.belongsTo(userSchema, {
  foreignKey: "userId",
  targetKey: "id",
  as: "user",
  onDelete: "cascade",
});

userCourseSchema.hasMany(courseFileSchema, {
  foreignKey: "courseId",
  sourceKey: "courseId",
  as: "files",
  onDelete: "cascade",
});
