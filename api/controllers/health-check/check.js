const {HTTP_STATUS} = require('../../constant/enum/http-constant');
const logger  = require('../../utils/logger');
module.exports = {
  friendlyName: 'Health check Api',
  description: 'This API is checking the health of the service',

  inputs: {
    sqlDbCheck: {
      type: 'number',
      defaultsTo: 1,
    },
    mongoDbCheck: {
      type: 'number',
      defaultsTo: 1,
    },
    redisCheck: {
      type: 'number',
      defaultsTo: 0,
    },
  },

  exits: {
    success: {
      statusCode: HTTP_STATUS.OK,
    },
    serviceUnavailable: {
      statusCode: HTTP_STATUS.SERVICE_UNAVAILABLE,
    },
  },

  fn: async function (inputs, exits) {
    try{
      const {
        sqlDbCheck,
        mongoDbCheck,
        redisCheck,
      } = inputs;

      let serviceStatusCode = 200;
      let sqlStatus = '';
      let mongoStatus = '';
      let redisStatus = '';
      let serviceStatus = 'ok';
      if (sqlDbCheck) {
        try {
          await sqlCall();
          sqlStatus = {status: 'ok'};
        } catch (error) {
          logger.error(error);
          sqlStatus = {status: 'failed', error: error.message};
          serviceStatusCode = 503;
          serviceStatus = 'failed';
        }
      }
      if (mongoDbCheck) {
        try {
          await mongoDbCall();
          mongoStatus = {status: 'ok'};
        } catch (error) {
          logger.error(error);
          mongoStatus = {status: 'failed', error: error.message};
          serviceStatusCode = 503;
          serviceStatus = 'failed';
        }
      }
      if (redisCheck) {
        try {
          await redisCall();
          redisStatus = {status: 'ok'};
        } catch (error) {
          logger.error(error);
          redisStatus = {status: 'failed', error: error.message};
          serviceStatusCode = 503;
          serviceStatus = 'failed';
        }
      }

      let response = {
        sqlStatus,
        mongoStatus,
        redisStatus,
        serviceStatus
      };

      logger.info(response);
      if (serviceStatusCode === 503) {
        return exits.serviceUnavailable({ data: response });
      } else {
        return exits.success({ data: response });
      }
    }catch(err){
      return this.res.serverError(err);
    }

  },
};

async function sqlCall() {
  const query = 'SELECT version()';
  return sails.sendNativeQuery(query, []);
}

async function mongoDbCall() {
  return sails.mongoose.connections[0].readyState;
}

async function redisCall() {
  return  global['redisClient'].ping();
}
