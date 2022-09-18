const users = require('./users/users.service.js');
const accounts = require('./accounts/accounts.service.js');
const feathersFingerprints = require('@iy4u/feathers-fingerprint');

const locations = require('./locations/locations.service.js');

const uploads = require('./uploads/uploads.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(accounts);
  app.configure(locations);
  feathersFingerprints.services.configureServices(app,[]);
  app.configure(uploads);
};
