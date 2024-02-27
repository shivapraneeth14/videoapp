import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {client,databases, account } from './Appwrite/Storage';

function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [user,setuser] =useState({
   email:"",
   password:""   
  })


  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await account.createEmailSession(user.email, user.password);
      console.log("login done");
      console.log(res);
      navigate("/Home");
    } catch (err) {
      console.error(err);
      setError("Failed to login. Please check your credentials.");
    }
  };

  return (
    <div className='flex justify-center mt-8 items-center'>
      <div className='text-center pt-4 flex flex-col px-10 w-72 h-72 bg-gray-800'>
        <form onSubmit={onSubmit}>
          <h1>Login</h1>
          <input
           onChange={(e) => setuser({ ...user, email: e.target.value })}
           className='pl-1 mt-10'  placeholder='Email' type='email' />
          <input
           onChange={(e) => setuser({ ...user, password: e.target.value })} 
          className='pl-1 mt-8' placeholder='enter password' type='password' />
          <button type='submit' className='mt-8 w-24 h-10 bg-blue-900'>Login</button>
          <Link to='/Signup'>
            <p className='text-xs text-white'>create account</p>
          </Link>
        </form>
       
      </div>
    </div>
  );
}

export default Login
