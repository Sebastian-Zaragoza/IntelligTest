import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import {connect_database} from "./utils/db";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 4001;
const startServer = async () => {
    await connect_database();
    app.listen(PORT, ()=>{
        console.log(`Server started on port ${PORT}`);
    });
};
startServer();
