import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/screens/Home';
import SignIn from './components/screens/SignIn';
import Profile from './components/screens/Profile';
import SignUp from './components/screens/SignUp';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Route path="/" component={Home} exact />
      <Route path="/signin" component={SignIn} />
      <Route path="/profile" component={Profile} />
      <Route path="/signup" component={SignUp} />
    </BrowserRouter>

  );
};

export default App;
