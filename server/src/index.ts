import express,{Express} from 'express';
import mongoose from 'mongoose';
import financialRecordRouter from "./routes/financial-records";
import cors from 'cors';
import dotenv from 'dotenv';

const app: Express = express();
// Specifying a port, or defaulting to 3001
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

dotenv.config({
    path: '.env.local'
});

const mongoURI: string = process.env.MONGODB_URI || '';
if (!mongoURI) {
    console.error('Missing MONGODB_URI in .env.local');
    process.exit(1);
}

mongoose
    .connect(mongoURI)
    .then(() => console.log("Successful connection to MongoDB!"))
    .catch((err) => console.error("Failed to connect to MongoDB: ", err));

app.use("/financial-records", financialRecordRouter);

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})