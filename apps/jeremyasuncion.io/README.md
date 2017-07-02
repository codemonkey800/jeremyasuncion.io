# jeremyasuncion.io

My personal website :)

## Technologies Used:

- Babel
- ESLint
- Koa.js
- Material UI
- React.js
- Webpack
- Lots More!

## Setup

Install everything by running:

```sh
$ yarn
```

Lint with eslint by running:

```sh
$ yarn lint
```

Run in development mode by running:

```sh
$ yarn watch
```

## Deployment

Although this app is targeted towards a Heroku/Dokku like workflow, it will
work in pretty much any deployment scenario, provided you have Node.js
installed. First, pre-build the client and server code:

```sh
NODE_ENV=production yarn build
```

Next, run the server:

```sh
NODE_ENV=production yarn start
```

It's important that you run with `NODE_ENV=production`. Otherwise, you'll being
using the un-minified and un-obfuscated JS bundles.

