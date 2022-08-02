import 'thinkjs3-ts';
import Axiom from "../log/axiom";

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
}
export const model = {
    type,
    common: {
        logSql: true,
        logger: (msg: string) => think.logger.info(msg),
    },
    mongo: {
        host: ['cluster0-shard-00-00.mwmcp.mongodb.net', 'cluster0-shard-00-01.mwmcp.mongodb.net', 'cluster0-shard-00-02.mwmcp.mongodb.net'],
        port: [27017],
        user: 'blog',
        password: 'VEnOE6URIWFI7Whb',
        database: 'myFirstDatabase',
        options: {
            ssl: true,
            replicaSet: 'atlas-38gwia-shard-0',
            authSource: 'admin',
            retryWrites: true,
            w: 'majority'
        },
    }
};