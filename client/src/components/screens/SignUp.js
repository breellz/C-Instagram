import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="login-card">
      <div className="card auth-card input-field">
        <h2 className="brand-logo">C-Instagram</h2>
        <input type="text" placeholder="username" />
        <input type="text" placeholder="email" />
        <input type="text" placeholder="password" />
        <button
          className="btn waves-effect waves-light grey darken-4"
          type="submit"
          name="action"
        >
          Sign Up
        </button>
        <p><Link to="/signin">Already have an account?</Link></p>
      </div>
    </div>
  );
};

export default SignUp;
