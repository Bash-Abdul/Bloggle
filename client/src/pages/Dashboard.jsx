import React, { useState, useEffect } from 'react'
import {DUMMY_POSTS} from '../data'
import {Link, useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import { useContext } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import DeletePosts from './DeletePosts'




const Dashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const {id} = useParams();

  const {userCurrent, token} = useContext(UserContext);

  useEffect(()=>{
    const fetchPost = async () =>{
      setIsLoading(true);

      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/user-post/${id}`, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
        setPosts(res.data)
      } catch (error) {
        console.log(error)
      }

      setIsLoading(false);
    }

    fetchPost();
  }, [id])

  if(isLoading){
    return <Loader/>
  }

  return (
    <section>
      {
        posts.length ? (<div className="container dashboard__container">
          {
            posts.map(post => {
              return <article key={post.id} className='dashboard__post'>
                <div className="dashboard__post-info">
                  <div className="dashboard__post-thumbnail">
                    <img src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${post.thumbnail}`} alt="" />
                  </div>

                  <h5>{post.title}</h5>
                </div>

                <div className="dashboard__post-actions">
                  <Link to={`/posts/${post._id}`} className='btn sm'>View</Link>
                  <Link to={`/posts/${post._id}/edit`} className='btn sm primary'>Edit</Link>
                  {/* <Link to={`/posts/${post._id}/delete`} className='btn sm danger'>Delete</Link> */}
                  <DeletePosts postId={post._id} />
                </div>
              </article>
            })
          }
        </div> ): <h2 className="center">You have no posts</h2>
      }
    </section>
  )
}

export default Dashboard