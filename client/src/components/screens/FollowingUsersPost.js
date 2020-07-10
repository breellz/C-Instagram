import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import '../../styles/Home.css';

const Home = () => {
  const [data, setData] = useState([]);
  const { state } = useContext(UserContext);
  useEffect(() => {
    fetch('/followposts', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    }).then((res) => res.json())
      .then((result) => {
        setData(result.posts);
      });
  }, []);

  // Like post

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

  // unlike post

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

  // make comment

  const makeComment = (text, postId) => {
    fetch('/comment', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        postId,
        text
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

  // delete post

  const deletePost = (postId) => {
    fetch(`/delete/${postId}`, {
      method: 'delete',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then((res) => res.json())
      .then((deleted) => {
        const newData = data.filter((item) => {
          return item._id !== deleted._id;
        });
        setData(newData);
      });
  };

  // delete comment

  const deleteComment = (postId, commentId) => {
    fetch(`/deleteComment/${commentId}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        postId
      })
    }).then((res) => res.json())
      .then((deleted) => {
        const newdata = data.map((post) => {
          return {
            ...post,
            ...deleted
          };
        });
        setData(newdata);
      }).catch((err) => {
        console.log(err);
      });
  };
  return (
    /* eslint no-underscore-dangle: 0 */
    <div className="home-wrapper">
      {data.map((item) => (
        <div className="card home-card" key={item.key}>
          <h5>
            <Link
              to={item.postedBy._id !== state._id
                ? `/profile/${item.postedBy._id}` : '/profile'}
            >
              {item.postedBy.username}
            </Link>
            {item.postedBy._id === state._id && (
              <i
                style={{ float: 'right' }}
                className="material-icons"
                onKeyUp={() => console.log('key up')}
                onClick={() => deletePost(item._id)}
                role="button"
                tabIndex="0"
              >
                delete
              </i>
            )}
          </h5>
          <div className="card-image">
            <img
              src={item.photo}
              alt=""
            />
          </div>
          <div className="card-content">
            <i className="material-icons">favorite</i>
            {item.likes.includes(state._id) ? (
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
            {
              item.comments.map((comment) => {
                return (
                  <h6>
                    <span
                      style={{ fontWeight: '700' }}
                    >
                      {comment.postedBy.username}
                    </span>
                    {' '}
                    {comment.text}
                    {comment.postedBy._id === state._id
                    && (
                    <i
                      style={{ float: 'right' }}
                      className="material-icons"
                      onKeyUp={() => console.log('key up')}
                      onClick={() => deleteComment(item._id, comment._id)}
                      role="button"
                      tabIndex="0"
                    >
                      delete
                    </i>
                    )}
                  </h6>
                );
              })
            }
            <form onSubmit={(e) => {
              e.preventDefault();
              makeComment(e.target[0].value, item._id);
            }}
            >
              <input
                type="text"
                placeholder="add a comment"
              />
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
