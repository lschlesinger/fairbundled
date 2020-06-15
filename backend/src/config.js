export default {
    env: process.env.NODE_ENV || 'development',
    server: {
        port: process.env.PORT || 5000
    },
    database: {
        host: process.env.DB_HOST || 'localhost',
        uri: process.env.MONGODB_URI || null,
        port: process.env.DB_PORT || '27017',
        user: process.env.DB_USER || 'mongouseradmin',
        password: process.env.DB_PASSWORD || 'mongopassadmin',
        name: process.env.DB_NAME || 'fairbundled'
    },
    auth: {
        // used for signing JWTs
        jwtSecret: process.env.JWT_SECRET || 'verysecret'
    }
};
