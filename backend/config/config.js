
const config = {
    app: {
        port: process.env.APP_PORT
    },
    db: {
        database: process.env.DB_DATABASE,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        type: process.env.DB_TYPE
    }
}

module.exports = config;