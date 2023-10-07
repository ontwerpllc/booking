import React from 'react';
import ReactDOM from 'react-dom/client';

import '@fontsource-variable/inter';
import './index.css';
import Router from './providers/router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
);
