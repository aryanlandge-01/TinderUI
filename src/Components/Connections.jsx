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
      console.log(res)
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
        const {firstName,lastName,age,gender,photoUrl,about}  = connection;

        return (
          <div className="hero bg-base-300 min-h-svh">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={photoUrl}
            className="max-w-sm rounded-lg shadow-2xl" />
        <div>
        <h1 className="text-5xl font-bold">{firstName}!</h1>
        <p className="py-6">
          {about}
        </p>
        <button className="btn btn-primary">Connected</button>
     </div>
    </div>
        </div>
        )
      })}
    </div>
  )
}

export default Connections;