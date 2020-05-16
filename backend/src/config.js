export default {
    server: {
        port: process.env.PORT || 5000
    },
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '27017',
        user: process.env.DB_USER || 'mongouseradmin',
        password: process.env.DB_PASSWORD || 'mongopassadmin',
        name: process.env.DB_NAME || 'fairbundled'
    },
    auth: {
        jwtSecret: process.env.JWT_SECRET || 'verysecret'
    }
};
