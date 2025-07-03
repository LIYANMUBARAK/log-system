// src/components/LogList.jsx
import React from "react";

export default function LogList({ logs, loading }) {
  if (loading) return <p>Loading logs...</p>;
  if (!logs.length) return <p>No logs found.</p>;

  return (
    <ul className="log-list">
      {logs.map((log, index) => (
        <div className={`log-card ${log.level.toLowerCase()}`} key={index}>
          <strong>[{log.level.toUpperCase()}]</strong> {log.message}
          <div className="meta">
            {log.timestamp} — {log.resourceId}
          </div>
        </div>
      ))}
    </ul>
  );
}
