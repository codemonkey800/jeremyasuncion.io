# Static

Simple nginx server for serving static files.

## Setup

First, create the app on your dokku instance:

```sh
$ dokku apps:create static
Creating static... done
```

Then, you'll need to mount the container volume to a host dir:

```sh
$ dokku storage:mount static /storage/static:/data
```

