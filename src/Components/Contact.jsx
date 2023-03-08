import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";

function Contact({ userRef, listing }) {
  const [landLord, setLandlord] = useState(null);
  const [message, setMessage] = useState("")
  useEffect(() => {
    async function getLandlord() {
        const docRef = doc(db, "users", userRef);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setLandlord(docSnap.data());
        } else {
          toast.error("Could not get landlord data");
        }
      }
      getLandlord();
    }, [userRef]);

    function onChange(e)
    {
        setMessage (e.target.value)
    }
  return <>
    {landLord !== null && (
         <div className=" flex flex-col w-full ">
         <p className=" ">Contact {landLord.name} for the {listing.name.toLowerCase()}</p>
         <div>
            <textarea className="w-full px-4 py-2 text-xl text-gray-400 border border-gray-300 rounded transition duration-200 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mt-3 mb-6" name="" id="message"  rows="3" value={message} onChange={onChange}></textarea>
         </div>
         <a href={`mailto: ${landLord.email}? Subject=${listing.name}&body=${message}`}> <button className="px-7 py-3 bg-blue-600 text-white rounded text-sm uppercase shadow-md hover:shadow-lg hover:bg-blue-700 focus:shadow-xl focus:bg-blue-800 active:shadow-xl active:bg-blue-900 transition duration-200 ease-in-out w-full text-center mb-3" type="button">Send message</button> </a>
     </div>
    )}
   
  </>;
}

export default Contact;
