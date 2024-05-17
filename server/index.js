import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/router.js";
import dotenv from 'dotenv';
import connection from "./config/db.js";

dotenv.config();

const app = express();
const port = process.env.port || 3000;


app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(router);
app.use(bodyParser.urlencoded({extended:true}))

async function initializeDatabase() {
  try {
    await connection.authenticate();
        console.log("Connection has been established successfully.");

        await connection.sync({ force: false });
        
        console.log("Models synchronized with the database.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
    }

initializeDatabase();

app.listen(port, () => {
    console.log("server is running on port " + port);
});