import axios from 'axios';
import React from 'react';
import {BASE_URL} from "../utils/constant"
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';

const UserCard = ({user}) => {

  const dispatch = useDispatch();


  const handleSendRequest = async (status,userId) => {
    try {
      const res = await axios.post(BASE_URL+ "/request/send/" + status + "/" + userId,{},{
        withCredentials: true
      })

      dispatch(removeFeed(userId))


    } catch (error) {
      console.log(error);
    }
  }


    
    
  const {_id,firstName,lastName,photoUrl,age,gender,about} = user;
  return (
  <div className="card card-compact bg-base-100 w-96 shadow-xl">
    <figure>
      {photoUrl && 
      <img
       src={user.photoUrl}
       alt="photo" 
      />}
   </figure>
   <div className="card-body">
      <h2 className="card-title">{firstName + " " + lastName}</h2>
      {age && gender && <p>{age + " " + gender}</p>}
      <p>{about}</p>
      <div className="card-actions justify-center m-4 ">
        <button onClick={() => handleSendRequest("ignored",_id)} className="btn btn-primary mx-5">Ignore</button>
        <button
         onClick={() => handleSendRequest("interested",_id)} 
         className="btn btn-secondary mx-5">Interested</button>
      </div>
    </div>
  </div>
  )
}

export default UserCard