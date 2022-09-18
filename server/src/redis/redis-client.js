const redis = require('redis');
const {FeathersError} = require('@feathersjs/errors');
// const {promisifyAll} = require('bluebird');
// promisifyAll(redis);

class RedisConnectError extends FeathersError {
  constructor(message, data) {
    super(message, 'RedisConnect: ', 415, 'redis-connect-type', data);
  }
}

module.exports = async function (app) {
  try {
    const redisConfig = app.get('redis');
    const redisClient = redis.createClient(redisConfig);
    await redisClient.connect();
    app.set('redis-client', redisClient);
    return redisClient;
  } catch (e) {
    throw new RedisConnectError('Redis client failed to connect.', e);
  }
};
