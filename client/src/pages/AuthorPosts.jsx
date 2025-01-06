import React, { useState, useEffect} from "react";
import PostItem from "../components/PostItem";
import { useNavigate } from "react-router-dom";
// import Loader from './Loader'
import Loader from "../components/Loader";
import axios from 'axios'
import { useParams } from "react-router-dom";

const AuthorPosts = () => {
  const {id} = useParams();
  const [authorPosts, setAuthorPosts] = useState([]);
  const navigate = useNavigate();
  const {error, setError} = useState('')
  const [loader, setLoader] = useState(false)


  useEffect(()=>{
    const fetchPosts = async () =>{
      setLoader(true);

      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/post/users/${id}`);
        const post = response?.data
        setAuthorPosts(post)
      } catch (err) {
        // setError(err);
        console.log(err);
      }

      setLoader(false);
    }

    fetchPosts();
  }, [id])

  if(loader){
    return <Loader/>
  }

  return (
    <section className="posts">
      {/* Add the Back to Home button */}
      {/* <div className="center">
        <button onClick={() => navigate("/")} className="btn primary">
          Back to Home
        </button>
      </div> */}

      {authorPosts.length > 0 ? (
        <div className="container posts__container">
          {authorPosts.map(
            ({ _id: id, thumbnail, category, title, description, creator, createdAt }) => (
              <PostItem
                key={id}
                postID={id}
                thumbnail={thumbnail}
                category={category}
                title={title}
                description={description}
                authorID={creator}
                createdAt={createdAt}
              />
            )
          )}
        </div>
      ) : (
        <h2 className="center">No Posts Found</h2>
      )}
    </section>
  );
};

export default AuthorPosts;
