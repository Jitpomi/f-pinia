const {packages: {lodash: {lget}}} = require('@iy4u/common-utils');

const _APP_SECRET = lget(process.env, 'APP_SECRET', '0dd0ae63acf12332b8ef9d171f4d707dd4d05bfad3ed06f8d32a777aa97692f3593a816e83ca90970e080d14eda2c32a5b6cf5626ee22cad5258537c99292c419b52dca372b408de74720e67d71f6185b0d70950e4843a29fcf5ab1df3e8653cb38316850cff3966bb8005e9368dbbddd0d9b3e555391f5b5234e46de4f0d95550449d31eabbf08bac0111f378187581e53a165bd1f5f10150365fff2670c776327fe3e3bc4686f7adfa89ca0b75e8b3a23ac7d83a722eb20fd42371d67b7dad4fd16781d8942c5a8b15e3c47ff82cea2746f42c57ada5a9ec061086319e5598afd38ce556880ae792ce05ebe67dafff6d88e75d16e42527b99aebb9d4155eb1');

module.exports = {
  'host': 'localhost',
  'port': 3030,
  'public': '../public/',
  'paginate': {
    'default': 10,
    'max': 50,
  },
  'authentication': {
    'entity': 'user',
    'service': 'users',
    'secret': '73CubFQ4ERTNoyU+6YuD0DWdo8Y=',
    'authStrategies': [
      'jwt',
      'local',
    ],
    'jwtOptions': {
      'header': {
        'typ': 'access',
      },
      'audience': 'https://yourdomain.com',
      'issuer': 'feathers',
      'algorithm': 'HS256',
      'expiresIn': '1d',
    },
    'local': {
      'usernameField': 'email',
      'passwordField': 'password',
    },
  },
  fingerprintAuth: {
    entity: 'fingerprint',
    entityId: '_id',
    service: 'fingerprints',
    secret: lget(process.env, 'FINGERPRINTAUTH_SECRET', _APP_SECRET || '5087cc3e6d61591ed5715c5fbf0056a69b0090800d12992368ec267179c30b90748fac4c504aafff0638bb02fb3f78cf15ce31868ab217cd51237614a9ae6d99ea2593184b2cc509d403186b8bc3f440ecdb082ce6e62842105e4cf3e046ce2f16f854c4ac84b7b04b120dd362571bcee606c4bb9b76639111a72e18eb9316d454ba1d74c5c34cd22ce89d51d1e321681b6768f03ac525fb8dc9b89ed6ab4cf2a0e6a6a07b9ce07983c62b7c208fbcbe49ca6a1914547e765a89f08fbca28524ee3231eb1d5cb6ea57a3d56bb8401f3db34ac73e52417032d1449b4ce2e9684bacd365f8385341ab9fa3b58dadf02218c5f74142e52aeed9cc32feab35b520de'),
    authStrategies: [
      'local',
      'jwt',
      'password-less',
    ],
    jwtOptions: {
      header: {
        typ: 'access',
      },
      audience: lget(process.env, 'AUTH_JWT_OPTIONS_FINGERPRINTAUTH_AUDIENCE', '0.0.0.0'),
      issuer: lget(process.env, 'AUTH_JWT_OPTIONS_FINGERPRINTAUTH_ISSUER', lget(process.env, 'APP_NAME', 'IY4u')),
      algorithm: lget(process.env, 'AUTH_JWT_OPTIONS_FINGERPRINTAUTH_ALGORITHM', 'HS256'),
      expiresIn: lget(process.env, 'AUTH_JWT_OPTIONS_FINGERPRINTAUTH_EXPIRESIN', '1d'),
    },
    local: {
      usernameField: 'device',
      passwordField: 'visitorId',
    },
    jwt: {
      header: 'F-Authorization',
    },
    'password-less': {
      usernameField: 'visitorId',
      passwordField: '',
    },
    enforceWhitelist: true,
    whitelistFingerprintFields: [
      '_id',
      'visits',
      'browser',
      'os',
      'platform',
      'engine',
      'userAgent',
      'appVersion',
      'ipInfo',
      'components',
      'createdAt',
      'updatedAt',
      'settings',
      'updatedByHistory',
      'external',
      'nativePermissions',
    ],
    blacklistIntegrationFields: [
      'visitorId',
    ],
  },
  redis: {
    // url: 'redis[s]://[[username][:password]@][host][:port][/db-number]',
    socket: {
      port: 6379,
      host: 'localhost',
      family: 0,
      // path: '',
      connectTimeout: 5000,
      noDelay: true,
      keepAlive: 5000,
      // tls: {},
      reconnectStrategy: retries => Math.min(retries * 50, 500),
    },
    // username: '',
    // password: '',
    // name: '',
    // database: '',
    // modules: [],
    // scripts: [],
    // functions: [],
    // commandsQueueMaxLength: 0,
    disableOfflineQueue: false,
    readonly: false,
    legacyMode: true,
    // isolationPoolOptions: {},
    session : {
      secret: lget(process.env, 'FINGERPRINTAUTH_SECRET', _APP_SECRET || '5087cc3e6d61591ed5715c5fbf0056a69b0090800d12992368ec267179c30b90748fac4c504aafff0638bb02fb3f78cf15ce31868ab217cd51237614a9ae6d99ea2593184b2cc509d403186b8bc3f440ecdb082ce6e62842105e4cf3e046ce2f16f854c4ac84b7b04b120dd362571bcee606c4bb9b76639111a72e18eb9316d454ba1d74c5c34cd22ce89d51d1e321681b6768f03ac525fb8dc9b89ed6ab4cf2a0e6a6a07b9ce07983c62b7c208fbcbe49ca6a1914547e765a89f08fbca28524ee3231eb1d5cb6ea57a3d56bb8401f3db34ac73e52417032d1449b4ce2e9684bacd365f8385341ab9fa3b58dadf02218c5f74142e52aeed9cc32feab35b520de'),
    }
  },
  'mongodb': 'mongodb+srv://root:root@cluster0.lupsiz1.mongodb.net/dZain?ssl=true&serverSelectionTimeoutMS=7000&connectTimeoutMS=30000&maxIdleTimeMS=600000',
  s3: {
    endpoint: 'https://s3.us-west-2.amazonaws.com/',
    region:'us-west-2',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: 'violove'
  }
};
