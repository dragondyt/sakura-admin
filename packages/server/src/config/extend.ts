import view from 'think-view';
import cache from 'think-cache';
import session from 'think-session';
import Mongo from 'think-mongo';
export = [
  view,
  cache,
  session,
  Mongo(think.app),
];
