# Express Mongoose Boilerplate

This boilerplate has two main sections:

* A database API for connecting to a mongo instance with mongoose
* A server API for serving requests with express

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What software you need to install and how to install them

* git
* npm
* nodemon
* docker

### Installing

#### Clone of copy project to a development directory

```
git clone https://github.com/larryschirmer/express-mongoose-boilerplate.git
```

#### Install project dependancies

```
npm install
```

#### Create a new development database

##### Recommended: Create a new mongo container with docker

`docker run --name mongo-development-container -p 27017:27017 -d mongo`

Notes:

* [Install Docker](https://docs.docker.com/install/)
* `docker run` --> creates a docker container
* `--name` --> assigns a name to reference the container later
* `-p 27017:27017` --> binds external port 27017 to internal container port 27017 (mongo default)
* `-d` --> runs container in detached mode (in the background)
* `mongo` --> pulls the latest version of the container from [docker hub](https://hub.docker.com/r/library/mongo/)

#### Confirm container is running

```
docker container ls -a
```

##### Expected output example:

```
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                      NAMES
86b620a2528a        mongo               "docker-entrypoint.s…"   6 seconds ago       Up 4 seconds        0.0.0.0:27017->27017/tcp   mongo-development-container
```

#### Configure Database

The configuration file supports a database located as `localhost:27017`. If the location of the database is host somewhere else, the location and port for the database are here:

```
+ database
  |
   `-- __tests__/
  |
   `-- api/
  |
   `-- models/
  |
   `-- config.js
```

**config.js**

```
module.exports = {
  db_host: 'localhost',
  db_port: 27017,
};
```

#### Run development tests

```
npm run jest
```

Notes:

* Runs 8 tests on the database API
* Future work: coverage tests the server API endpoints as well

#### Start development server

Starts server at index.js with nodemon

```
npm run dev
```

#### Clean up
Stop and remove mongo container
```
docker container stop mongo-development-container
docker container rm mongo-development-container
```
Confirm container removal
```
docker container ls -a
```
#### Extra Cleanup
Remove unnamed docker volumes and mongo image
```
docker volume ls
docker volume prune
docker volume ls

docker image ls
docker image prune
```
