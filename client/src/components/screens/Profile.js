import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import '../../styles/profile.css';

const Profile = () => {
  const [userPhotos, setUserphotos] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  console.log(state)
  useEffect(() => {
    fetch('/myposts', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    }).then((res) => res.json())
      .then((result) => {
        setUserphotos(result.posts);
      });
  }, [])
  return (
    <div className="profile-container">
      <div className="profile-top">
        <div className="profile-photo">
          <img
            src="https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
        </div>
        <div>
          <h4>{state ? state.username : 'Loading'}</h4>
          <div className="profile-data">
            <h5>50 posts</h5>
            <h5>50 followers</h5>
            <h5>50 following</h5>
          </div>
        </div>
      </div>
      <div className="gallery">
        {
          userPhotos.map((photo) => {
            return (
              <img
                key={photo._id}
                className="gallery-item"
                src={photo.photo}
                alt={photo.title}
              />
            );
          })
        }
      </div>
    </div>
  );
};

export default Profile;
