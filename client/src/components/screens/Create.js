import React from 'react';
import '../../styles/create.css';

const Create = () => {
  return (
    <div className="card mycard input-field">
      <input type="text" placeholder="title" />
      <input type="text" placeholder="body" />
      <div className="file-field input-field">
        <div className="btn grey darken-4">
          <span>Photo</span>
          <input type="file" />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" placeholder="choose a photo" />
        </div>
      </div>
      <button
        className="btn waves-effect waves-light grey darken-4"
        type="submit"
        name="action"
      >
        Post
      </button>
    </div>
  );
};

export default Create;
