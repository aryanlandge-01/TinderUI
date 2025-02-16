import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {BASE_URL} from "../utils/constant";
import {removeUser} from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector(store => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async() => {
    try {
      await axios.post(BASE_URL + "/logout",{},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      navigate("/login");

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="navbar bg-base-300">
  <div className="flex-1">
    <Link to={"/"} className="btn btn-ghost text-2xl">💞 Tinder</Link>
  </div>
  <div className="flex-none gap-2">
    {user && (
      <div className="mx-8 dropdown dropdown-end flex">
        <p className='font-bold m-3 text-xl'>Welcome, {user.firstName}</p>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="user photo"
            src={user.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to={"/profile"} className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li>
          <Link to={"/connections"}>Connections</Link >
        </li>
        <li>
          <Link to={"/requests"}>Requests</Link >
        </li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
    )}
  </div>
    </div>
  )
}

export default Navbar;