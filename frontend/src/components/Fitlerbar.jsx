// src/components/FilterBar.jsx
import React from 'react';

export default function FilterBar({ filters, setFilters }) {
  const handleChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      message: '',
      level: '',
      resourceId: '',
      timestamp_start: '',
      timestamp_end: ''
    });
  };

  return (
   <div className="filter-bar">
  <input
    type="text"
    placeholder="Search message"
    value={filters.message || ''}
    onChange={(e) => setFilters(prev => ({ ...prev, message: e.target.value }))}
  />

  <select
    value={filters.level || ''}
    onChange={(e) => setFilters(prev => ({ ...prev, level: e.target.value }))}
  >
    <option value="">All Levels</option>
    <option value="error">Error</option>
    <option value="warn">Warn</option>
    <option value="info">Info</option>
    <option value="debug">Debug</option>
  </select>

  <input
    type="text"
    placeholder="Resource ID"
    value={filters.resourceId || ''}
    onChange={(e) => setFilters(prev => ({ ...prev, resourceId: e.target.value }))}
  />

  <input
    type="datetime-local"
    value={filters.timestamp_start || ''}
    onChange={(e) => setFilters(prev => ({ ...prev, timestamp_start: e.target.value }))}
  />

  <input
    type="datetime-local"
    value={filters.timestamp_end || ''}
    onChange={(e) => setFilters(prev => ({ ...prev, timestamp_end: e.target.value }))}
  />

  <button onClick={() => setFilters({})}>Clear Filters</button>
</div>

  );
}
