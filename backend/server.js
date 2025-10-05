import express from "express";
 
import { configDotenv } from "dotenv";
import connect from "./database/database.js";
import router from "./routes/airquality.routes.js";
connect();
configDotenv();
const app=express();

app.use("/api/airquality",router);


const port=process.env.PORT;
app.use(r)


app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
