const {expressOauth} = require('@feathersjs/authentication-oauth');

module.exports = function (app) {
  return expressOauth({
    expressSession: app.get('redis-session'),
  });
};
