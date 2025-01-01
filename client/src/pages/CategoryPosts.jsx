import React, { useState } from 'react'
import { DUMMY_POSTS } from '../data'
import PostItem from '../components/PostItem'

const CategoryPosts = () => {
  const [categoryPosts, setCategoryPosts] = useState(DUMMY_POSTS)
  return (
    <section className="posts">
    { categoryPosts.length > 0 ? ( <div className="container posts__container">
     {
         categoryPosts.map(({id, thumbnail, category, title, description, authorID})=> <PostItem key={id} postID={id} thumbnail={thumbnail} category={category} title={title} description={description} authorID={authorID} />)
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