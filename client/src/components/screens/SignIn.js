import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import UserContext from '../../context/UserContext';

const SignIn = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const postData = () => {
    // eslint-disable-next-line
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      M.toast({ html: 'invalid email', classes: 'rounded red darken-3' });
      return;
    }
    if (password.length < 6) {
      M.toast({ html: 'password must be 6 characters or more', classes: 'rounded red darken-3' });
      return;
    }
    fetch('/signin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password,
        email
      })
    }).then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: 'rounded red darken-3' });
        } else {
          localStorage.setItem('jwt', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          dispatch({ type: 'USER', payload: data.user });
          M.toast({ html: data.message, classes: 'rounded green darken-2' });
          history.push('/');
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
        <input type="password" placeholder="password" value={password} onChange={(e) => { setPassword(e.target.value); }} />
        <button
          className="btn waves-effect waves-light grey darken-4"
          type="submit"
          name="action"
          onClick={() => postData()}
        >
          Sign In
        </button>
        <p><Link to="/signup">Sign up instead?</Link></p>
      </div>
    </div>
  );
};

export default SignIn;
