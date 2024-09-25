import redis from 'redis';

let client = redis.createClient({ url: 'redis://localhost:6379' });

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});
