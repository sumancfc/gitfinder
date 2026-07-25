import React, { useEffect, useRef } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom';
import { Container, Box } from '@chakra-ui/react';
import Navbar from './components/layout/Navbar';
import User from './components/users/User';
import Alert from './components/layout/Alert';
import Home from './components/pages/Home';
import About from './components/pages/About';

import GithubState from './context/github/githubState';
import AlertState from './context/alert/AlertState';

interface FocusOnRouteChangeProps {
  targetRef: React.RefObject<HTMLElement>;
}

// Moves focus to the main content landmark whenever the route changes, so
// keyboard and screen reader users get a clear signal that navigation
// happened (SPAs don't get this for free the way full page loads do).
const FocusOnRouteChange = ({ targetRef }: FocusOnRouteChangeProps) => {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    targetRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return null;
};

const App = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <GithubState>
      <AlertState>
        <Router basename={process.env.PUBLIC_URL}>
          <Box
            as='a'
            href='#main-content'
            position='absolute'
            left='-9999px'
            top='auto'
            zIndex='banner'
            bg='brand.500'
            color='white'
            px={4}
            py={2}
            borderRadius='md'
            _focus={{ left: 4, top: 4, position: 'fixed' }}
          >
            Skip to main content
          </Box>
          <FocusOnRouteChange targetRef={mainRef} />
          <Navbar />
          <Container
            as='main'
            id='main-content'
            ref={mainRef}
            tabIndex={-1}
            maxW='1100px'
            px={{ base: 4, md: 6 }}
            pb={12}
            _focus={{ boxShadow: 'none', outline: 'none' }}
          >
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
