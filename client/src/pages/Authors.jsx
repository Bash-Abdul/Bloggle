import React, { useEffect, useState } from 'react'

import Avatar1 from '../assets/avatar1.jpg'
import Avatar2 from '../assets/avatar2.jpg'
import Avatar3 from '../assets/avatar3.jpg'
import Avatar4 from '../assets/avatar4.jpg'
import Avatar5 from '../assets/avatar5.jpg'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import axios from 'axios'

const authorData = [
  {
    id: 1,
    avatar: Avatar1,
    name: 'Bash Abdul',
    posts: 3
  },
  {
    id: 2,
    avatar: Avatar2,
    name: 'Nabeelah',
    posts: 5
  },
  {
    id: 3,
    avatar: Avatar3,
    name: 'Simeone',
    posts: 0
  },
  {
    id: 4,
    avatar: Avatar4,
    name: 'Miguel',
    posts: 2
  },
  {
    id: 5,
    avatar: Avatar5,
    name: 'Ava',
    posts: 1
  }
]

const Authors = () => {
  const [authors, setAuthors] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    const getAuthors = async () =>{
      setIsLoading(true)

    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users`);
      const authorsGotten = res?.data
      setAuthors(authorsGotten);
    } catch (err) {
      console.log(err)
    }

    setIsLoading(false)
    }

    getAuthors();
  }, [])

  if(isLoading){
    return <Loader/>
  }
  return (
    <section className='authors'>

      {
        authors.length > 0 ? (
          <div className="container authors__container">
            {
              authors.map(({_id: id, avatar, name, posts})=> {
                return <Link key={id} to={`/posts/users/${id}`} className='author'>
                  <div className="author__avatar">
                    <img src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${avatar}`} alt={`Image of ${name}`} />
                  </div>

                  <div className="author__info">
                    <h4>{name}</h4>
                    <p>{posts} posts</p>
                  </div>
                </Link>
              })
            }
          </div>
        ) : 
          <h2 className='center'>
                No Users/Authors found
          </h2>
        
      }
    </section>
  )
}

export default Authors