import React, { useEffect, useState } from 'react'
import PostItem from './PostItem'
import { DUMMY_POSTS } from '../data'
import Loader from './Loader'
import axios from 'axios'

const Posts = () => {
    const [posts, setPosts] = useState([])
    const {error, setError} = useState('')
    const [loader, setLoader] = useState(false)

    useEffect(()=>{
      const fetchPosts = async () =>{
        setLoader(true);

        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts`);
          const post = response?.data
          setPosts(post)
        } catch (err) {
          // setError(err);
          console.log(err);
        }

        setLoader(false);
      }

      fetchPosts();
    }, [])

    if(loader){
      return <Loader/>
    }
  return (
    <section className="posts">
       { posts.length > 0 ? ( <div className="container posts__container">
        {
            posts.map(({_id: id, thumbnail, category, title, description, creator, createdAt})=> <PostItem key={id} postID={id} thumbnail={thumbnail} category={category} title={title} description={description} authorID={creator} createdAt={createdAt} />)
        }
        </div> ) : (
            <h2 className='center'>
                No Posts Found
            </h2>
        )

    }
    </section>

  )
}

export default Posts
