// default config
const {
    JWT_TOKEN,
    LEAN_KEY,
    MONGO_DB,
    MONGO_PASSWORD,
    MYSQL_DB,
    MYSQL_PASSWORD,
    PG_DB,
    PG_PASSWORD,
    SQLITE_PATH,
} = process.env;
let storage = 'leancloud';
let jwtKey = JWT_TOKEN || LEAN_KEY;
if (LEAN_KEY) {
    storage = 'leancloud';
} else if (MONGO_DB) {
    storage = 'mongodb';
    jwtKey = jwtKey || MONGO_PASSWORD;
}  else if (SQLITE_PATH) {
    storage = 'mysql';
} else if (MYSQL_DB) {
    storage = 'mysql';
    jwtKey = jwtKey || MYSQL_PASSWORD;
} else if (PG_DB) {
    storage = 'postgresql';
    jwtKey = jwtKey || PG_PASSWORD;
}
export = {
    workers: 1,
    jwtKey,
    storage,
};