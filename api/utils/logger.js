const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors } = format;

// Custom format to include requestId
const customFormat = format((info) => {
  info.requestId = global.requestId || 'no-request-id';
  return info;
})();

// Columnar format for logs
const columnarFormat = printf(({ level, message='', timestamp, stack, requestId, ...metadata }) => {
  // Define column widths
  const widths = {
    timestamp: 23,
    requestId: 15,
    level: 10,
    message: 40
  };

  // Create column headers
  const headers = [
    'TIMESTAMP'.padEnd(widths.timestamp),
    'REQUEST ID'.padEnd(widths.requestId),
    'LEVEL'.padEnd(widths.level),
    'MESSAGE',
  ].join(' | ');

  // Create separator line
  const separator = '-'.repeat(headers.length);

  // Create data row
  const dataRow = [
    timestamp.padEnd(widths.timestamp),
    requestId.padEnd(widths.requestId),
    level.padEnd(widths.level),
    JSON.stringify(message),
  ].join(' | ');

  // Format metadata if present
  let metadataStr = '';
  if (Object.keys(metadata).length > 0) {
    metadataStr = '\nMETADATA:\n' + JSON.stringify(metadata, null, 2)
      .split('\n')
      .map(line => '  ' + line)
      .join('\n');
  }

  // Format stack trace if present
  let stackStr = '';
  if (stack) {
    stackStr = '\nSTACK TRACE:\n' + stack
      .split('\n')
      .map(line => '  ' + line)
      .join('\n');
  }

  return `${headers}\n${separator}\n${dataRow}${metadataStr}${stackStr}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    customFormat,
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSS'
    }),
    errors({
      stack: true
    }),
    columnarFormat
  ),
  transports: [
    new transports.Console()
  ],
});

// Add a method to set requestId context
logger.setRequestId = (requestId) => {
  global.requestId = requestId;
};



module.exports = logger;
