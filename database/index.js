const { Pool, Client } = require('pg')
module.exports = () => {
    try {
        const client = new Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
        }) 
        client.connect()
        console.log("DB connection established")
        return client;
    } catch (err) {
        console.error(`Database connection failed: ${err}`)
    }
}