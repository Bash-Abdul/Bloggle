import React, {useContext, useEffect, useState} from 'react'
import PostAuthor from '../components/PostAuthor'
import { Link, useParams } from 'react-router-dom'
import Thumbnail1 from '../assets/blog1.jpg'
import { UserContext } from '../context/userContext'
import DeletePosts from './DeletePosts'
import Loader from '../components/Loader'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const PostDetail = () => {

  const {id} = useParams()
  const [post, setPost] = useState(null)
  const [author, setAuthorId] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false);

  const {currentUser} = useContext(UserContext);
  const navigate = useNavigate();


  useEffect(()=>{
    const getPost = async ()=>{
      setIsLoading(true)

      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${id}`);
        setPost(res.data)
        setAuthorId(res.data.creator)
      } catch (err) {
        setError(err)
      }
      setIsLoading(false)
    }

    getPost();
  }, [])

  if(isLoading){
    return <Loader/>
  }

  const goToEditPage = async () => {
    await navigate(`/posts/${post?._id}/edit`); // Absolute path
  };




  return (
    <section className="post-detail">
      {
        error && <p className='error'>{error}</p>
      }
      {
        post && <div className="container post-detail__container">
        <div className="post-detail__header">
          <PostAuthor authorID={author} createdAt={post.createdAt}/>
          {
            currentUser?.id == post?.creator && <div className="post-detail__buttons">
            <button className='btn sm primary' onClick={goToEditPage}>Edit</button>
            <DeletePosts  postId={id}/>
          </div>
          }
        </div>

        <h1>{post.title}</h1>

        <div className="post-detail__thumbnail">
          <img src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${post.thumbnail}`} alt="Post Detail Image" />
        </div>

        <p dangerouslySetInnerHTML={{__html: post.description}}>

        </p>
      </div>
      }
    </section>
  )
}

export default PostDetail