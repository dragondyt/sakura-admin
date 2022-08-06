import 'thinkjs3-ts';
import Axiom from "../log/axiom";
import Mysql from "think-model-mysql";

export const logger = {
    type: 'axiom',
    axiom: {
        handle: Axiom
    }
};
const {
    MONGO_AUTHSOURCE,
    MONGO_DB,
    MONGO_HOST,
    MONGO_PASSWORD,
    MONGO_PORT,
    MONGO_REPLICASET,
    MONGO_USER,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DB,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_PREFIX,
    MYSQL_CHARSET,
    MYSQL_SSL,
} = process.env;

let type = 'common';
const mongoOpt: Record<string, any> = {};
if (MONGO_REPLICASET) { mongoOpt.replicaSet = MONGO_REPLICASET; }
if (MONGO_AUTHSOURCE) { mongoOpt.authSource = MONGO_AUTHSOURCE; }
if (MONGO_DB) {
    type = 'mongo';
    for (const envKeys in process.env) {
        if (/MONGO_OPT_/.test(envKeys)) {
            const key = envKeys
                .slice(10)
                .toLocaleLowerCase()
                .replace(/_([a-z])/g, (_, b) => b.toUpperCase());
            mongoOpt[key] = process.env[envKeys];
        }
    }
} else if (MYSQL_DB) {
    type = 'mysql';
}
export const model = {
    type,
    common: {
        logSql: true,
        logger: (msg: string) => think.logger.info(msg),
    },
    mongo: {
        host: MONGO_HOST
            ? MONGO_HOST.startsWith('[')
                ? JSON.parse(MONGO_HOST)
                : MONGO_HOST
            : '127.0.0.1',
        port: MONGO_PORT
            ? MONGO_PORT.startsWith('[')
                ? JSON.parse(MONGO_PORT)
                : MONGO_PORT
            : 27017,
        user: MONGO_USER,
        password: MONGO_PASSWORD,
        database: MONGO_DB,
        options: mongoOpt,
    },
    mysql: {
        handle: Mysql,
        dateStrings: true,
        host: MYSQL_HOST || '127.0.0.1',
        port: MYSQL_PORT || '3306',
        database: MYSQL_DB,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        prefix: MYSQL_PREFIX || 'wl_',
        charset: MYSQL_CHARSET || 'utf8mb4',
        ssl:
            MYSQL_SSL === 'true'
                ? {
                    rejectUnauthorized: false,
                }
                : null,
    },
};