import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <div className="login-card">
      <div className="card auth-card input-field">
        <h2>C-Instagram</h2>
        <input type="text" placeholder="email" />
        <input type="text" placeholder="password" />
        <button
          className="btn waves-effect waves-light grey darken-4"
          type="submit"
          name="action"
        >
          Sign In
        </button>
        <p><Link to="/signup">Sign up instead?</Link></p>
      </div>
    </div>
  );
};

export default SignIn;
