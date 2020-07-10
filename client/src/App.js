import React, { useReducer, useEffect, useContext } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  useHistory
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/screens/Home';
import SignIn from './components/screens/SignIn';
import Profile from './components/screens/Profile';
import SignUp from './components/screens/SignUp';
import Create from './components/screens/Create';
import FollowingUsersPost from './components/screens/FollowingUsersPost';
import OtherUsersProfile from './components/screens/OtherUsersProfile';
import UserReducer, { initialState } from './reducers/UserReducer';
import UserContext from './context/UserContext';
import './App.css';

const Routing = () => {
  const history = useHistory();
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({ type: 'USER', payload: user });
    } else {
      history.push('/signin');
    }
  }, []);
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/signin" component={SignIn} />
      <Route path="/profile" component={Profile} exact />
      <Route path="/profile/:userid" component={OtherUsersProfile} />
      <Route path="/signup" component={SignUp} />
      <Route path="/create" component={Create} />
      <Route path="/followposts" component={FollowingUsersPost} />
    </Switch>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(UserReducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
