import React from "react";
import Application from "./Application";
import UserProvider from  "./UserProvider";

function AuthApp() {
  return (
    <UserProvider>
      <Application />
    </UserProvider>
  );
}
export default AuthApp;