import { useEffect, useState } from 'react';
import type { ContractCard } from '../data/mockData';

type UseSignalsResult = {
  data: ContractCard[];
  loading: boolean;
  error: string | null;
};

export function useSignals(): UseSignalsResult {
  const [data, setData] = useState<ContractCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/signals')
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json() as Promise<ContractCard[]>;
      })
      .then((json) => {
        setData(json);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Unknown error');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
