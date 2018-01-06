# Projects

Reverse proxy for accessing my web projects. To access a project, enter the
url:

```
https://projects.jeremyasuncion.io/{project}
```

You can find the source code for each project in
[demos/](https://github.com/codemonkey800/jeremyasuncion.io/tree/master/projects). Each project will either
be its own project root directory or a git submodule.

To access a home page showing all of the projects available, enter the url:
https://projects.jeremyasuncion.io.

The home page itself is located in
[demos/homepage](https://github.com/codemonkey800/jeremyasuncion.io/tree/master/projects/homepage).

# Setup

Configuration is done through environment variables and the proxy configuration file. The environment variables
used are listed in `.env.sample`:

```
CONFIG_FILE=proxy.sample.json
NODE_ENV=development
PORT=8080
```

The `proxy.sample.json` file also includes an example configuration for the
proxy. The options are the exact same used in
[http-proxy-rules](https://github.com/donasaur/http-proxy-rules). The example
config file has the following structure:

```json
{
  "default": "http://0.0.0.0:8081",
  "rules": {
    "/foo": "http://0.0.0.0:8082",
    "/bar": "http://0.0.0.0:8083"
  }
}
```

Before deploying, we have to create a proper environment in Dokku. This
involves creating the app, setting environment variables, and mounting a
volume for persistent storage of the proxy configuration file.

```bash
$ dokku apps:create projects
$ dokku config:set projects CONFIG_FILE=/data/proxy.json
$ dokku storage:mount projects /storage/projects:/data
```

The above first creates an app named `projects`. Then, it sets the
`CONFIG_FILE` environment variable to `/data/proxy.json`. `/data` is the
usual data directory I use when mounting persistent storage to a Dokku app. I
then mount `/storage/projects` to `/data` so that we can create `proxy.json`
and make changes.

Finally, to deploy the application, run the conveneince script provided:

```bash
$ ./deploy.sh
```
