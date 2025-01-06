import React, { useState, useEffect } from 'react'
import { DUMMY_POSTS } from '../data'
import PostItem from '../components/PostItem'
import Loader from "../components/Loader";
import axios from 'axios'
import { useParams } from "react-router-dom";

const CategoryPosts = () => {
  const [categoryPosts, setCategoryPosts] = useState([]);

  const {category} = useParams();
  const {error, setError} = useState('')
  const [loader, setLoader] = useState(false)


  useEffect(()=>{
    const fetchPosts = async () =>{
      setLoader(true);

      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/categories/${category}`);
        const post = response?.data
        setCategoryPosts(post)
      } catch (err) {
        // setError(err);
        console.log(err);
      }

      setLoader(false);
    }

    fetchPosts();
  }, [category])

  if(loader){
    return <Loader/>
  }
  return (
    <section className="posts">
    { categoryPosts.length > 0 ? ( <div className="container posts__container">
     {
         categoryPosts.map(({id, thumbnail, category, title, description, creator, createdAt})=> <PostItem key={id} postID={id} thumbnail={thumbnail} category={category} title={title} description={description} authorID={creator} createdAt={createdAt} />)
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

export default CategoryPosts