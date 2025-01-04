
require('dotenv').config()






const Config = {
    HOST : process.env.HOST || "127.0.0.1",
    PORT : process.env.PORT || 5500,
    DB_URL : process.env.DB_URL
}
module.exports = Config;