export default {

    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb+srv://admin:admin@tuvooto.646ks.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        USER: process.env.MONGODB_user,
        PASSWORD: process.env.MONGODB_PASSWORD
    }
}