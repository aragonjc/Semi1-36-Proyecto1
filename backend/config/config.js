
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
    },
    aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
        bucket: process.env.AWS_BUCKET
    },
    jwt: {
        tokenSecret: process.env.TOKEN_SECRET
    }
}

module.exports = config;