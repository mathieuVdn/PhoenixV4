import DataTypes from "sequelize";
import Envelope from "./envelope.model.js";
import connection from "../config/database.config.js";


const Role = connection.db.define( "Role", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false
    }
);

