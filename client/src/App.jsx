import React from "react"
import { Outlet } from 'react-router-dom'
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header"
import Footer from "./components/Footer"
import ErrorPage from './pages/ErrorPage'
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import Register from './pages/Register'
import Login from './pages/Login'
import UserProfile from './pages/UserProfile'
import Authors from "./pages/Authors";
import CreatePosts from "./pages/CreatePosts";
import CategoryPosts from "./pages/CategoryPosts";
import AuthorPosts from "./pages/AuthorPosts";
import Dashboard from "./pages/Dashboard";
import EditPosts from "./pages/EditPosts";
import Logout from "./pages/Logout";
import "./index.css";
import DeletePosts from "./pages/DeletePosts";



function App() {
  return (
    <>
    <Header/>
    {/* <Outlet/> */}
    <Routes>
      <Route path='/' element={ <Home /> } />
      <Route path='*' element={ <ErrorPage /> }/>
      <Route path="/posts/:id" element={<PostDetail/>} />
      <Route path="/signup" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/profile/:id" element={<UserProfile/>} />
      <Route path="/authors" element={<Authors/>} />
      <Route path="/create" element={<CreatePosts/>} />
      <Route path="/posts/categories/:category" element={<CategoryPosts/>} />
      <Route path="/posts/users/:id" element={<AuthorPosts/>} />
      <Route path="/myposts/:id" element={<Dashboard/>} />
      <Route path="/posts/:id/edit" element={<EditPosts/>} />
      <Route path="/posts/:id/delete" element={<DeletePosts/>} />
      <Route path="/logout" element={<Logout/>} />
    </Routes>
    <Footer/>
    </>
  )
}

export default App
