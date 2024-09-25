import redis from "redis";

let client = redis.createClient({url: 'redis://localhost:6379'});

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

function createHolbertonSchoolsHash() {
  client.hset('HolbertonSchools', 'Portland', 50, redis.print);
  client.hset('HolbertonSchools', 'Seattle', 80, redis.print);
  client.hset('HolbertonSchools', 'New York', 20, redis.print);
  client.hset('HolbertonSchools', 'Bogota', 20, redis.print);
  client.hset('HolbertonSchools', 'Cali', 40, redis.print);
  client.hset('HolbertonSchools', 'Paris', 2, redis.print);
}

function displayHolbertonSchoolsHash() {
  client.hgetall('HolbertonSchools', (err, reply) => {
    if (err) {
      console.error(`Error: ${err.message}`);
    } else {
      console.log(reply);
    }
  });
}

client.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});

createHolbertonSchoolsHash();
displayHolbertonSchoolsHash();
