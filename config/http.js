/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */

module.exports.http = {
  middleware: {
    order: [
      'cookieParser',
      'session',
      'setUserLocals',  // Adicione o middleware à ordem
      'bodyParser',
      'compress',
      'poweredBy',
      'router',
      'www',
      'favicon',
    ],
    setUserLocals: require('../api/middleware/setUserLocals'),
  },
};
