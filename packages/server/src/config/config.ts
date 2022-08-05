// default config
const {
    JWT_TOKEN,
    LEAN_KEY,
    MONGO_DB,
    MONGO_PASSWORD,
} = process.env;
let storage = 'leancloud';
let jwtKey = JWT_TOKEN || LEAN_KEY;
if (LEAN_KEY) {
    storage = 'leancloud';
} else if (MONGO_DB) {
    storage = 'mongodb';
    jwtKey = jwtKey || MONGO_PASSWORD;
}
export = {
    workers: 1,
    jwtKey,
    storage,
};