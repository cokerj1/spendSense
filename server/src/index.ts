import express,{Express} from 'express';
import mongoose from 'mongoose';
import financialRecordRouter from "./routes/financial-records";
import cors from 'cors';

const app: Express = express();
// Specifying a port, or defaulting to 3001
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const mongoURI: string = "mongodb+srv://jcoker361:2wHykPnb6dWTzn8M@ss0.zkcb7j4.mongodb.net/"

mongoose
    .connect(mongoURI)
    .then(()=>console.log("Successful connection to MongoDB!"))
    .catch((err)=>console.error("Failed to connect to MongoDB: ", err));

app.use("/financial-records", financialRecordRouter);

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})