import React from 'react';

import { StaticRouter } from 'react-router';

import App from '../shared/app';

export default function AppRouter({ context, location }) {
  return (
    <StaticRouter context={context} location={location}>
      <App />
    </StaticRouter>
  );
}

