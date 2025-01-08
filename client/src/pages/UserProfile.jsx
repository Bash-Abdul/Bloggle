import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../assets/avatar15.jpg'
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { UserContext } from '../context/userContext';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const [avatar, setAvatar] = useState('')
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [error, setError] = useState('');
  const [avatarAttached, setAvatarAttached] = useState(false);

  const { currentUser, token, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();


  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/${currentUser.id}`, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })
      const { name, email, avatar } = res.data
      setName(name);
      setEmail(email);
      setAvatar(avatar);
    }

    getUser();
  }, [])

  const changeAvatarHandler = async () => {
    setAvatarAttached(false);

    try {
      const postData = new FormData();
      postData.set('avatar', avatar)
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/replace-avatar`, postData, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })
      setAvatar(res?.data.avatar)
    } catch (err) {
      console.log(err)
    }
  }


  const updateUserDetails = async (e) => {
    e.preventDefault();

    try {
      const userData = new FormData();
      userData.set('name', name);
      userData.set('email', email);
      userData.set('currentPassword', currentPassword);
      userData.set('newPassword', newPassword);
      userData.set('confirmNewPassword', confirmNewPassword)

      const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/users/edit-user`, userData, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })

      if (response.status == 200) {
        // log out user so user logs in with newly updated details
        navigate('/logout');
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  const deleteAccount = async () => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/users/delete-user/${currentUser._id}`, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}});
      if(res.status == 200){
        setCurrentUser(null);
        toast.success("User deleted successfully", {
          // position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000, // Time in ms before it auto-closes
        });
        navigate('/login')
      }
      else{
        toast.error("Error deleting user account.", {
          autoClose: 2000,
        });
      }
    } catch (err) {
      toast.error(`${err.response?.data?.message}` || "Something went wrong", {
        // position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000, // Time in ms before it auto-closes
      });
    }
  }



  return (
    <section className='profile'>
      <div className="container profile__container">
        <Link to={`/myposts/${currentUser.id}`} className='btn'>My Posts</Link>

        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${avatar}`} alt="" />
            </div>
            {/* FORM TO UPDATE AVATAR */}
            <form className='avatar__form'>
              <input type="file" name="avatar" id="avatar" onChange={e => setAvatar(e.target.files[0])} accept='png, jpg, jpeg' />
              <label htmlFor="avatar" onClick={() => setAvatarAttached(true)}><FaEdit /></label>
            </form>
            {
              avatarAttached && <button className='profile__avatar-btn' onClick={changeAvatarHandler}><FaCheck /></button>
            }
          </div>

          <h1>{currentUser.name}</h1>
          <button className='btn danger other' onClick={deleteAccount}>Delete Account</button>


          {/* USER DETAILS FORM */}
          <form action="" className="form profile__form" onSubmit={updateUserDetails}>
            {
              error && <p className="form__error-message">
                {error}
              </p>
            }

            <input type="text" placeholder='Full Name' name='name' value={name} onChange={e => setName(e.target.value)} />
            <input type="email" placeholder='Email' name='email' value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder='Current Password' value={currentPassword} onChange={e => setCurrrentPassword(e.target.value)} />
            <input type="password" placeholder='New Password' value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            <input type="password" placeholder='Confirm New Password' value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} />

            <button type='submit' className='btn primary'>Update Details</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default UserProfile