import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const Links = () => {
    if (state) {
      return [
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/create">Create Post</Link></li>,
        <li>
          <button
            className="btn red darken-3"
            type="button"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: 'CLEAR' });
              history.push('/signin');
            }}
          >
            Sign Out
          </button>
        </li>
      ];
    }
    return [
      <li><Link to="/signin">Sign In</Link></li>,
      <li><Link to="/signup">Sign Up</Link></li>
    ];
  };

  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to={state ? '/' : '/signin'} className="brand-logo left">C-Instagram</Link>
        <ul id="nav-mobile" className="right">
          {Links()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
