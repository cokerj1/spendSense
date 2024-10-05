// Essentially the state manager, where all the record states and functions
// to affect said states exist
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

export interface FinancialRecord {
  _id?: string;
  userId: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
}

interface FinancialRecordsContextType {
  records: FinancialRecord[];
  addRecord: (record: FinancialRecord) => void;
  updateRecord: (id: string, newRecord: FinancialRecord) => void;
  deleteRecord: (id: string) => void;
}

export const FinancialRecordsContext = createContext<
  FinancialRecordsContextType | undefined
>(undefined);

// creating a component to be the provider, grabbing children components from whatever has been wrapped inside
export const FinancialRecordsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const { user } = useUser();
  
  const BACKEND_URL:string = import.meta.env.VITE_RENDER_API_URL

  const fetchRecords = async () => {
    if (!user) return;
    const response = await fetch( // might need to handle ports as well
      //`http://localhost:3001/financial-records/getAllByUserID/${user.id}`
      `${BACKEND_URL}/financial-records/getAllByUserID/${user.id}`
  )
    
    if (response.ok) {
      const records = await response.json();
      console.log(records);
      setRecords(records);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [user]);

  const addRecord = async (record: FinancialRecord) => {
    const response = await fetch(`${BACKEND_URL}/financial-records`, {
      method: "POST",
      body: JSON.stringify(record),
      headers: {
        "Content-Type": "application/json",
      },
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

  const updateRecord = async (id: string, record: FinancialRecord) => {
    const response = await fetch(
      `${BACKEND_URL}/financial-records/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(record),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    try {
      if (response.ok) {
        // changing the updated record by mapping through: if any element has a record id equal to id
        // of the updated record, reflect the new record that was changed, else keep the old version of it
        const newRecord = await response.json();
        setRecords((prev) =>
          prev.map((record) => {
            if (record._id === id) {
              return newRecord;
            } else {
              return record;
            }
          })
        );
      }
    } catch (error) {
      // Possible error message
      throw new Error("Error updating record");
    }
  };

  const deleteRecord = async (id: string) => {
    const response = await fetch(
      `${BACKEND_URL}/financial-records/${id}`,
      {
        method: "DELETE",
      }
    );

    try {
      if (response.ok) {
        const deletedRecord = await response.json();
        setRecords((prev) =>
          prev.filter((record) => record._id !== deletedRecord._id)
        );
      }
    } catch (err) {}
  };

  return (
    <FinancialRecordsContext.Provider
      value={{ records, addRecord, updateRecord, deleteRecord }}
    >
      {children}
    </FinancialRecordsContext.Provider>
  );
};

export const useFinancialRecords = () => {
  const context = useContext<FinancialRecordsContextType | undefined>(
    FinancialRecordsContext
  );

  if (!context) {
    throw new Error(
      "useFinancialRecords can't be used outside a FinancialRecordsProvider"
    );
  }

  return context;
};
