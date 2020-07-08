import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

const SignUp = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const postData = () => {
    //  eslint-disable-next-line
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      M.toast({ html: 'invalid email', classes: 'rounded red darken-3' });
      return;
    }
    if (password.length < 6) {
      M.toast({ html: 'password must be 6 characters or more', classes: 'rounded red darken-3' });
      return;
    }
    fetch('/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password,
        email
      })
    }).then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: 'rounded red darken-3' });
        } else {
          M.toast({ html: 'Registration successful, Please sign in', classes: 'rounded green darken-2' });
          history.push('/signin');
        }
      }).catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login-card">
      <div className="card auth-card input-field">
        <h2 className="brand-logo">C-Instagram</h2>
        <input type="text" placeholder="username" value={username} onChange={(e) => { setUsername(e.target.value); }} />
        <input type="text" placeholder="email" value={email} onChange={(e) => { setEmail(e.target.value); }} />
        <input type="password" placeholder="password" value={password} onChange={(e) => { setPassword(e.target.value); }} />
        <button
          className="btn waves-effect waves-light grey darken-4"
          type="submit"
          name="action"
          onClick={() => { postData(); }}
        >
          Sign Up
        </button>
        <p><Link to="/signin">Already have an account?</Link></p>
      </div>
    </div>
  );
};

export default SignUp;
