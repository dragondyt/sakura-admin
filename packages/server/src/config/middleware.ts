import 'thinkjs3-ts';
import path from 'path';
const routerREST = require('think-router-rest');
const isDev = think.env === 'development';

export = [
  {
    handle: 'dashboard',
    match: /^\/ui/,
  },
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: 'resource',
    enable: isDev,
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: /^\/(static|favicon\.ico)/
    }
  },
  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: isDev
    }
  },
  {
    handle: 'payload',
    options: {
      uploadDir: path.join(think.RUNTIME_PATH, '_tmp'),
      keepExtensions: true,
      limit: '5mb'
    }
  },
  {
    handle: 'router',
    options: {}
  },
  { handle: routerREST },
  'logic',
  'controller'
];
