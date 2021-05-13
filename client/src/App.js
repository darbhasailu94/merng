import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import 'semantic-ui-css/semantic.min.css';

import { Container } from 'semantic-ui-react';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import SinglePost from './pages/SinglePost';
import AuthRoute from './components/AuthRoute.js';
import { AuthProvider } from './context/auth.js';
import Books from './pages/Books.js';


function App() {
  // the Container component basically means <div class="ui container"></div>
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path='/' component={Home}/>
          <AuthRoute exact path='/login' component={Login}/>
          <AuthRoute exact path='/register' component={Register}/>
          <Route exact path="/posts/:postId" component={SinglePost} />
          <Route exact path="/books" component={Books} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
