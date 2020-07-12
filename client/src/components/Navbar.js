import React, {
  useContext, useRef, useEffect, useState
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import UserContext from '../context/UserContext';

const Navbar = () => {
  const searchModal = useRef(null);
  const { state, dispatch } = useContext(UserContext);
  const [search, setSearch] = useState('');
  const [userdetails, setUserdetails] = useState([]);

  const history = useHistory();
  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);

  const Links = () => {
    if (state) {
      return [
        <li><i data-target="modal1" className="large material-icons modal-trigger" style={{ color: 'black' }}>search</i></li>,
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/create">Create Post</Link></li>,
        <li><Link to="/followposts">Feed</Link></li>,
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

  const fetchUsers = (query) => {
    setSearch(query);
    fetch('/search', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    }).then((res) => res.json())
      .then((response) => {
        setUserdetails(response.user);
      });
  };

  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to={state ? '/' : '/signin'} className="brand-logo left">C-Instagram</Link>
        <ul id="nav-mobile" className="right">
          {Links()}
        </ul>
      </div>
      <div id="modal1" className="modal" ref={searchModal}>
        <div className="modal-content" style={{ color: 'black' }}>
          <input type="text" placeholder="search users" value={search} onChange={(e) => { fetchUsers(e.target.value); }} />
          <ul className="collection" style={{ display: 'flex', flexDirection: 'column' }}>
            {userdetails.map((user) => {
              return (
                <Link
                  to={user._id !== state._id ? `/profile/${user._id}` : '/profile'}
                  onClick={() => {
                    M.Modal.getInstance(searchModal.current).close();
                    setSearch('');
                  }}
                >
                  <li className="collection-item">{user.username}</li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="modal-footer">
          <button type="button" className="modal-close waves-effect waves-green btn-flat" onClick={() => setSearch('')}>Close</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
