import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/thumbnail.jpg'
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from 'react-icons/ai'
import "../index.css"
import { UserContext } from '../context/userContext';

const Header = () => {
  const [navToggle, setNavToggle] = useState(window.innerWidth > 800 ? true : false);
  const { currentUser } = useContext(UserContext);



  const closeNav = () => {
    window.innerWidth < 800 ? setNavToggle(false) : setNavToggle(true)
  }
  return (
    <nav>
      <div className="container nav__container">
        <Link to={"/"} onClick={closeNav}>
          <img src={Logo} alt='Navbar Logo' className='nav_logo' />
        </Link>

        {currentUser?.id &&
          navToggle && (
            <ul className='nav__menu'>
              <li><Link to={`/profile/${currentUser.id}`} onClick={closeNav}>{currentUser?.name}</Link></li>
              <li><Link to={'/create'} onClick={closeNav}>Create Post</Link></li>
              <li><Link to={'/authors'} onClick={closeNav}>Authors</Link></li>
              <li><Link to={'/logout'} onClick={closeNav}>Logout</Link></li>
            </ul>
          )
        }

        {!currentUser?.id &&
          navToggle && (
            <ul className='nav__menu'>
              <li><Link to={'/authors'} onClick={closeNav}>Authors</Link></li>
              <li><Link to={'/login'} onClick={closeNav}>Login</Link></li>
            </ul>
          )
        }

        <button className='nav__toggle-btn' onClick={() => setNavToggle(!navToggle)}>
          {
            navToggle ? <AiOutlineClose /> : <FaBars />
          }
        </button>
      </div>
    </nav>
  )
}

export default Header