import React from 'react'
import {FcGoogle} from 'react-icons/fc'
function OAuthh() {
  return (
    <div>
      <button className='flex items-center justify-center w-full bg-red-600 text-white px-7 py-3 uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg transition duration-200 ease-in-out rounded-sm'> <FcGoogle className='text-2xl bg-white rounded-full mr-3'/>Continue with Google</button>
    </div>
  )
}

export default OAuthh
