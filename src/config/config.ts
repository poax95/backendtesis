export default {

    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb://localhost/backtesis-db',
        USER: process.env.MONGODB_user,
        PASSWORD: process.env.MONGODB_PASSWORD
    }
}