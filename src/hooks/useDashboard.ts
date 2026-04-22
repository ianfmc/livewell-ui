import { useEffect, useState } from 'react';
import type { DashboardData } from '../data/mockDashboard';

type UseDashboardResult = {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
};

export function useDashboard(): UseDashboardResult {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/dashboard')
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json() as Promise<DashboardData>;
      })
      .then((json) => { setData(json); })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Unknown error');
      })
      .finally(() => { setLoading(false); });
  }, []);

  return { data, loading, error };
}
