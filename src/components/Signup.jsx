import React from 'react'
import { useNavigate } from "react-router-dom";

import { account } from './Appwrite/Storage';
import { useState } from 'react';


function Signup() {
  const navigate = useNavigate();
  const [error,setError] = useState("")
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const isValidEmail = (email) => {
   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (!isValidEmail(user.email)) {
      console.log("Invalid email address");
      return;
    }

    const promise = await account.create(
      user.name,
      user.email,
      user.password
    );

    promise.then(
      (res) => {
        console.log(res);
        navigate("/");
      },
      (err) => {
        setError(err)
        console.log("error is",err);
      }
    );
  };

  return (
    <div className=' mt-10 flex justify-center items-center'>
    <div className=" text-center flex flex-col">
      <div className=" w-72 h-64 bg-slate-700 register">
        <h2 className=' text-2xl'>Register</h2>
        <form className=' flex flex-col justify-center items-center' onSubmit={registerUser}>
          <div className=' mt-3 flex'>
          <label htmlFor="name">Name: </label>
          <input className=' ml-2 '
            type="text"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          </div>
          <div className=' mt-3 flex'>
          <label className='' htmlFor="email">Email: </label>
          <input  className=' ml-2 '
            type="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          </div>
          <div className=' flex mt-3'>
          <label htmlFor="password">Password: </label>
          <input  className=' ml-2 '
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          </div>
          <button className=' mt-3 w-24 rounded-lg bg-red-500' type="submit">Register</button>
          <p>Already an user?</p>
          <button onClick={()=>navigate('/')}>Login</button>
        </form>
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </div>
    </div>
  );
}

export default Signup
