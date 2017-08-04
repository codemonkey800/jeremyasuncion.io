const compression = require('compression');
const express = require('express');

const app = express();
const host = process.env.HOST || '0.0.0.0';
const port = parseInt(process.env.PORT, 10) || 8080;

app.set('view engine', 'pug');
app.set('views', 'public');

if (process.env.NODE_ENV !== 'production') {
  const chokidar = require('chokidar');
  const reload = require('reload');

  const reloader = reload(app);

  chokidar
    .watch('public')
    .on('change', () => reloader.reload());
}

app.use(compression());
app.use(express.static('public'));
app.get('/', (_, res) => res.render('index'));


app.listen(port, host, () => {
  console.log(`Server started at http://${host}:${port}`);
});
