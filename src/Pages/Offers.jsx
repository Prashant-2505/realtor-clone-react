import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";
import Spinner from "../Components/Spinner";
import ListingItem from "../Components/ListingItem";

function Offers() {
  const [offerListing, setOfferListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const[lastFetchOfer, setLastFatchOffer]= useState(null)

  useEffect(() => {
    async function fetchListing() {
      try {
        // get reference
        const listingRef = collection(db, "listings");
        // create query
        const q = query(
          listingRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(8)
        );
        // executing query and get data from database acording to query
        const querySnap = await getDocs(q);
        // here we are storing the last offer listing in a variable that are currently in querysnap or shawn in a page by creating  variable and we all offer data is in querysnap the we ise.doc on query to access data from database and minus -1 from the querysnap length to get the details of last offer data
        const lastOffer = querySnap.docs[querySnap.docs.length-1]
        setLastFatchOffer(lastOffer)
        let listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOfferListing(listings);
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    }
    fetchListing();
  }, []);


  async function onFetchMoreOffer()
  {
    try {
      // get reference
      const listingRef = collection(db, "listings");
      // create query
      const q = query(
        listingRef,
        where("offer", "==", true),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchOfer),
        limit(4)
      );
      // executing query and get data from database acording to query
      const querySnap = await getDocs(q);
      const lastOffer = querySnap.docs[querySnap.docs.length-1]
      setLastFatchOffer(lastOffer)
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setOfferListing((prevState)=>[
       ...prevState, ...listings
      ]);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  }
  

  return <div className="max-w-6xl mx-auto p-3">
    <h1 className="text-3xl text-center mt-6 font-bold mb-6">Offers</h1>
    {loading ? (
      <Spinner />) : offerListing && offerListing.length > 0 ? (
        <>
        <main>
          <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {offerListing.map((listing)=>(
               <ListingItem key={listing.id} id={listing.id} listing={listing.data}/>
            ))}  
          </ul>
        </main>
        {lastFetchOfer && (
          <div className="flex items-center justify-center mb-4">
              <button onClick={onFetchMoreOffer} className="bg-white px-3 py-1.5 text-gray-700 border border-gray300  font-semibold hover:border-slate-600 rounded transition duration-150 ease-in-out">Load more</button>
          </div>
        )}
        </>
      ) :
      (
        <p>There are no current offer</p>
      )
    }
  </div>;
}

export default Offers;
