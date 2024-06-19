import mongoose, { model } from "mongoose";

interface FinancialRecord{
    userId:string;
    date:Date;
    description:string;
    amount:number;
    category:string;
    paymentMethod:string; 
}

const financialRecordSchema = new mongoose.Schema<FinancialRecord>({
    userId: {type: String, required: true},
    date: {type: Date, required: true},
    description: {type: String, required: true},
    amount: {type: Number, required: true},
    category: {type: String, required: true},
    paymentMethod: {type: String, required: true}

});


// defining a schemsa and creating a model out of it
const FinancialRecordModel = mongoose.model<FinancialRecord>(
    "FinancialRecord",
    financialRecordSchema
);

export default FinancialRecordModel;