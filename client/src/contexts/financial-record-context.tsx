// Essentially the state manager, where all the record states and functions 
// to affect said states exist
import { createContext, useContext, useState } from "react";
import { json } from "react-router-dom";

interface FinancialRecord{
    id?: string;
    userID:string;
    date:Date;
    description:string;
    amount:number;
    category:string;
    paymentMethod:string; 
}

interface FinancialRecordContextType {
    records: FinancialRecord[];
    addRecord: (record: FinancialRecord) => void;
    // updateRecord: (id: string, newRecord: FinancialRecord) => void;
    // deleteRecord: (id: string) => void;


}


export const FinancialRecordContext = createContext<FinancialRecordContextType | undefined>(undefined)

// creating a component to be the provider, grabbing children components from whatever has been wrapped inside
export const FinancialRecordProvider = ({
    children
}:{
    children:React.ReactNode
}) => {
    const [records, setRecords] = useState<FinancialRecord[]>([]);

    const addRecord = async (record: FinancialRecord) => {
        const response = await fetch("http://localhost:3001/financial-records", {
            method: "POST",
            body: JSON.stringify(record),
            headers: {
                "Content-Type": "application/json",
            }
        });

        try {
            if (response.ok) {
                const newRecord = await response.json();
                setRecords((prev) => [...prev, newRecord]); 
            }
        } catch (error) {
            // Possible error message
            throw new Error("Error adding record");
        }
    };



    return <FinancialRecordContext.Provider value={{records, addRecord}}>
        {" "}
        {children}
        </FinancialRecordContext.Provider>
};


export const useFinancialRecords = () => {
    const context = useContext<FinancialRecordContextType | undefined>(
        FinancialRecordContext
    );

    if(!context){
        throw new Error("useFinancialRecords can't be used outside a FinancialRecordsProvider");
    }

    return context; 
};