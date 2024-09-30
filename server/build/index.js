"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const financial_records_1 = __importDefault(require("./routes/financial-records"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
// Specifying a port, or defaulting to 3001
const port = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
dotenv_1.default.config({
    path: '.env.local'
});
const mongoURI = process.env.MONGODB_URI || '';
if (!mongoURI) {
    console.error('Missing MONGODB_URI in .env.local');
    process.exit(1);
}
mongoose_1.default
    .connect(mongoURI)
    .then(() => console.log("Successful connection to MongoDB!"))
    .catch((err) => console.error("Failed to connect to MongoDB: ", err));
app.use("/financial-records", financial_records_1.default);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
