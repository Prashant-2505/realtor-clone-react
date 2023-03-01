import React from "react";
import { Outlet, Navigate } from "react-router";
import {useAuthStatus} from "../Hooks/useAuthStatus";
import Spinner from "./Spinner";

export default function PrivateRoute() {
  const { loggedIn, checkStatus } = useAuthStatus();
  if (checkStatus === true) {
    return <Spinner/>;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}

// here this function state that if loggedin is true than go to
// outlet if not then navigate to sign in here otlet means the page inside the
// page means route inside the route for more understandin check app.js
// where there is another route inside the provatrRoute and theis internal
// route is outlet
