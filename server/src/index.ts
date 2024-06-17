//PW: 5DzAHknXquU0Ljn5y
import express,{Express} from 'express';
import mongoose from 'mongoose';
import financialRecordRouter from "./routes/financial-records";

const app: Express = express();
// Specifying a port, or defaulting to 3001
const port = process.env.PORT || 3001;

app.use(express.json());

const mongoURI: string = "mongodb+srv://jcoker361:5DzAHknXquU0Ljn5y@ss0.zkcb7j4.mongodb.net/"

mongoose
    .connect(mongoURI)
    .then(()=>console.log("Successful connection to MongoDB!"))
    .catch((err)=>console.error("Failed to connect to MongoDB: ", err));

app.use("/financial-records", financialRecordRouter);

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})