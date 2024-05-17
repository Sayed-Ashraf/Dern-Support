import { DataTypes } from "sequelize";
import connection from "../config/db.js";

const users = connection.define("users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        enum: ["user", "admin"],
        defaultValue: "user",
        allowNull: true
    }
},{
    tableName: "users",
})

export default users