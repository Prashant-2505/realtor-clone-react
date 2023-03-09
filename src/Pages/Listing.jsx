import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Spinner from "../Components/Spinner";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import {
  FaBed,
  FaBath,
  FaParking,
  FaChair,
  FaMapMarkerAlt,
  FaShare,
} from "react-icons/fa";
import { getAuth } from "firebase/auth";
import Contact from "../Components/Contact";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
function Listing() {
  const auth = getAuth();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkedCopied] = useState(false);
  const [contactLandlord, setContactLandlord] = useState(false);
  SwiperCore.use([Autoplay, Pagination, Navigation]);

  const params = useParams();
  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    }
    fetchListing();
  }, [params.listingId]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <main className="bg-white">
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className=" fixed top-[10%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkedCopied(true);
          setTimeout(() => {
            setShareLinkedCopied(false);
          }, 2000);
        }}
      >
        <FaShare className="text-lg text-slate-500" />
      </div>
      {shareLinkCopied && (
        <p className="fixed top-[15%] right-[6%] z-10 font-semibold border-2 border-gray-200 bg-white p-2">
          share link copied !!
        </p>
      )}

      <div className=" m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-[#F0FDF4] lg:space-x-5">
        <div className=" w-full  lg:h-[400px]">
          <p className="text-2xl font-bold mb-3 text-blue-900">
            {listing.name} - ${" "}
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" ? " / month" : ""}
          </p>
          <p className="flex items-center gap-3 mt-5 mb-3 font-bold">
            <FaMapMarkerAlt className="text-green-700" />
            {listing.address}
          </p>
          <div className=" flex justify-start items-center space-x-4 w-[75%]">
            <p className=" bg-red-600 w-full max-w-[200px] rounded-md p-1 text-center text-white font-semibold shadow-md">
              {listing.type === "rent" ? "Rent" : "Sale"}
            </p>
            <p>
              {listing.offer && (
                <p className="w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md">
                  ${+listing.regularPrice - +listing.discountedPrice} after
                  discount
                </p>
              )}
            </p>
          </div>
          <p className="mt-3 mb-3 ">
            <span className="font-semibold"> Description -</span>
            {listing.description}
          </p>
          <ul className=" flex items-center space-x-3 lg:space-x-10 text-sm font-semibold mb-6 ">
            <li className="flex items-center whitespace-nowrap gap-2 ">
              <FaBed className="text-lg " />
              {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </li>

            <li className="flex items-center whitespace-nowrap gap-2 ">
              <FaBath className="text-lg" />
              {+listing.Bathrooms > 1 ? `${listing.Bathrooms} Baths` : "1 Bath"}
            </li>

            <li className="flex items-center whitespace-nowrap gap-2 ">
              <FaParking className="text-lg" />
              {listing.parking ? "Parking spot" : "No Parking"}
            </li>

            <li className="flex items-center whitespace-nowrap gap-2 ">
              <FaChair className="text-lg" />
              {listing.furnished ? "Furnished " : "No Furnished"}
            </li>
          </ul>
          {listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
            <div className="mt-6">
              <button
                onClick={() => setContactLandlord(true)}
                className="px-7 py-3 bg-blue-600 rounded text-white font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:shadow-xl transition duration-200 ease-in-out w-full uppercase"
              >
                Contact Landlord
              </button>
            </div>
          )}
          {contactLandlord && (
            <Contact userRef={listing.userRef} listing={listing} />
          )}
        </div>
        <div className="w-full h-[200px] md:h-[400px] z-10 overflow-x-hidden mt-6 md:mt-0 md:ml-2">
          <MapContainer
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[listing.geolocation.lat, listing.geolocation.lng]}
            >
              <Popup>
                {listing.address}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </main>
  );
}

export default Listing;
