import React from 'react'

const UserCard = ({user}) => {
    // console.log(user)
    const {firstName,lastName,photoUrl,age,gender,about} = user;
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
        <button className="btn btn-primary mx-5">Ignore</button>
        <button className="btn btn-secondary mx-5">Interested</button>
      </div>
    </div>
  </div>
  )
}

export default UserCard