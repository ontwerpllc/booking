import React from 'react';
import ReactDOM from 'react-dom/client';

import '@fontsource-variable/inter';
import './index.css';
import { ThemeProvider } from './providers/theme';
import { Router } from './providers/router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  </React.StrictMode>,
);
