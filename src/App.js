 import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import ForgotPassword from "./Pages/ForgotPassword";
import Home from "./Pages/Home";
import Offers from "./Pages/Offers";
import Profile from "./Pages/Profile";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";

function App() {
  return (
   <>
   <Router>
    <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/profile' element={<Profile/>}/>
     <Route path='/sign-up' element={<SignUp/>}/>
     <Route path='/sign-in' element={<SignIn/>}/>
     <Route path='/forgot-password' element={<ForgotPassword/>}/>
     <Route path='/offers' element={<Offers/>}/>
    </Routes>
   </Router>
   </>
  );
}

export default App;
