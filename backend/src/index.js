import express from 'express';
import http from 'http';
import config from "./config";
import routes from "./routes";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

// create express app
const app = express();

// parse application/json
app.use(bodyParser.json());

// add routes to express app
app.use('/api', routes);

// pass express app to http server instance
const server = http.createServer(app);

// create db connection
mongoose
    .connect(['mongodb://', config.database.host, ':', config.database.port, '/', config.database.name].join(''), {
        user: config.database.user,
        pass: config.database.password
    })
    .then(() => {
        // start server once db connection is established
        server.listen(config.server.port, () => {
            const {
                address,
                port
            } = server.address();

            // log if server is listening to requests
            console.log(`Server is listening at http://${address}:${port}`);
        });
    })
    .catch((err) => {
        console.log(`Error connecting to the database: ${err.message}`);
        process.exit(err.statusCode);
    });

// log server errors and exit process
server.on('error', (err) => {
    console.log(`Server Error: ${err.message}`);
    process.exit(err.statusCode);
});
