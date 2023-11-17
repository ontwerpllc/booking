import React from 'react';
import ReactDOM from 'react-dom/client';

import '@fontsource-variable/inter';
import './index.css';
import { ThemeProvider } from './providers/theme';
import { Router } from './providers/router';
import { ApiProvider } from './providers/api';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ApiProvider>
        <Router />
      </ApiProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
