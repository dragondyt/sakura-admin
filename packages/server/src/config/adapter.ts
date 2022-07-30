import 'thinkjs3-ts';
import path from 'path';
import Console from 'think-logger3';
import nunjucks from 'think-view-nunjucks';
import fileSession from 'think-session-file';
import fileCache from 'think-cache-file';

export const cache  = {
  type: 'file',
  common: {
    timeout: 24 * 60 * 60 * 1000 // millisecond
  },
  file: {
    handle: fileCache,
    cachePath: path.join(think.ROOT_PATH, 'runtime/cache'), // absoulte path is necessarily required
    pathDepth: 1,
    gcInterval: 24 * 60 * 60 * 1000 // gc interval
  }
};

export const session = {
  type: 'file',
  common: {
    cookie: {
      name: 'thinkjs'
      // keys: ['werwer', 'werwer'],
      // signed: true
    }
  },
  file: {
    handle: fileSession,
    sessionPath: path.join(think.ROOT_PATH, 'runtime/session')
  }
};

export const view = {
  type: 'nunjucks',
  common: {
    viewPath: path.join(think.ROOT_PATH, 'view'),
    sep: '_',
    extname: '.html'
  },
  nunjucks: {
    handle: nunjucks
  }
};

export const model = {
  type: 'mongo',
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
  },
};

/**
 * logger adapter config
 * @type {Object}
 */
export const logger = {
  type: 'console',
  console: {
    handle: Console,
  },
};
