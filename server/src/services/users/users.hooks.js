const {authenticate} = require('@feathersjs/authentication').hooks;
const {promisify} = require('util');

const {
  hashPassword, protect,
} = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [
      async ctx => {
        const redisClient = ctx.app.get('redis-client');
        const geoRadiusByMemberAsync = promisify(redisClient.geoRadiusByMember);
        const res = await geoRadiusByMemberAsync(
          'va-universities',
          'virginia-commonwealth-university',
          '100',
          'mi');
        console.log(res);
        return ctx;
      },
    ],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [
      ctx => {
        return ctx;
      },
      hashPassword('password'),
    ],
    update: [hashPassword('password'), authenticate('jwt')],
    patch: [hashPassword('password'), authenticate('jwt')],
    remove: [authenticate('jwt')],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password'),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [
      ctx => {
        return ctx;
      },
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
