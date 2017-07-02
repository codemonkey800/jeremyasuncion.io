import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import App from '../shared/app';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

