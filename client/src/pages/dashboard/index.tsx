import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { FinancialRecordForm } from "./financial-record-form";
import { FinancialRecordList } from "./financial-record-list";
import "./financial-record.css";
import { useFinancialRecords } from "../../contexts/financial-record-context";
import { useMemo } from "react";
import { Navigate } from "react-router-dom";
import logo from "./assets/logo-transparent-png.png";

export const Dashboard = () => {
  const { user } = useUser();
  const { records } = useFinancialRecords();

  const totalMonthly = useMemo(() => {
    let totalAmount = 0;
    records.forEach((record) => {
      if (new Date(record.date).getMonth() === new Date().getMonth()) {
        totalAmount += record.amount;
      }
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
          <img src={logo} className="navbar-logo" />
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
