# jeremyasuncion.io

Sources for everything under my own infrastructure :)

I'm using a [\$5 Vultr VPS](https://www.vultr.com/pricing/), which includes a
25GB SSD, 1 CPU, 1GB of RAM, and 1000GB of bandwidth.

For application orchestration, I'm using
[dokku](http://dokku.viewdocs.io/dokku/) for a Heroku like PaaS workflow.

## Emoji index
I've recently started using Emojis in a lot of my commit messages, READMEs, and
wherever I can on GitHub. Here's what each emoji I use represents. It may be
subject to change:

- :tada: - Commits that include something so amazing that I have to celebrate :tada:
- :wrench: - Commits that are relatively small to medium in size
- :warning: - Commits that introduce configs or code that break things

## What's included?

```
apps/               # Applications and stuff
  jeremyasuncion.io   # Personal website/Root site
services/           # Common services used across applications.
  static              # Nginx static file hosting
  storage             # S3-like storage backend.
```

## Why not Firebase/AWS/Heroku/etc.

I admit, handling all the infrastructure is tedious. But it's also a lot of
fun. I'm sure at whatever company I work at, they'll have their own workflow
for deploying applications. This is mine and it's been a really fun experience.

## Deployment

Dokku uses git pushes for deploying applications. For my monorepo setup, we use
`git-subtree` to deploy applications or services given the multi-application directory structure.

Here's an example of deploying my main website and the storage service:

```sh
$ git subtree push --prefix=apps/jeremyasuncion.io dokku@jeremyasuncion.io:jeremyasuncion.io master
...
$ git subtree push --prefix=services/storage dokku@jeremyasuncion.io:storage master
...
```

## License

The MIT License (MIT)

Copyright (c) 2017 Jeremy Asuncion

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
