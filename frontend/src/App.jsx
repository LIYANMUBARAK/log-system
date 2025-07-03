import React, { useEffect, useState } from 'react';
import FilterBar from './components/Fitlerbar';
import LogList from './components/LogList';
import { fetchLogs } from './api/logs';
import { useDebounce } from './hooks/useDebounce';
import { io } from 'socket.io-client';

function App() {
  const [filters, setFilters] = useState({});
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const debouncedFilters = useDebounce(filters, 500);

  // Fetch logs initially and on filters change
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await fetchLogs(debouncedFilters);
      setLogs(result);
      setLoading(false);
    };

    fetchData();
  }, [debouncedFilters]);

  // Real-time listener
  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.on('connect', () => {
      console.log('Connected to Socket.IO:', socket.id);
    });

    socket.on('new_log', (newLog) => {
      console.log('📥 New log received:', newLog);
      setLogs(prev => [newLog, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="app">
      <button onClick={toggleTheme} style={{ float: 'right', margin: '10px' }}>
        Toggle {theme === 'dark' ? 'Light' : 'Dark'}
      </button>

      <h1>Log Viewer</h1>
      <FilterBar filters={filters} setFilters={setFilters} />
      <LogList logs={logs} setLogs={setLogs} loading={loading} /> 
    </div>
  );
}

export default App;
