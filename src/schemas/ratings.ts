import seq from "../db";
import DataTypes from "sequelize";
import { userSchema } from "./users";
import { courseSchema } from "./courses";

export const ratingSchema = seq.define("ratings", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: userSchema,
      key: "id",
    },
  },
  courseId: {
    type: DataTypes.INTEGER,
    references: {
      model: courseSchema,
      key: "id",
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
});

ratingSchema.belongsTo(userSchema, {
  foreignKey: "userId",
  targetKey: "id",
  as: "user",
  onDelete: "cascade",
});
