import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../assets/avatar1.jpg'

const PostAuthor = ({authorID}) => {
  return (
    <Link to={`/posts/users/${authorID}`} className='post__author'>
      <div className="post__author-avatar">
        <img src={Avatar} alt="avatar image" />
      </div>

      <div className="post__author-details">
        <h5>By: Bash Abdul</h5>
        <small>Just Now</small>
      </div>
    </Link>
  )
}

export default PostAuthor