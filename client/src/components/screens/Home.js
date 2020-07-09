import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../context/UserContext';
import '../../styles/Home.css';

const Home = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch('/allposts', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    }).then((res) => res.json())
      .then((result) => {
        setData(result.posts);
      });
  }, []);

  const likePost = (id) => {
    fetch('/like', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        postId: id
      })
    }).then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          }
          return item;
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unlikePost = (id) => {
    fetch('/unlike', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        postId: id
      })
    }).then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          }
          return item;
        });
        setData(newData);
      }).catch((err) => {
        console.log(err);
      });
  };
  return (
    /* eslint no-underscore-dangle: 0 */
    <div className="home-wrapper">
      {data.map((item) => (
        <div className="card home-card" key={item.key}>
          <h5>{item.username}</h5>
          <div className="card-image">
            <img
              src={item.photo}
              alt=""
            />
          </div>
          <div className="card-content">
            <i className="material-icons">favorite</i>
            {item.likes.includes(state._id) ?
              (
                <i
                  className="material-icons"
                  onKeyUp={() => console.log('key up')}
                  onClick={() => unlikePost(item._id)}
                  role="button"
                  tabIndex="0"
                >
                  thumb_down
                </i>
              ) : (
                <i
                  className="material-icons"
                  onKeyUp={() => console.log('key up')}
                  onClick={() => likePost(item._id)}
                  role="button"
                  tabIndex="0"
                >
                  thumb_up
                </i>
              )}
            <h6>
              {item.likes.length}
              {' '}
              Likes
            </h6>

            <h6>{item.title}</h6>
            <p>{item.body}</p>
            <input type="text" placeholder="add a comment" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
