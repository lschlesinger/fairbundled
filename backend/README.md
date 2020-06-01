# Fairbundled - Backend

## Requirements

- Node.js
- npm
- Docker or local MongoDB
- Robo3T (optional)

## Installation

Install NPM packages

```sh
cd backend
npm install
```

## Run

Before running any of the commands below, go into `backend/` directory (here).

### Start MongoDB using Docker-Compose

This will start a mongodb server running on port `27017`:
```sh
docker-compose -f docker-compose.dev.yml up
```

Note: There should not run a local instance of MongoDB on the same port

Helpful commands:

```shell
# list open tcp connections on port `27017` (default mongo port)
lsof -nP -iTCP:27017 | grep LISTEN

# open tcp connections on port `27017`
nc -zvv localhost 27017

# terminate docker container orchestration
docker-compose -f docker-compose.dev.yml down --volumes --remove-orphans
```

### Start Backend

The following command will start the backend server on port `5000`:
```sh
npm start # will run `nodemon` and restart on each change in files 
```

### Run in IDE

Create `npm` run configuration in IntelliJ or WebStorm with command `run` script `start`.
