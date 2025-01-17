import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import { toast } from 'react-toastify';

const DeletePosts = ({postId: id}) => {

  const {currentUser,token} = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const removePost = async (e) =>{
    setIsLoading(true)
    try {
      const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/posts/${id}`, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
      if(res.status == 200){
        toast.success("Post deleted successfully", {
          // position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000, // Time in ms before it auto-closes
        });
        if(location.pathname == `/myposts/${currentUser?._id}`){
          navigate(0)
        }else{
          navigate('/')
        }
      }
      setIsLoading(false)
    } catch (error) {
      console.log("Couldn't delete post");
      toast.error("Couldn't delete post", {
        // position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000, // Time in ms before it auto-closes
      });
    }

    
  }

  if(isLoading){
    return <Loader/>
  }

  const location = useLocation();


  return (
    <Link className='btn sm danger' onClick={()=> removePost(id)}>Delete</Link>
  )
}

export default DeletePosts