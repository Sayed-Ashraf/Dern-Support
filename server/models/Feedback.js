import { DataTypes } from "sequelize";
import connection from "../config/db.js";

const feedbacks = connection.define("feedbacks", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        
    }
},{
    tableName: "feedbacks"
})

export default feedbacks;