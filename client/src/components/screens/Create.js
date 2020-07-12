import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css';
import '../../styles/create.css';

const Create = () => {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [imgurl, setImgurl] = useState('');

  // post to DB after image is uploaded
  useEffect(() => {
    if (imgurl) {
      M.toast({ html: 'In-progress, Please wait', classes: 'rounded green darken-2', displayLength: Infinity });
      fetch('/create', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({
          title,
          body,
          photo: imgurl
        })
      }).then((res) => res.json())
        .then((resdata) => {
          if (resdata.error) {
            return M.toast({ html: resdata.error, classes: 'rounded red darken-3' });
          }
          M.toast({ html: `${resdata.post.title} posted`, classes: 'rounded green darken-2' });
          history.push('/');
        }).catch((err) => {
          console.log(err);
        });
    }
  }, [imgurl]);

  const postDetails = () => {
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
        setImgurl(imgdata.url);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="card mycard input-field">
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn grey darken-4">
          <span>Photo</span>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" placeholder="choose a photo" />
        </div>
      </div>
      <button
        className="btn waves-effect waves-light grey darken-4"
        type="submit"
        name="action"
        onClick={() => postDetails()}
      >
        Post
      </button>
    </div>
  );
};

export default Create;
