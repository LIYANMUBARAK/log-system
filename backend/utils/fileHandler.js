const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'logs.json');

function readLogs() {
  try {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeLogs(logs) {
  fs.writeFileSync(filePath, JSON.stringify(logs, null, 2));
}

module.exports = { readLogs, writeLogs };
