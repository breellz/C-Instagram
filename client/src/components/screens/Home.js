import React from 'react';
import '../../styles/Home.css';

const Home = () => {
  return (
    <div className="home-wrapper">
      <div className="card home-card">
        <h5>Breellz</h5>
        <div className="card-image">
          <img
            src="https://images.unsplash.com/photo-1569124589354-615739ae007b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
        </div>
        <div className="card-content">
          <i className="material-icons">favorite</i>
          <h6>Post title</h6>
          <p>Post body goes here</p>
          <input type="text" placeholder="add a comment" />
        </div>
      </div>
      <div className="card home-card">
        <h5>Breellz</h5>
        <div className="card-image">
          <img
            src="https://images.unsplash.com/photo-1569124589354-615739ae007b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
        </div>
        <div className="card-content">
          <i className="material-icons">favorite</i>
          <h6>Post title</h6>
          <p>Post body goes here</p>
          <input type="text" placeholder="add a comment" />
        </div>
      </div>
      <div className="card home-card">
        <h5>Breellz</h5>
        <div className="card-image">
          <img
            src="https://images.unsplash.com/photo-1569124589354-615739ae007b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
        </div>
        <div className="card-content">
          <i className="material-icons">favorite</i>
          <h6>Post title</h6>
          <p>Post body goes here</p>
          <input type="text" placeholder="add a comment" />
        </div>
      </div>
    </div>
  );
};

export default Home;
