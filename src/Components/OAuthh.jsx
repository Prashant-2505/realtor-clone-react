import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getDoc, serverTimestamp, setDoc,doc } from 'firebase/firestore'
import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import { toast } from 'react-toastify'
import {db} from '../firebase'
import {useNavigate} from 'react-router-dom'

function OAuthh() {

const navigate = useNavigate()

  async function onGoogleClick()
  {
   try {
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
     const result = await signInWithPopup(auth,provider)
     const user = result.user
     
     // check for ruser already exist or not
     const docRef = doc(db, 'users',user.uid)
     const docSnap = await getDoc(docRef)

     if(!docSnap.exists())
     {
      await setDoc(docRef,{
        name:user.displayName,
        email:user.email,
        timestamp: serverTimestamp(),
      })
     }
     navigate('/')

   } 
   catch (error) {
    toast.error('could not authorize with google')
   console.log(error)
   }
  }
  return (
    <div>
      <button type='button' onClick={onGoogleClick} className='flex items-center justify-center w-full bg-red-600 text-white px-7 py-3 uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg transition duration-200 ease-in-out rounded-sm'> <FcGoogle className='text-2xl bg-white rounded-full mr-3'/>Continue with Google</button>
    </div>
  )
}

export default OAuthh
