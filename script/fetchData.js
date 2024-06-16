const { Level } = require('level');
const path = require('path');
const os = require('os');

// Construct the path to the LevelDB database
const extensionId = 'hgmhccmlemkkjbcbokmfhpcmnmckojap'; // Replace with your extension's ID
const levelDbPath = path.join(
  os.homedir(),
  'AppData/Local/Google/Chrome/User Data/Default/Local Extension Settings',
  extensionId
);

// Open the LevelDB database
const db = new Level(levelDbPath, { valueEncoding: 'json' });

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

// Fetch all stored values using async iteration
(async () => {
  try {
    for await (const [key, value] of db.iterator()) {
      console.log(`Key: ${key}, Value: ${value}`);
    }
  } catch (err) {
    console.error('Error reading data:', err);
  }
})();
