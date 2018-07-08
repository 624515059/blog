module.exports = {
    port: 3333,
    //mongodb: 'mongodb://localhost:27017/qq',
    mongodb: 'mongodb://39.106.11.71:27017/qq',
    session: {
        secret: 'admin',
        key: 'token',
        maxAge: 2592000000
    },
}