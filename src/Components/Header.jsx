import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useLocation, Navigate, useNavigate } from "react-router";

function Header() {
  const [pageState, setPageState]=useState('sign-in')
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(()=>
  {
    onAuthStateChanged(auth,(user)=>
    {
      if(user)
      {
     setPageState('profile')
      }
      else
      {
        setPageState('sign-in')
      }
    })
  },[auth])
  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }

  return (
    <div className=" bg-white border-b shadow-sm sticky top-0 z-50">
      <header className="flex justify-between items-center px-4 max-w-6xl mx-auto">
        <div>
          <img
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="logo"
            className="h-5 cursor-pointer "
            onClick={() => navigate("/")}
          />
        </div>

        <div>
          <ul className="flex space-x-10">
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px]  ${
                pathMatchRoute("/") && "text-black border-b-red-600"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px]  ${
                pathMatchRoute("/offers") && "text-black border-b-red-600"
              }`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px]  ${
                (pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) &&
                "text-black border-b-red-600"
              }`}
              onClick={() => navigate("/profile")}
            >
           {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default Header;

// we are using useLocation go find the location of the current page by (location.pathname)--> give the name of path and then using
// function passing route and check id route == pathname the do some styli on that like give bottom border of red and check the Text
// color of menu  where && means for condition true then do some styling else nothing happen
// then we using Navigate for give the navigation of function and cretae the onClick self function all li and the logo if we click on that that then it will agai reach to its location we provide to it
