import { useState, useCallback } from 'react';
import api from '../api/apiService';

export default function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (config) => {
    setLoading(true); setError(null);
    try {
      const res = await api(config);
      setLoading(false);
      return res.data;
    } catch (err) {
      setError(err.response?.data || err.message);
      setLoading(false);
      throw err;
    }
  }, []);

  return { loading, error, request };
}
