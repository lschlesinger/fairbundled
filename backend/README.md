# Fairbundled - Backend

## Setup

- Install Node.js
- Install Docker
- Instal Robo3T

## Run

Before running any of the commands below, go into `backend/` directory (here).

### Start MongoDB using Docker-Compose

This will start a mongodb server running on port `27017`:
```sh
docker-compose -f docker-compose.dev.yml up -d # -d to run as daemon in background 
```

### Start Backend

The following command will start the backend server on port `5000`:
```sh
npm start # will run `nodemon` and restart on each change in files 
```

### Run in IDE

Create `npm` run configuration in IntelliJ or WebStorm with command `run` script `start`.
