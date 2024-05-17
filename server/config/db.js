import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

try{
    var connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,{
        host: process.env.DB_HOST,
        dialect: "mysql"
    });
}

catch(err){
    console.log("Error in connection with database: " + err);
}

export default connection