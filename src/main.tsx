import React from 'react';
import ReactDOM from 'react-dom/client';

import '@fontsource-variable/inter';
import './index.css';
import Router from './providers/router';
import ThemeProvider from './providers/theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  </React.StrictMode>,
);
