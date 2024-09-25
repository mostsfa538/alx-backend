import redis from 'redis';
import { promisify } from 'util';

let client = redis.createClient({ url: 'redis://localhost:6379' });

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

const getAsync = promisify(client.get).bind(client);

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print);
}

async function displaySchoolValue(schoolName) {
  try {
    const reply = await getAsync(schoolName);
    console.log(reply);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

client.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
