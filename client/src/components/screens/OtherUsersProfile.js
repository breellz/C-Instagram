import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import '../../styles/profile.css';

const Profile = () => {
  const [userProfile, setProfile] = useState(null);
  const { state } = useContext(UserContext);
  const { userid } = useParams();
  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    }).then((res) => res.json())
      .then((result) => {
        console.log(result);
        setProfile(result);
      });
  }, []);
  return (
    <>
      {userProfile ? (
        <div className="profile-container">
          <div className="profile-top">
            <div className="profile-photo">
              <img
                src="https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
            </div>
            <div>
              <h4>{userProfile.user.username}</h4>
              <h5>{userProfile.user.email}</h5>
              <div className="profile-data">
                <h5>
                  {userProfile.posts.length}
                  {' '}
                  posts
                </h5>
                <h5>50 followers</h5>
                <h5>50 following</h5>
              </div>
            </div>
          </div>
          <div className="gallery">
            {
              userProfile.posts.map((photo) => {
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

      ) : <h2> Loading...! </h2>}
    </>
  );
};

export default Profile;
