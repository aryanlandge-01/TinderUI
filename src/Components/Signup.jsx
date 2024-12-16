import React from 'react';
import { useEffect,useState } from 'react';
import login_bg from '../assets/login_bg.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Signup = () => {
    const [emailId,setEmailId] = useState("");
    const [password,setPassword] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [age,setAge] = useState("");
    const [gender,setGender] = useState(""); 
    const [photoUrl,setPhotoUrl] = useState("");
    const [about,setAbout] = useState("");
    const [err,setErr] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlesignup = async () => {
        setErr("");

        try {
            const res = await axios.post(BASE_URL + "/signup",{
                emailId,
                password,
                firstName,
                lastName,
                age,
                photoUrl,
                gender,
                about,
            },{
                withCredentials: true
            });

            dispatch(addUser(res?.data?.data));

            navigate("/");


        } catch (error) {
            setErr(error?.response?.data || "something went wrong")
        }
    }

    // useEffect(() => {

    // },[])

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10"  style={{ backgroundImage: `url(${login_bg})` }}>
      <div className="flex items-center justify-center  overflow-y-scroll h-svh">
        <div className="card bg-base-300 w-96 shadow-xl bg-opacity-80 h-auto max-h-96 overflow-y-auto">
      <div className="card-body">
        <h2 className="card-title justify-center">Signup</h2>
        <div>
        <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text">FirstName</span>
            </div>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text">LastName</span>
            </div>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text">Age</span>
            </div>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
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
          <label className="form-control w-full max-w-xs my-2">
          <div className="label">
            <span className="label-text">Gender</span>
          </div>
          <select 
            value={gender}
            onChange={(e) => setGender(e.target.value)} 
            className="select select-bordered w-full max-w-xs">
            <option value="" disabled selected>what is your gender?</option>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="others">others</option>
           </select>
          </label>
          <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text">PhotoUrl</span>
            </div>
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text">About</span>
            </div>
            <textarea
              value={about}
              onChange={e => setAbout(e.target.value)}
              className="textarea textarea-bordered" placeholder="About"></textarea>
          </label>
        </div>
        <p className="text-red-600">{err}</p>
        <div className="card-actions justify-center">
          <button onClick={handlesignup} className="btn btn-primary">Sign up</button>
        </div>
        <p className='text-center font-semibold'>Already have and account?<Link to={"/login"} className=' text-purple-400'> Login!</Link> </p>
      </div>
        <p className='text-red-400'>{err}</p>
    </div>
      </div>
    </div>
  )
}

export default Signup