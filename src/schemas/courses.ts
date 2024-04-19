import seq from "../db";
import DataTypes from "sequelize";
import { instructorSchema } from "./instructors";
import { courseFileSchema } from "./coursefiles";
export const courseSchema = seq.define("courses", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fee: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  instructorId: {
    type: DataTypes.INTEGER,
    references: {
      model: instructorSchema,
      key: "id",
    },
  },
});

courseSchema.belongsTo(instructorSchema, {
  foreignKey: "instructorId",
  targetKey: "id",
  as: "instructor",
  onDelete: "cascade",
});

courseSchema.hasMany(courseFileSchema, {
  foreignKey: "courseId",
  sourceKey: "id",
  as: "courseFiles",
  onDelete: "cascade",
});
