import express, { Request, Response } from "express";
import FinancialRecordModel from "../schema/financial-record";

const router = express.Router();

// setting up endpoints to mongoDB

//Retrieving (GET) records by the user ID
router.get("/getAllByUserID/:userId", async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const records = await FinancialRecordModel.find({ userId: userId });
    if (records.length === 0) {
      return res.status(404).send("No records found for the user.");
    }
    res.status(200).send(records);
  } catch (error) {
    // server error
    res.status(500).send(error);
  }
});

// Adding (POST) a new record to the database
router.post("/", async (req: Request, res: Response) => {
  try {
    const newRecordBody = req.body;
    const newRecord = new FinancialRecordModel(newRecordBody);
    const savedRecord = await newRecord.save();
    res.status(200).send(savedRecord);
  } catch (error) {
    // server error
    res.status(500).send(error);
  }
});

// Updating (PUT) a new record to the database
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newRecordBody = req.body;
    const record = await FinancialRecordModel.findByIdAndUpdate(
      id,
      newRecordBody,
      { new: true }
    );
    if (!record) {
      return res.status(404).send();
    }
    res.status(200).send(record);
  } catch (error) {
    // server error
    res.status(500).send(error);
  }
});

// Deleting (DELETE) a record from the database
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const record = await FinancialRecordModel.findByIdAndDelete(id);
    if (!record) {
      return res.status(404).send();
    }
    res.status(200).send(record);
  } catch (error) {
    // server error
    res.status(500).send(error);
  }
});

export default router;
