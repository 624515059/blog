module.exports = {
    port: 3000,
    mongodb: 'mongodb://localhost:27017/qq',
    session: {
        secret: 'admin',
        key: 'token',
        maxAge: 2592000000
    },
}