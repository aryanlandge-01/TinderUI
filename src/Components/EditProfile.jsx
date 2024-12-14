import React from 'react';
import { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserCard from './UserCard'
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { addUser } from '../utils/userSlice';


const EditProfile = ({user}) => {
    if (!user) return;

    const [firstName,setFirstName] = useState(user.firstName)
    const [lastName,setLastName] = useState(user.lastName);
    const [age,setAge] = useState(user.age);
    const [gender,setGender] = useState(user.gender);
    const [about,setAbout] = useState(user.about);
    const [photoUrl,setPhotoUrl] = useState(user.photoUrl);
    const [skills,setSkills] = useState([])
    const [err,setErr] = useState("");
    const [toast,setToast] = useState(false);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

   

    const saveProfile = async () => {
      setErr("");
      try {
        const res = await axios.patch(BASE_URL + "/profile/edit",{
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl
        },{
          withCredentials: true,
        }
        );
        dispatch(addUser(res?.data?.data))
        setToast(true);
        setTimeout(() => {
          setToast(false)
        }, 3000);
      } catch (error) {
        setErr(error?.response?.data || "something went wrong")
      }
    }


  return (
    <>
    {
       toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
              <span>Profile Saved Successfully.</span>
          </div>
          </div>
       )
    }
    <div className='flex justify-center my-10 gap-14'>
      <UserCard user={{firstName,lastName,age,gender,about,photoUrl}}/>
      <div className='flex items-center justify-center min-h-[600px] '>
    <div className="card bg-base-300 w-96 shadow-xl">
    <div className="card-body">
    <h2 className="card-title justify-center">Edit Profile</h2>
    <div>
    <label className="form-control w-full max-w-xs my-2">
    <div className="label">
      <span className="label-text">FirstName</span>
    </div>
    <input 
    type="text" 
    value={firstName}
    onChange={(e) => setFirstName(e.target.value)}
    className="input input-bordered w-full max-w-xs" />
    </label>
    <label className="form-control w-full max-w-xs my-2">
    <div className="label">
      <span className="label-text">lastName</span>
    </div>
    <input 
    type="text" 
    value={lastName}
    onChange={(e) => setLastName(e.target.value)}
    className="input input-bordered w-full max-w-xs" />
    </label>
    <label className="form-control w-full max-w-xs my-2">
    <div className="label">
      <span className="label-text">Age</span>
    </div>
    <input 
    type="text" 
    value={age}
    onChange={(e) => setAge(e.target.value)}
    className="input input-bordered w-full max-w-xs" />
    </label>
    <label className="form-control w-full max-w-xs my-2">
    <div className="label">
      <span className="label-text">Gender</span>
    </div>
    {/* <input 
    type="text" 
    value={gender}
    onChange={(e) => setGender(e.target.value)}
    className="input input-bordered w-full max-w-xs" /> */}
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
      <span className="label-text">About</span>
    </div>
    <textarea
     value={about}
     onChange={e => setAbout(e.target.value)}
     className="textarea textarea-bordered" placeholder="About"></textarea>
    </label>
    <label className="form-control w-full max-w-xs my-2">
    <div className="label">
      <span className="label-text">PhotoUrl</span>
    </div>
    <input 
    type="text" 
    value={photoUrl}
    onChange={(e) => setPhotoUrl(e.target.value)}
    className="input input-bordered w-full max-w-xs" />
    </label>
    <label className="form-control w-full max-w-xs my-2">
    <div className="label">
      <span className="label-text">Skills</span>
    </div>
    <input 
    type="text" 
    value={skills}
    onChange={(e) => setPhotoUrl(e.target.value)}
    className="input input-bordered w-full max-w-xs" />
    </label>
    </div>
    <p className='text-red-600'>{err}</p>
    <div className="card-actions justify-center">
      <button onClick={saveProfile} className="btn btn-primary">Save Profile</button>
    </div>
    </div>
    </div>
      </div>
    </div>
    </>
  )
}

export default EditProfile