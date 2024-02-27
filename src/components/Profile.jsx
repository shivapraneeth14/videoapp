import React, { useEffect, useState } from 'react'
import { account } from './Appwrite/Storage'
import { Navigate, useNavigate } from 'react-router-dom'
import { set } from 'react-hook-form'

function Profile() {
 const [userdetails,setuserdetails] = useState({})
 const navigate = useNavigate()


 useEffect(() => {
  const getdata = account.get()
  getdata.then((res)=>{
    console.log(res)
    setuserdetails(res)
  },
  (err)=>{
    console.log(err)
  }
  )
}, []);

const Logoutuser= ()=>{
  try {
    const out =  account.deleteSession("current")
    navigate("/")

  } catch (error) {
    console.log(error)
    
  }

}

  return (
    <div className=' absolute flex justify-center items-center'>
     <div className=' px-5 pt-5 w-80 h-80 bg-slate-600'>
      <div ><p className=' text-2xl text-black'>email:</p><p className='  text-xl text-white'>{userdetails.email}</p></div>
      <div ><p className=' text-2xl text-black'>username:</p><p className=' text-xl text-white'>{userdetails.$id}</p></div>
      <button onClick={Logoutuser} className=' relative bottom-0 left-20 w-24 h-11 bg-zinc-400'>Logout</button>
      </div>
    </div>
  )
}
export default Profile
