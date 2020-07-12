import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import M from 'materialize-css';

const NewPassword = () => {
  const history = useHistory();
  const [password, setPassword] = useState('');
  const { token } = useParams();
  const postData = () => {
    // eslint-disable-next-line
    if (password.length < 6) {
      M.toast({ html: 'password must be 6 characters or more', classes: 'rounded red darken-3' });
      return;
    }
    fetch('/newpassword', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password,
        token
      })
    }).then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: 'rounded red darken-3' });
        } else {
          M.toast({ html: data.message, classes: 'rounded green darken-2' });
          history.push('/signin');
        }
      }).catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="login-card">
      <div className="card auth-card input-field">
        <h2>C-Instagram</h2>
        <input type="password" placeholder="Enter a new password" value={password} onChange={(e) => { setPassword(e.target.value); }} />
        <button
          className="btn waves-effect waves-light grey darken-4"
          type="submit"
          name="action"
          onClick={() => postData()}
        >
          Update password
        </button>
      </div>
    </div>
  );
};

export default NewPassword;
