import {log} from "next-axiom";

const cors = require('@koa/cors');
const routerREST = require('think-router-rest');
const isDev = think.env === 'development';
const isTcb = think.env === 'cloudbase';
const isDeta = think.env === 'deta' || process.env.DETA_RUNTIME === 'true';
const isAliyunFC =
    think.env === 'aliyun-fc' || Boolean(process.env.FC_RUNTIME_VERSION);

export default [
  {
    handle: 'dashboard',
    match: '/',
  },

  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev,
      requestTimeoutCallback: isTcb || isDeta || isAliyunFC ? false : () => {},
    },
  },
  { handle: cors },

  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: true,
      contentType: () => 'json',
      error(err: any, ctx: any) {
        if (/favicon.ico$/.test(ctx.url)) {
          return;
        }
        log.error(err);
      },
    },
  },

  {
    handle: 'payload',
    options: {
      keepExtensions: true,
      limit: '5mb',
      multiples: true
    },
  },

  {
    handle: 'router',
    options: {},
  },

  { handle: routerREST },

  'logic',
  'controller',
];
