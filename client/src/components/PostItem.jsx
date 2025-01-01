import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";

const PostItem = ({
  postID,
  title,
  category,
  description,
  authorID,
  thumbnail,
}) => {

    const shortDesc = description.length > 145 ? description.substr(0, 145) + '...' : description;
    const postTitle = title.length > 30 ? title.substr(0, 30) + '...' : title;

  return (
    <article className="post">
      <div className="post__thumbnail">
        <img src={thumbnail} alt="Blog Post Image" />
      </div>

      <div className="post__content">
        <Link to={`/posts/${postID}`}>
          <h3>{postTitle}</h3>
        </Link>
        <p> {shortDesc} </p>
        <div className="post__footer">
          <PostAuthor authorID={authorID} />
          <Link to={`/posts/categories/${category}`} className="btn category">{category}</Link>
        </div>
      </div>
    </article>
  );
};

export default PostItem;
