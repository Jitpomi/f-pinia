
const redisClient = require('./redis-client');
const redisSession = require('./redis-session');
const expressOauth = require('./express-oauth');

module.exports = async function(app) {
  await redisClient(app);
  await  redisSession(app);
  expressOauth(app);
};
