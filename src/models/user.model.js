import DataTypes from "sequelize";
import connection from "../config/database.config.js";
import { USER_ROLE } from "../constants/user.constants.js";
import Envelope from "./envelope.model.js";

const User = connection.db.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: USER_ROLE.member,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

User.hasMany(Envelope, { foreignKey: "user_id" });

export default User;
