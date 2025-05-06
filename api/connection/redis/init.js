const redis  = require('redis');
const url =  sails.config.datastores.default.redisUrl;

(async () => {
  sails.log.info('Connecting to redis...');
  const defaultRedisNodeValue = 0;
  const redisNodeValue = sails.config.custom.redisNode ?? defaultRedisNodeValue;

  const redisClient = redis.createClient({
    url: `${url}/${redisNodeValue}`,
    socket: {
      tls: sails.config.custom.useRedisTLSConnection ?? true,  // Enable TLS for secure connection
      rejectUnauthorized: false,  // If using a self-signed certificate, set this to false
    }
  });

  redisClient.on('error', (err) => {
    sails.log.error('Redis connection error:', err);
    // Attempt to reconnect
    setTimeout(() => redisClient.connect(), 5000);
  });

  await redisClient.connect();

  const nodeEnv = process.env.NODE_ENV ?? 'dev';

  let key = `MEDIA-SERVICE-${nodeEnv}:${Date.now()}`;
  await redisClient.set(key, 'true');
  const value = await redisClient.get(key);
  sails.log.info(key, value);

  global['redisClient'] = redisClient;
})().catch(err => {
  sails.log(err);
});
