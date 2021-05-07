import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import 'semantic-ui-css/semantic.min.css';

import { Container } from 'semantic-ui-react';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  // the Container component basically means <div class="ui container"></div>
  return (
    <Router>
      <Container>
        <MenuBar />
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
      </Container>
    </Router>
  );
}

export default App;
