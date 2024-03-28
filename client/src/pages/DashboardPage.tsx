import React from "react";
import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectCurrentToken,
} from "../features/auth/authSlice";

function Dashboard() {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const welcome = user ? `Welcome ${user.email}` : "Welcome!";
  const tokenMessage = token ? `Your token is: ${token}` : "No token found";
  return (
    <div>
      <h1>{welcome}</h1>
      <p>{tokenMessage}</p>
    </div>
  );
}
export default Dashboard;
