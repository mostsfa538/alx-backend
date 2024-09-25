import redis from 'redis';

let client = redis.createClient({ url: 'redis://localhost:6379' });

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print);
}
function displaySchoolValue(schoolName) {
  client.get(schoolName, (err, reply) => {
      if (err) {
        console.error(err.massage);
      }
      else {
        console.log(reply);
      }
    })
}

client.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
