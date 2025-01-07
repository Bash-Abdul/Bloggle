import React from 'react'
import { useContext, useEffect } from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Logout = () => {
  const {setCurrentUser, currentUser} = useContext(UserContext)
  const navigate = useNavigate();

  setCurrentUser(null);
  if(!currentUser) {
    toast.success("Logged out", {
      // position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000, // Time in ms before it auto-closes
    });
  }
  navigate('/login')
  return (
    <></>
  )
}

export default Logout