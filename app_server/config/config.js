require('dotenv').load();

let config = {};

config.dbHost = process.env.dbHost;
config.dbPort = process.env.dbPort;
config.dbName = process.env.dbName;
config.dbUser = process.env.dbUser;
config.dbPass = process.env.dbPass;

export default config;
