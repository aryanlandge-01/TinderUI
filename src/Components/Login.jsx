import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';
import login_bg from '../assets/login_bg.jpeg'

const Login = () => {

  const [emailId,setEmailId] = useState("");
  const [password,setPassword] = useState("");
  const [err,seterr] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const handleLogin = async () => {
    
    try {

      const res = await axios.post( BASE_URL + "/login",{
        emailId,
        password,
      },
      {
        withCredentials: true
      }
    );
    dispatch(addUser(res.data));
    return navigate("/");

    } catch (error) {
      seterr(error?.response?.data || "Something went wrong.")
     
    }

  }

  return (
<div className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10"  style={{ backgroundImage: `url(${login_bg})` }}>
  <div className="flex items-center justify-center h-full">
    <div className="card bg-base-300 w-96 shadow-xl bg-opacity-80">
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
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>
        <p className="text-red-600">{err}</p>
        <div className="card-actions justify-center">
          <button onClick={handleLogin} className="btn btn-primary">Login</button>
        </div>
        <p className='text-center font-semibold'>New user?<Link to={"/signup"} className=' text-purple-400'> Create an account!</Link> </p>
      </div>
    </div>
  </div>
</div>
  )
}

export default Login;