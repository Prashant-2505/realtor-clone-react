
import React, { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../Components/Spinner";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

function CreateListing() {
  const auth = getAuth();

  const [geoLoctaionEnabled, setGeoLoctaionEnabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: "1",
    bathrooms: "1",
    parking: false,
    furnishe: false,
    address: "",
    description: "",
    offer: true,
    regularPrice: "0",
    discountPrice: "0",
    latitude: "0",
    longitude: "0",
    images: {},
  });
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    description,
    offer,
    regularPrice,
    discountPrice,
    longitude,
    latitude,
    images,
  } = formData;

  function onChange(e) {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    //Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    // text,value,no
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (discountPrice >= regularPrice) {
      setLoading(false);
      toast.error("discount price need to be less than regular price");
      return;
    }
    if (images.length > 6) {
      setLoading(false);
      toast.error("maximum image should be less than 6");
      return;
    }
    let geolocation = {
      lat: "",
      lon: "",
    };
    let location;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "cb20a1d945mshccba951fe1644cbp12afa8jsn1ab8c832b756",
        "X-RapidAPI-Host": "address-from-to-latitude-longitude.p.rapidapi.com",
      },
    };
    if (geoLoctaionEnabled) {
      const response = await fetch(
        `https://address-from-to-latitude-longitude.p.rapidapi.com/geolocationapi?address=${address}`,
        options
      );
      const data = await response.json();
      location = data.Results[0].address;
      if (location === undefined) {
        setLoading(false);
        toast.error("enter valid address");
        return;
      }
      if (location !== undefined) {
        geolocation.lat = data.Results[0].latitude;
        geolocation.lon = data.Results[0].longitude;
        console.log(location)
        console.log(geolocation.lat )
        console.log(geolocation.l )
      }
    } else {
      geolocation.lat = latitude;
      geolocation.lon = longitude;
    }
    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setLoading(false);
      toast.error("Images not uploaded");
      return;
    });
    console.log(imgUrls)
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <main className="max-w-md px-2 mx-auto">
      <h1 className="text-3xl text-center mt-6 font-bold">Create a Listing</h1>
      <form onSubmit={onSubmit}>
        <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
        <div className="flex gap-10">
          <button
            id="type"
            value="sell"
            onClick={onChange}
            type="button"
            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-xl active:shadow-xl transition duration-200 ease-in-out w-full ${
              type === "rent" ? "bg-white" : "bg-slate-600 text-white"
            } `}
          >
            sell
          </button>

          <button
            id="type"
            value="rent"
            onClick={onChange}
            type="button"
            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-xl active:shadow-xl transition duration-200 ease-in-out w-full ${
              type === "sell" ? "bg-white" : "bg-slate-600 text-white"
            } `}
          >
            rent
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">Name</p>
        <input
          type="text"
          id="name"
          value={name}
          onChange={onChange}
          placeholder="Full Name"
          maxLength="32"
          minLength="10"
          required
          className="w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 transition duration-200 ease-in-out focus:text-gray-800 focus:bg-white focus:border-slate-300 mb-6 "
        />

        <div className="flex space-x-6 mb-6">
          <div>
            <p className="text-lg font-semibold">Beds</p>
            <input
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={onChange}
              min="1"
              max="20"
              required
              className=" px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 transition duration-200 ease-in-out focus:bg-white focus:border-slate-300 text-center w-full"
            />
          </div>
          <div className="">
            <p className="text-lg font-semibold">Baths</p>
            <input
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={onChange}
              min="1"
              max="20"
              required
              className=" px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 transition duration-200 ease-in-out focus:bg-white focus:border-slate-300 text-center w-full"
            />
          </div>
        </div>
        <p className="text-lg mt-6 font-semibold">Parking spot</p>
        <div className="flex gap-10">
          <button
            id="parking"
            value={true}
            onClick={onChange}
            type="button"
            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-xl active:shadow-xl transition duration-200 ease-in-out w-full ${
              !parking ? "bg-white" : "bg-slate-600 text-white"
            } `}
          >
            Yes
          </button>

          <button
            id="parking"
            value={false}
            onClick={onChange}
            type="button"
            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-xl active:shadow-xl transition duration-200 ease-in-out w-full ${
              parking ? "bg-white" : "bg-slate-600 text-white"
            } `}
          >
            No
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">Furnished</p>
        <div className="flex gap-10">
          <button
            id="furnished"
            value={true}
            onClick={onChange}
            type="button"
            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-xl active:shadow-xl transition duration-200 ease-in-out w-full ${
              !furnished ? "bg-white" : "bg-slate-600 text-white"
            } `}
          >
            Yes
          </button>

          <button
            id="furnished"
            value={false}
            onClick={onChange}
            type="button"
            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-xl active:shadow-xl transition duration-200 ease-in-out w-full ${
              furnished ? "bg-white" : "bg-slate-600 text-white"
            } `}
          >
            No
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">Address</p>
        <textarea
          type="text"
          id="address"
          value={address}
          onChange={onChange}
          placeholder="Address"
          required
          size="8"
          className="w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 transition duration-200 ease-in-out focus:text-gray-800 focus:bg-white focus:border-slate-300 mb-6 "
        />
        {!geoLoctaionEnabled && (
          <div className="flex space-x-6 mb-6">
            <div className="text-lg font-semibold">
              <p>Lattitude</p>
              <input
                type="number"
                id="latitude"
                value={latitude}
                onChange={onChange}
                required
                min={-90}
                max={90}
                className=" px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 transition duration-200 ease-in-out focus:bg-white focus:border-slate-300 text-center w-full"
              />
            </div>
            <div className="text-lg font-semibold">
              <p>Lattitude</p>
              <input
                type="number"
                id="longitude"
                value={longitude}
                onChange={onChange}
                required
                min={-180}
                max={180}
                className=" px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 transition duration-200 ease-in-out focus:bg-white focus:border-slate-300 text-center w-full"
              />
            </div>
          </div>
        )}

        <p className="text-lg  font-semibold">Description</p>
        <textarea
          type="text"
          id="description"
          value={description}
          onChange={onChange}
          placeholder="Description"
          required
          className="w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 transition duration-200 ease-in-out focus:text-gray-800 focus:bg-white focus:border-slate-300 mb-6 "
        />

        <p className="text-lg  font-semibold">Offer</p>
        <div className="flex gap-10 mb-5">
          <button
            id="offer"
            value={true}
            onClick={onChange}
            type="button"
            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-xl active:shadow-xl transition duration-200 ease-in-out w-full ${
              !offer ? "bg-white" : "bg-slate-600 text-white"
            } `}
          >
            Yes
          </button>

          <button
            id="offer"
            value={false}
            onClick={onChange}
            type="button"
            className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-xl active:shadow-xl transition duration-200 ease-in-out w-full ${
              offer ? "bg-white" : "bg-slate-600 text-white"
            } `}
          >
            No
          </button>
        </div>

        <div className="flex items-center mb-6">
          <div className="">
            <p className="text-lg font-semibold">Regular price</p>
            <div className="flex space-x-6">
              <input
                type="number"
                id="regularPrice"
                value={regularPrice}
                onChange={onChange}
                min="50"
                max="10000"
                required
                className=" px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 transition duration-200 ease-in-out focus:bg-white focus:border-slate-300 text-center w-full"
              />

              {type === "rent" && (
                <div className="">
                  <p className="text-md w-full whitespace-nowrap ">$ / Month</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {offer && (
          <div className="flex items-center mb-6">
            <div className="">
              <p className="text-lg font-semibold">Discount price</p>
              <div className="flex space-x-6">
                <input
                  type="number"
                  id="discountPrice"
                  value={discountPrice}
                  onChange={onChange}
                  min="50"
                  max="10000"
                  required={offer}
                  className=" px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 transition duration-200 ease-in-out focus:bg-white focus:border-slate-300 text-center w-full"
                />

                {type === "rent" && (
                  <div className="">
                    <p className="text-md w-full whitespace-nowrap ">
                      $ / Month
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <p className="text-lg font-semibold">Images</p>
          <p className="text-gray-600">The first image will be cover (max 6)</p>
          <input
            className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-200 ease-in-out focus:bg-white focus:border-slate-600"
            type="file"
            id="images"
            onChange={onChange}
            accept=".jpg,.png,.jpeg"
            multiple
            required
          />
        </div>
        <button
          type="submit"
          className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm  uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-800 focus:shadow-lg active:to-blue-900 active:shadow-xl transition duration-200 ease-in-out "
        >
          Create Listing
        </button>
      </form>
    </main>
  );
}

export default CreateListing;
