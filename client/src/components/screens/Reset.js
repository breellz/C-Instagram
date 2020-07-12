import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css';

const Reset = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');

  const postData = () => {
    // eslint-disable-next-line
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      M.toast({ html: 'invalid email', classes: 'rounded red darken-3' });
      return;
    }
    fetch('/resetpassword', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email
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
        <input type="text" placeholder="email" value={email} onChange={(e) => { setEmail(e.target.value); }} />
        <button
          className="btn waves-effect waves-light grey darken-4"
          type="submit"
          name="action"
          onClick={() => postData()}
        >
          Reset password
        </button>
      </div>
    </div>
  );
};

export default Reset;
