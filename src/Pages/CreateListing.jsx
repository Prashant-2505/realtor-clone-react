import React, { useState } from "react";

function CreateListing() {
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
    discountPrice:'0',
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
  } = formData;

  function onChange() {}

  return (
    <main className="max-w-md px-2 mx-auto">
      <h1 className="text-3xl text-center mt-6 font-bold">Create a Listing</h1>
      <form>
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
            value="sell"
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
        <input
          type="text"
          id="address"
          value={address}
          onChange={onChange}
          placeholder="Address"
          required
          className="w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 transition duration-200 ease-in-out focus:text-gray-800 focus:bg-white focus:border-slate-300 mb-6 "
        />

        <p className="text-lg  font-semibold">Description</p>
        <input
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
                 required ={offer}
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
        )}

        <div className="mb-6">
          <p className="text-lg font-semibold">Images</p>
          <p className="text-gray-600">The first image will be cover (max 6)</p>
          <input className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-200 ease-in-out focus:bg-white focus:border-slate-600" type="file" id='images' onChange={onChange
          } accept='.jpg,.png,.jpeg' multiple required/>
        </div>
        <button type="submit" className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm  uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-800 focus:shadow-lg active:to-blue-900 active:shadow-xl transition duration-200 ease-in-out ">Create Listing</button>
      </form>
    </main>
  );
}

export default CreateListing;
