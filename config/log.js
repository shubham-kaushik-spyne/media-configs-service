/**
 * Built-in Log Configuration
 * (sails.config.log)
 *
 * Configure the log level for your app, as well as the transport
 * (Underneath the covers, Sails uses Winston for logging, which
 * allows for some pretty neat custom transports/adapters for log messages)
 *
 * For more information on the Sails logger, check out:
 * https://sailsjs.com/docs/concepts/logging
 */
 const winston = require('winston');

 // var customLogger = new winston.Logger();
 
 // function customTimestamp() {
 //   let wholedate, time, date;
 //   wholedate = new Date();
 //   time = wholedate.toLocaleTimeString();
 //   date = wholedate.toLocaleDateString();
 //   wholedate = date + ' ' + time;
 //   return wholedate;
 // }
 
 // customLogger.add(winston.transports.File, {
 //   timestamp: function () {
 //     return customTimestamp();
 //   },
 //   level: 'info',
 //   filename: 'errorlog.log',
 //   json: false
 // });
 
 const logger = winston.createLogger({
   level: 'silly',
   colorize: true,
   format: winston.format.combine(
     winston.format.timestamp(),
     winston.format.errors({ stack: true }),
     winston.format.splat(),
     winston.format.logstash(),
   ),
   // defaultMeta: { service: 'user-service' },
   transports: [
     new winston.transports.Console(),
     // new winston.transports.File({ filename: 'error.log', level: 'error' }),
     // new winston.transports.File({ filename: 'combined.log' })
   ],
 });
 
 if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
   module.exports.log = {
     custom: logger,
     inspect: false,
     level: 'silly',
   };
 } else {
   module.exports.log = {
     inspect: false,
     level: 'silly',
   };
 }
 