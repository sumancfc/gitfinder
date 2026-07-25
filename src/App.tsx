import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import Navbar from './components/layout/Navbar';
import User from './components/users/User';
import Alert from './components/layout/Alert';
import Home from './components/pages/Home';
import About from './components/pages/About';

import GithubState from './context/github/githubState';
import AlertState from './context/alert/AlertState';

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router basename={process.env.PUBLIC_URL}>
          <Navbar />
          <Container maxW='1100px' px={{ base: 4, md: 6 }} pb={12}>
            <Alert />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' component={User} />
              <Redirect from='/gitfinder' to='/' />
            </Switch>
          </Container>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
