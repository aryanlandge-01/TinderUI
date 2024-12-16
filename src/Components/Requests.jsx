import axios from 'axios'
import React from 'react'
import {BASE_URL} from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests,removeRequest } from '../utils/requestSlice';
import { useEffect } from 'react';
import moment from 'moment';

const Requests = () => {

  const dispatch = useDispatch();
  const requests = useSelector(store => store.requests)

  const fetchRequests = async () => {
     try {
      const res = await axios.get(BASE_URL + "/user/request/receive",{
        withCredentials: true
      });
      
      dispatch(addRequests(res.data.data))

     } catch (error) {
      
     }
  }

  const reviewRequest = async (status,_id) => {
    try {
      const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id,{},{
        withCredentials: true
      });

      dispatch(removeRequest(_id))

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchRequests();
  },[])

  if(!requests) return;

  if(requests.length === 0) return <h1>No Requests Found.</h1>


  return (
    requests.map((request) => {
      const { _id,firstName, lastName, age, photoUrl } = request.fromUserId;
      const timeReceived = moment(request.createdAt).fromNow();
    
      return (
        <div
          key={_id}
          className="bg-base-200 flex justify-between items-center p-4 m-4 rounded-lg shadow-md max-w-sm sm:max-w-md lg:max-w-lg mx-auto"
          style={{ minHeight: '150px' }}
        >
          <div className="flex flex-col justify-start">
            <p className="text-lg font-bold">{firstName}</p>
            <p className="text-lg font-bold">{lastName}</p>
            <p className="text-base">Age: {age}</p>
            <p className="text-sm font-semibold  text-gray-500">Received: {timeReceived}</p>
            <div className="flex space-x-2 mt-2">
              <button
               onClick={() => reviewRequest("accepted",request._id)}
               className="bg-green-500 text-white px-4 py-2 rounded">Accept</button>
              <button
              onClick={() => reviewRequest("rejected",request._id)}
              className="bg-red-500 text-white px-4 py-2 rounded">Reject</button>
            </div>
          </div>
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
      );
    })
  )
}

export default Requests