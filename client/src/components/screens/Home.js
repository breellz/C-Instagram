import React, { useState } from 'react';
import PostList from '../PostList';
import '../../styles/Home.css';

const Home = () => {
  const [data, setData] = useState([]);
  fetch('/allposts', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
  }).then((res) => res.json())
    .then((result) => {
      setData(result.posts);
    });
  return (
    /* eslint no-underscore-dangle: 0 */
    <div className="home-wrapper">
      {data.map((item) => <PostList post={item} key={item._id} />)}
    </div>
  );
};

export default Home;
