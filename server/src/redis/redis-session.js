const expressSession = require('express-session');
let RedisStore = require('connect-redis')(expressSession);
module.exports = async function (app) {
  try {
    const redisClient = app.get('redis-client');
    const {session} = app.get('redis');
    const store = new RedisStore({client: redisClient});
    app.set('redis-session',
      expressSession({
        store,
        saveUninitialized: false,
        secret: session.secret,
        resave: false,
      }));
  } catch (e) {
    console.log(e);
  }
};
