import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import '../../styles/profile.css';

const Profile = () => {
  const [userProfile, setProfile] = useState(null);
  const [showfollow, setShowfollow] = useState(true)
  const { dispatch } = useContext(UserContext);
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

  // folow user
  const followUser = () => {
    fetch('/follow', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        followId: userid
      })
    }).then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: 'UPDATE',
          payload: {
            followers: data.followers,
            following: data.following
          }
        });
        localStorage.setItem('user', JSON.stringify(data));
        setProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [
                ...prevState.user.followers, data._id
              ]
            }
          };
        });
        setShowfollow(false);
      });
  };
  // unfollow user

  const unfollowUser = () => {
    fetch('/unfollow', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        unfollowId: userid
      })
    }).then((res) => res.json())
      .then((data) => {
        console.log('from database', data);
        dispatch({
          type: 'UPDATE',
          payload: {
            followers: data.followers,
            following: data.following
          }
        });
        localStorage.setItem('user', JSON.stringify(data));
        setProfile((prevState) => {
          const newFollower = prevState.user.followers.filter((follower) => follower !== data._id);
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower
            }
          };
        });
      });
  };
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
                <h5>
                  {userProfile.user.followers.length}
                  {' '}
                  followers
                </h5>
                <h5>
                  {userProfile.user.following.length}
                  {' '}
                  following
                </h5>
              </div>
              {showfollow
                ? (
                  <button
                    style={{ margin: '10px' }}
                    className="btn waves-effect waves-light grey darken-4"
                    type="submit"
                    name="action"
                    onClick={() => followUser()}
                  >
                    Follow
                  </button>
                ) : (
                  <button
                    style={{ margin: '10px' }}
                    className="btn waves-effect waves-light red darken-4"
                    type="submit"
                    name="action"
                    onClick={() => unfollowUser()}
                  >
                    unfollow
                  </button>
                )}
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
