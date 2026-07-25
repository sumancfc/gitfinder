import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import App from './App';
import theme from './theme';

ReactDOM.render(
  <React.Fragment>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.Fragment>,
  document.getElementById('root')
);
