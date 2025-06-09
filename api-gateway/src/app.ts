import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import router from "./routes/proxy.routes";
import {corsConfig} from "./config/cors";

dotenv.config();
const app = express();

app.use(cors(corsConfig));
app.use(express.json());
app.use("/", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
