import './App.css';
import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register'



function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route exact path="/chat" component={Chat} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </div>
      <div className="Mobile">
        <h2>App not available on small screens</h2>
        <h3>Mobile app is in development</h3>
      </div>
    </Router>
  );
}

export default App;
