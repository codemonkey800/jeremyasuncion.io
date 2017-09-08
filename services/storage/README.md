# Storage

S3-like storage service using [Minio](https://www.minio.io/).

## Setup

First you'll need to create the app on your dokku instance:

```sh
$ dokku apps:create storage
Creating storage... done
```

If you want direct access to the object storage, you'll need to mount the
storage volume to a host directory:

```sh
$ dokku storage:mount storage /storage/storage:/data
```

### Access and Secret Keys

Minio uses an access and secret key for client authentication. You'll need to
figure out how you want these keys to be handled before deploying.

#### Manually

These keys can be manually generated and set using the `MINIO_ACCESS_KEY` and
`MINIO_SECRET_KEY` variables. You can generate your keys using
[randomkeygen](https://randomkeygen.com/).

After you generate your keys, you can set the environment variables using the `dokku config` command:

```sh
$ dokku config:set storage MINIO_ACCESS_KEY=access_key MINIO_SECRET_KEY=secret_key
-----> Setting config vars
       MINIO_ACCESS_KEY: access_key
       MINIO_SECRET_KEY: secret_key
-----> Restarting app storage
       App storage has not been deployed
```

You can read more on the
[Minio README.md](https://github.com/minio/minio/blob/master/docs/docker/README.md#minio-custom-access-and-secret-keys).

#### Automatically

If the environment variables aren't set, Minio will generate it's own keys, and
the only way to access them is to run the following:

```sh
$ dokku logs storage
2017-09-07T10:07:50.666280718Z app[web.1]: Endpoint:  http://172.17.0.3  http://127.0.0.1
2017-09-07T10:07:50.666328205Z app[web.1]: AccessKey: access_key
2017-09-07T10:07:50.666333547Z app[web.1]: SecretKey: secret_key
2017-09-07T10:07:50.666336297Z app[web.1]: Region:    us-west-1
2017-09-07T10:07:50.666338905Z app[web.1]:
2017-09-07T10:07:50.666341317Z app[web.1]: Browser Access:
2017-09-07T10:07:50.666343772Z app[web.1]:    http://172.17.0.3  http://127.0.0.1
2017-09-07T10:07:50.666346284Z app[web.1]:
2017-09-07T10:07:50.666348625Z app[web.1]: Command-line Access: https://docs.minio.io/docs/minio-client-quickstart-guide
2017-09-07T10:07:50.666408416Z app[web.1]:    $ mc config host add myminio http://172.17.0.3 access_key secret_key
2017-09-07T10:07:50.666412041Z app[web.1]:
2017-09-07T10:07:50.666414423Z app[web.1]: Object API (Amazon S3 compatible):
2017-09-07T10:07:50.666796971Z app[web.1]:    Go:         https://docs.minio.io/docs/golang-client-quickstart-guide
2017-09-07T10:07:50.666808336Z app[web.1]:    Java:       https://docs.minio.io/docs/java-client-quickstart-guide
2017-09-07T10:07:50.666811349Z app[web.1]:    Python:     https://docs.minio.io/docs/python-client-quickstart-guide
2017-09-07T10:07:50.666813931Z app[web.1]:    JavaScript: https://docs.minio.io/docs/javascript-client-quickstart-guide
2017-09-07T10:07:50.666816526Z app[web.1]:    .NET:       https://docs.minio.io/docs/dotnet-client-quickstart-guide
2017-09-07T10:07:50.666819391Z app[web.1]:
2017-09-07T10:07:50.666821866Z app[web.1]: Drive Capacity: 2.0 GiB Free, 25 GiB Total
```

