import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import logo from "./assets/logo-transparent-png.png";

export const Auth = () => {
  return (
    <>
      <div className="logo-container">
        <img src={logo} className="logo"/>
      </div>
      <div className="sign-in-container">
        <SignedOut>
          <SignUpButton mode="modal" forceRedirectUrl={"/"} />
          <SignInButton mode="modal" />
        </SignedOut>
        <SignedIn>
          <Navigate to={"/"} />
        </SignedIn>
      </div>
    </>
  );
};
