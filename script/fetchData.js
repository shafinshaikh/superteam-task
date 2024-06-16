const level = require('level');
const path = require('path');
const os = require('os');

// Construct the path to the LevelDB database
const extensionId = 'hgmhccmlemkkjbcbokmfhpcmnmckojap'; // Replace with your extension's ID
const levelDbPath = path.join(
  os.homedir(),
  'Library/Application Support/Google/Chrome/Default/Local Extension Settings',
  extensionId
);

// Open the LevelDB database
const db = level(levelDbPath);

// Fetch a specific value
db.get('greeting', (err, value) => {
  if (err) {
    if (err.notFound) {
      console.log('Value not found');
    } else {
      console.error('Error fetching value:', err);
    }
  } else {
    console.log('Greeting:', value);
  }
});

// Fetch all stored values
db.createReadStream()
  .on('data', ({ key, value }) => {
    console.log(`Key: ${key}, Value: ${value}`);
  })
  .on('error', (err) => {
    console.error('Error reading data:', err);
  })
  .on('close', () => {
    console.log('Stream closed');
  })
  .on('end', () => {
    console.log('Stream ended');
  });
