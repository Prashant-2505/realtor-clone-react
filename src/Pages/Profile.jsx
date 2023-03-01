import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router";

function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  function onLogout() {
    auth.signOut();
    navigate("/");
  }

  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-center text-3xl mt-6 font-bold ">My Profile</h1>

        <div className="w-full md:w-[50%] mt-6 px-3">
          <form action="">
            {/* Name input */}
            <input
              type="text"
              value={name}
              id={name}
              disabled
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 transition ease-in-out"
            />

            <input
              type="email"
              value={email}
              id={email}
              disabled
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 transition ease-in-out mt-5"
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:tex-lg mt-3">
              <p className="items-center flex mb-6">
                Do you want to change your name?
                <span className="ml-2 text-red-600 hover:text-red-800 transition ease-in duration-200 cursor-pointer">
                  Edit
                </span>
              </p>
              <p
                onClick={onLogout}
                className=" text-blue-600 hover:text-blue-800 cursor-pointer transition ease-in duration-200"
              >
                Sign-out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Profile;
