import React, { useState } from "react";
import { DUMMY_POSTS } from "../data";
import PostItem from "../components/PostItem";
import { useNavigate } from "react-router-dom";

const AuthorPosts = () => {
  const [authorPosts, setAuthorPosts] = useState(DUMMY_POSTS);
  const navigate = useNavigate();

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
            ({ id, thumbnail, category, title, description, authorID }) => (
              <PostItem
                key={id}
                postID={id}
                thumbnail={thumbnail}
                category={category}
                title={title}
                description={description}
                authorID={authorID}
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
