import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux';


const Profile = () => {
  const user = useSelector(store => store.user)
  
  return (
    <div>
      <EditProfile user={user}/>
      {/* <h1>This is profile of {user?.firstName}</h1> */}
    </div>
  )
}

export default Profile