/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';

const PostList = (props) => {
  const {
    title,
    body,
    photo,
    postedBy
  } = props.post;
  return (
    <div className="card home-card" key={props.key}>
      <h5>{postedBy.username}</h5>
      <div className="card-image">
        <img
          src={photo}
          alt=""
        />
      </div>
      <div className="card-content">
        <i className="material-icons">favorite</i>
        <h6>{title}</h6>
        <p>{body}</p>
        <input type="text" placeholder="add a comment" />
      </div>
    </div>
  );
};

export default PostList;
