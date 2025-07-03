const express = require('express');
const router = express.Router();
const { readLogs, writeLogs } = require('../utils/fileHandler');

// Schema validation
function isValidLog(log) {
  return (
    typeof log.level === 'string' &&
    typeof log.message === 'string' &&
    typeof log.resourceId === 'string' &&
    typeof log.timestamp === 'string' &&
    typeof log.traceId === 'string' &&
    typeof log.spanId === 'string' &&
    typeof log.commit === 'string' &&
    typeof log.metadata === 'object' &&
    !Array.isArray(log.metadata)
  );
}

//POST api
router.post('/', (req, res) => {
  const log = req.body;

  if (!isValidLog(log)) {
    return res.status(400).json({ error: 'Invalid log schema' });
  }

  try {
    const logs = readLogs();
    logs.push(log);
    writeLogs(logs);
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ error: 'Failed to write log data' });
  }
});

// GET api
router.get('/', (req, res) => {
  try {
    let logs = readLogs();
    const {
      level,
      message,
      resourceId,
      timestamp_start,
      timestamp_end,
      traceId,
      spanId,
      commit
    } = req.query;

    // Apply filters
    if (level) logs = logs.filter(l => l.level === level);
    if (message) logs = logs.filter(l => l.message.toLowerCase().includes(message.toLowerCase()));
    if (resourceId) logs = logs.filter(l => l.resourceId === resourceId);
    if (timestamp_start) logs = logs.filter(l => new Date(l.timestamp) >= new Date(timestamp_start));
    if (timestamp_end) logs = logs.filter(l => new Date(l.timestamp) <= new Date(timestamp_end));
    if (traceId) logs = logs.filter(l => l.traceId === traceId);
    if (spanId) logs = logs.filter(l => l.spanId === spanId);
    if (commit) logs = logs.filter(l => l.commit === commit);

   
    logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read logs' });
  }
});

module.exports = router;
