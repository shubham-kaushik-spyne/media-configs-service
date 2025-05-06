const Sentry = require('@sentry/node');
require('newrelic');


module.exports = function init(sails) {

    return {
        initialize: async function () {
            const dotenv = require('dotenv');
            dotenv.config();
            console.log('Initializing Sentry.');
            Sentry.init({
                dsn: "",
                attachStacktrace: true,
                maxValueLength: 50000,
                environment: process.env.NODE_ENV,
                // integrations: [
                //     new Sentry.Integrations.Http({ tracing: true }),
                // ],
                tracesSampleRate: 1.0,
            });

            global.Sentry = Sentry;
            //Initializing mongoose
            require('../../connection/mongoose/init')
            //Initializing redis
            // require('../../redis/init')

        },
        routes: {

            /**
             * Runs before every matching route.
             *
             * @param {Ref} req
             * @param {Ref} res
             * @param {Function} next
             */
            before: {
              '/*': {
                skipAssets: true,
                async fn(req, res, next) {
                  req.headers.url = req.url;
                  req.id = req.headers['cf-request-id'];
                  if (!req.id)req.id = Date.now();
                  sails.log({
                    ...req.headers, method: req.method, body: req.body, query: req.query,
                  });
                  return next();
                },
              },
            },
          },
    };
}