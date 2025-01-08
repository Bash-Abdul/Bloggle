import React, { useEffect, useState, useContext } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import {UserContext} from '../context/userContext'
import { toast } from 'react-toastify';

const EditPosts = () => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Uncategorized');
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState('');

  const [error, setError] = useState('')
  const navigate = useNavigate();

  const {currentUser, token} = useContext(UserContext);

  const POST_CATEGORIES = [
    "Agriculture", "Business", "Education", "Entertainment", "Art", "Investment","Uncategorized", "Weather"
  ]

  const modules = {
    toolbar: [
      [{'header': [1, 2, 3,4,5,6, false]}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list':'bullet'}, {'indent':'-1'}, {'indent':'+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]


  useEffect(()=>{
    if(!token){
      navigate('/login');
    }
  }, [])

  const {id} = useParams();

  useEffect(()=>{
    const getPost = async () =>{
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${id}`)
        setTitle(response.data.title);
        setDescription(response.data.description);
      } catch (err) {
        console.log(err)
      }
    }

    getPost();
  }, [])


  const editPost = async (e) =>{
    e.preventDefault();
    setError('');
    const postData = new FormData();

    postData.set('title', title)
    postData.set('category', category)
    postData.set('description', description)
    postData.set('thumbnail', thumbnail)

    try {
      const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/posts/${id}`, postData, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
      if(response.status == 200){
        toast.success("Post edited successfully", {
          // position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000, // Time in ms before it auto-closes
        });
        return navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occured, Try Again.')
    }
  }

  return (
    <section className="create-post">
      <div className="container">
        <h2>Edit Post</h2>
        {
          error && <p className="form__error-message">
          {error}
        </p>
        }

        <form action="" className="form create-post__form" onSubmit={editPost}>
          <input type="text" placeholder='Title' value={title} onChange={e=> setTitle(e.target.value)}  autoFocus/>

          <select name="category" value={category} onChange={e=> setCategory(e.target.value)}>
            {
              POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)
            }
          </select>
          <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription} />
          <input type="file" onChange={e=> setThumbnail(e.target.files[0])} accept='png, jpg, jpeg' />
          <button type='submit' className='btn primary'>Update Post</button>
        </form>
      </div>
    </section>
  )
}

export default EditPosts