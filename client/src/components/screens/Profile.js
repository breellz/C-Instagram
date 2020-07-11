import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import '../../styles/profile.css';

const Profile = () => {
  const [userPhotos, setUserphotos] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState('');

  useEffect(() => {
    fetch('/myposts', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    }).then((res) => res.json())
      .then((result) => {
        setUserphotos(result.posts);
      });
  }, []);

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', 'Cinstagram');
      data.append('cloud_name', 'breellz');

      fetch('https://api.cloudinary.com/v1_1/breellz/image/upload', {
        method: 'post',
        body: data
      })
        .then((res) => res.json())
        .then((imgdata) => {
          fetch('/updatepic', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({
              pic: imgdata.url
            })
          }).then((res) => res.json())
            .then((response) => {
              console.log('Image response', response);
              localStorage.setItem('user', JSON.stringify({ ...state, profilePicture: response.profilePicture }));
              dispatch({
                type: 'UPDATE_PIC',
                payload: response.profilePicture
              });
            });
        })
        .catch((err) => console.log(err));
    }
  }, [image]);

  const updatePicture = (file) => {
    setImage(file);
  };

  return (
    <div className="profile-container">
      <div className="profile-top-1">
        <div className="profile-top">
          <div className="profile-photo">
            <img
              src={state ? state.profilePicture : ''}
              alt=""
            />
          </div>
          <div>
            <h4>{state ? state.username : 'Loading'}</h4>
            <h5>{state ? state.email : 'Loading'}</h5>
            <div className="profile-data">
              <h5>
                {userPhotos.length}
                {' '}
                posts
              </h5>
              <h5>
                {state ? state.followers.length : '0'}
                {' '}
                followers
              </h5>
              <h5>
                {state ? state.following.length : '0'}
                {' '}
                following
              </h5>
            </div>
          </div>
        </div>
        <div className="file-field input-field" style={{ margin: '10px' }}>
          <div className="btn grey darken-4">
            <span>Update picture</span>
            <input
              type="file"
              onChange={(e) => updatePicture(e.target.files[0])}
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path input-profile validate" type="text" placeholder="choose a profile photo" />
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
