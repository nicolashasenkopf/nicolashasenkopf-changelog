import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import * as serviceWorker from './serviceWorker';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const theme = extendTheme({
  colors: {
    bg: '#1A202C',
    secondaryLight: '#A0AEC0',
    secondaryMedium: '#718096',
    secondaryDark: '#2A4365',
  },
  styles: {
    global: {
      'html, body': {
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 700,
      },
    },
  },
});

root.render(
  <StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <div style={{ minHeight: '100vh' }}>
        <Navbar />
        <App />
      </div>
      <Footer />
    </ChakraProvider>
  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();
