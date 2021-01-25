import './App.css';
import React from 'react'
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Chat from './components/Chat'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route exact path="/chat" component={Chat} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </div>
    </Router>
  );
}

export default App;
