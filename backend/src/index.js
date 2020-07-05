import express from 'express';
import http from 'http';
import path from 'path';
import config from "./config";
import routes from "./routes";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import BootstrapService from "./services/bootstrap.service";
import FairbundleService from "./services/fairbundle.service";

// create express app
const app = express();

// parse application/json
app.use(bodyParser.json({limit: '50mb', extended: true}));

// add routes to express app
app.use('/api', routes);

// all static content in `public/` will be served
app.use(express.static(path.resolve(__dirname, '..', 'public')));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', (request, response) => {
    response.sendFile(path.resolve(path.resolve(__dirname, '..', 'public', 'index.html')));
});

// pass express app to http server instance
const server = http.createServer(app);

// create db connection
let connectionURI = config.database.uri || `mongodb://${config.database.user}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.name}`;
mongoose
    .connect(connectionURI, {
        useFindAndModify: false
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

            // start job to submit fairbundle if their expiration is reached
            setInterval(()=>{
                FairbundleService.submitFairbundles();
            }, 1000);

            // create initial data with bootstrap service
            if (config.env !== 'production') {
                BootstrapService.loadInitialData().then(() => {
                    console.log('Created initial data.')
                }).catch((err) => {
                    console.log(err);
                    console.log('Failed to initialize data.')
                })
            }
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
