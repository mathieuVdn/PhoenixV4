import DataTypes from "sequelize";
import Types from "./type.model.js";
import Operation from "./operation.model.js";
import connection from "../config/database.config.js";

const Envelope = connection.db.define(
  "Envelope",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    creation_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

Envelope.hasMany(Operation, { foreignKey: "envelope_id" });
Envelope.belongsTo(Types, { foreignKey: "type_id" });

export default Envelope;
