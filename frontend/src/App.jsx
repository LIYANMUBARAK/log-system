// src/App.jsx
import React, { useEffect, useState } from 'react';
import FilterBar from './components/Fitlerbar';
import LogList from './components/LogList';
import { fetchLogs } from './api/logs';
import { useDebounce } from './hooks/useDebounce';

function App() {
  const [filters, setFilters] = useState({});
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load saved theme or default to 'light'
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  // Apply theme to body and save it
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const debouncedFilters = useDebounce(filters, 500);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await fetchLogs(debouncedFilters);
      setLogs(result);
      setLoading(false);
    };

    fetchData();
  }, [debouncedFilters]);

  return (
    <div className="app">
      <button onClick={toggleTheme} style={{ float: 'right', margin: '10px' }}>
        Toggle {theme === 'dark' ? 'Light' : 'Dark'}
      </button>

      <h1>Log Viewer</h1>
      <FilterBar filters={filters} setFilters={setFilters} />
      <LogList logs={logs} loading={loading} />
    </div>
  );
}

export default App;
