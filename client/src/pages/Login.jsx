import React, { useState, useContext } from 'react'
import { Link, Links, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../context/userContext'
import { toast } from 'react-toastify';


const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState();

  const {currentUser, setCurrentUser} = useContext(UserContext)

  const navigate = useNavigate()

  const changeInputHandler =(e)=>{
    setUserData(prevState => {
      return{...prevState, [e.target.name]: e.target.value}
    })
  }


  const loginUser = async (e) =>{
    e.preventDefault();
    setError('')

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

      const user = await response.data
      setCurrentUser(user);
      console.log(user)
      console.log("login successful");
      toast.success("login successful", {
        // position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000, // Time in ms before it auto-closes
      });
      navigate('/')
    } catch (err) {
      setError(err.response.data.message)
    }
  }
  return (
    <section className="register" onSubmit={loginUser}>
      <div className="container">
        <h2>Sign In</h2>

        <form className="form register__form">
          {
            error && <p className='form__error-message'> {error} </p>
          }
          
          <input type="email" placeholder='Email' name='email' value={userData.email} onChange={changeInputHandler} autoFocus />
          <input type="password" placeholder='Password' name='password' value={userData.password} onChange={changeInputHandler} />

          <button type='submit' className='btn primary'>Login</button>
        </form>

        <small>Don't have an account <Link to={'/signup'}>Sign up</Link></small>
      </div>
    </section>
  )
}

export default Login