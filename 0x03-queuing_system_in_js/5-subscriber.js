import redis from "redis";

let subscriber = redis.createClient({ url: 'redis://localhost:6379' });

subscriber.on('connect', () => {
  console.log('Redis client connected to the server');
});

subscriber.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.massage}`);
});

subscriber.subscribe('holberton school channel');

subscriber.on('message', (channel, message) => {
  console.log(`Received message from channel ${channel}: ${message}`);
  if (message == 'KILL_SERVER') {
    subscriber.unsubscribe('holberton school channel');
    subscriber.quit();
  }
});
