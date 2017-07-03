import React from 'react';
import Helmet from 'react-helmet';
import { Route } from 'react-router-dom';

const Index = () => <h1>Hello, World!</h1>;

const Herp = () => <h1>Herp</h1>;

const Derp = () => <h1>Derp</h1>;

export default function App() {
  return (
    <div>
      <Helmet>
        <title>Home - jeremyasuncion.io</title>
      </Helmet>
      <Route exact path="/" component={Index} />
      <Route path="/herp" component={Herp} />
      <Route path="/derp" component={Derp} />
    </div>
  );
}

