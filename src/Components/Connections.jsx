import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {BASE_URL} from '../utils/constant';
import {addConnections} from "../utils/connectionSlice"

const Connections = () => {
  const [err,setErr] = useState("");
  const dispatch = useDispatch();
  const connections = useSelector(store => store.connections)


  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections",{
        withCredentials: true
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      setErr(error?.response?.data)
    }
  }


  useEffect(() => {
    getConnections()
  }, [])

  if (!connections) return;

  if(connections.length === 0) return <h1>No Connections Found!!!</h1>
  
  return (
    <div>
      <h1 className='text-center font-semibold font-serif text-5xl bg-base-200 p-5 text-white'>Connections</h1>
      {connections.map((connection) => {
        const {_id,firstName,lastName,age,gender,photoUrl,about}  = connection;

        return (
          <div key={_id} className="my-2 p-4 flex flex-col rounded-2xl md:flex-row gap-20 justify-center items-center bg-base-200 max-w-screen-sm mx-auto">
          <img
            src={photoUrl}
            className="max-w-40 rounded-lg shadow-2xl" 
            alt="Profile"
          />
          <div className="text-center md:text-right">
            <h1 className="text-5xl font-bold mb-2">{firstName}!</h1>
             <p className='text-lg font-semibold mb-2'>
              Age: {age}
             </p>
             <p className='text-lg font-semibold mb-2'>
              Gender: {gender}
             </p>
             <button className="btn btn-primary ">View Profile</button>
          </div>
          </div>
        
        )
      })}
    </div>
  )
}

export default Connections;