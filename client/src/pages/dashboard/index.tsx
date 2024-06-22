import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { FinancialRecordForm } from "./financial-record-form";
import { FinancialRecordList } from "./financial-record-list";
import "./financial-record.css";
import { useFinancialRecords } from "../../contexts/financial-record-context";
import { useMemo } from "react";
import { Link, Navigate } from "react-router-dom";

export const Dashboard = () => {
  const { user } = useUser();
  const { records } = useFinancialRecords();

  const totalMonthly = useMemo(() => {
    let totalAmount = 0;
    records.forEach((record) => {
      totalAmount += record.amount;
    });
    return totalAmount;
  }, [records]);
  return (
    <>
      <SignedOut>
        <Navigate to={"/auth"} />
      </SignedOut>
      <SignedIn>
        <div className="navbar">
          <Link to={"/"}>DashBoard</Link>
          <UserButton />
        </div>
        <div className="dashboard-container">
          <h1>Welcome {user?.firstName}! Here is your summary:</h1>
          <div>
            <FinancialRecordForm />
            <div>Monthly Total: £{totalMonthly}</div>
            <FinancialRecordList />
          </div>
        </div>
      </SignedIn>
    </>
  );
};
