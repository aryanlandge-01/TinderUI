import axios from 'axios'
import React, { useEffect } from 'react'
import {BASE_URL} from "../utils/constant"
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
  const feed = useSelector(store => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if(feed) return;

    try {
      const res = await axios.get(BASE_URL  + "/feed",{
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (error) {
      console.log(error)
    }

  }
  
  useEffect(() => {
    getFeed();

  },[])

  if(!feed) return;

  if(feed.length === 0) return <h1 className='my-20 text-9xl text-center'>No new users Found</h1>


  return feed && (
    <div className='flex items-center justify-center min-h-[600px]'>
       <UserCard user={feed[0]}/>
    </div>
  )
}

export default Feed