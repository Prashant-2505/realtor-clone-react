import { within } from "@testing-library/react";
import React from "react";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import OAuthh from "../Components/OAuthh";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  // here we use form data as an hook beacuse it gonna change every user come that why we use as an state
  // because of an two data we have in formdata thats why we store it as object
  const [formData, SetFormData] = useState({
    email: "",
    password: "",
  });
  // here we destructur it to use seperately
  const { email, password } = formData;

    // Onchange is function that trigger when value og given inout is change and we use prevState to store the prevous entered data
  // here we us prestate as an variable who store all previous value thts why we use down spread operator 
  // this function is used to take value from user and store in for data by capturing the user input using id we provide below
  function onChange(e) {
    SetFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign In</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto ">
        <div
          className="md:w-[60%] lg:w-[50%] mb-12
        md:mb-6 "
        >
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>

        <div className="w-full md:w-[60%] lg:w-[40%] lg:ml-20">
          <form>
            <input
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email address"
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-7"
            />

            <div className="relative mb-7">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              />

              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute right-3 top-4 cursor-pointer text-xl"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-4 cursor-pointer text-xl"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>

            <div className="flex justify-between whitespace-nowrap tex-sm sm:text-lg">
              <p>
                Dont't have an account ?
                <Link
                  to="/sign-up"
                  className="text-blue-600 hover:text-blue-800 transition duration-400 ease-in-out ml-2"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  to="/forgot-password"
                  className="text-red-600 hover:text-red-800 transition duration-400 ease-in-out"
                >
                  Forgot password ?
                </Link>
              </p>
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-blue-600 text-white px-7 py-3 rounded-sm text-sm font-medium uppercase shadow-md hover:bg-blue-700 transition duration-200 ease-in-out hover:shadow-lg active:bg-blue-800 "
            >
              {" "}
              Sign in
            </button>

            <div className="flex my-4 before:border-t before:flex-1 items-center before:border-gray-300 after:border-t after:flex-1  after:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuthh/>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignIn;



// we are using LINK from react-router dom to to link one oage to another for example we click on forgot password then it Will 
// redirect us to its page by using LINK and provide its location
