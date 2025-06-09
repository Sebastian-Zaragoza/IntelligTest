import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from "./routes/test.routes";
import {connect_database} from "./utils/db";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/test", router)

const PORT  = process.env.PORT || 4003;
connect_database().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    })
})