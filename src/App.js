import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import Header from "./Components/Header";

import ForgotPassword from "./Pages/ForgotPassword";
import Home from "./Pages/Home";
import Offers from "./Pages/Offers";
import Profile from "./Pages/Profile";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        {/* all components outside routes will bi visible for all the pages */}
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/offers' element={<Offers />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
