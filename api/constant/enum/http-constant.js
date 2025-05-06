const HTTP_STATUS = {
    // Success responses (2xx)
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
  
    // Client error responses (4xx)
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
  
    // Server error responses (5xx)
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
  };
  
  const ERROR_MESSAGES = {
    // Success messages (2xx)
    [HTTP_STATUS.OK]: 'Request successful',
    [HTTP_STATUS.CREATED]: 'Resource created successfully',
    [HTTP_STATUS.ACCEPTED]: 'Request accepted for processing',
    [HTTP_STATUS.NO_CONTENT]: 'Request successful, no content to return',
  
    // Client error messages (4xx)
    [HTTP_STATUS.BAD_REQUEST]: 'Invalid request parameters',
    [HTTP_STATUS.UNAUTHORIZED]: 'Authentication required',
    [HTTP_STATUS.FORBIDDEN]: 'Access denied',
    [HTTP_STATUS.NOT_FOUND]: 'Resource not found',
    [HTTP_STATUS.METHOD_NOT_ALLOWED]: 'Method not allowed',
    [HTTP_STATUS.CONFLICT]: 'Resource conflict',
    [HTTP_STATUS.UNPROCESSABLE_ENTITY]: 'Unable to process request',
    [HTTP_STATUS.TOO_MANY_REQUESTS]: 'Too many requests',
  
    // Server error messages (5xx)
    [HTTP_STATUS.INTERNAL_SERVER_ERROR]: 'Internal server error',
    [HTTP_STATUS.NOT_IMPLEMENTED]: 'Feature not implemented',
    [HTTP_STATUS.BAD_GATEWAY]: 'Bad gateway',
    [HTTP_STATUS.SERVICE_UNAVAILABLE]: 'Service temporarily unavailable',
  };
  
  const createError = (statusCode, customMessage = null, data = null) => {
    const error = new Error(customMessage || ERROR_MESSAGES[statusCode]);
    error.statusCode = statusCode;
    error.data = data;
    error.error = customMessage;
    error.status = 'FAILED';
    sails.log.error('Error creating asset:', error);
    return error;
  };
  const createSuccess = (data, error=null) => {
    return { status: 'SUCCESS', data, error: error  };
  };
  
  module.exports = {
    HTTP_STATUS,
    ERROR_MESSAGES,
    createError,
    createSuccess
  };
  