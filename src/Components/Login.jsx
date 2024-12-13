import axios from 'axios';
import React, { useState } from 'react'

const Login = () => {

  const [emailId,setEmailId] = useState("akshaysaini@gmail.com");
  const [password,setPassword] = useState("Akshay@1938");

  const handleLogin = async () => {
    try {

      const res = await axios.post("http://localhost:3000/login",{
        emailId,
        password,
      },
      {
        withCredentials: true
      }
    );


    } catch (error) {
      console.log(error)
    }

  }

  

  return (
    <div className='flex items-center justify-center min-h-[600px] '>
    <div className="card bg-base-300 w-96 shadow-xl">
    <div className="card-body">
    <h2 className="card-title justify-center">Login</h2>
    <div>
    <label className="form-control w-full max-w-xs my-2">
    <div className="label">
      <span className="label-text">Email ID</span>
    </div>
    <input 
    type="text" 
    value={emailId}
    onChange={(e) => setEmailId(e.target.value)}
    className="input input-bordered w-full max-w-xs" />
    </label>
    <label className="form-control w-full max-w-xs my-2">
    <div className="label">
      <span className="label-text">Password</span>
    </div>
    <input 
    type="text" 
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="input input-bordered w-full max-w-xs" />
    </label>
    </div>
    <div className="card-actions justify-center">
      <button onClick={handleLogin} className="btn btn-primary">Login</button>
    </div>
    </div>
</div>
    </div>
  )
}

export default Login;