import { useQuery } from '@tanstack/react-query';
import ms from 'ms';

import { createQueryFn } from './client';


type QueryConfig = Omit<Parameters<typeof useQuery>[2], 'initialData'>;


// ----- [Query] Symbol --------------------------------------------------------

export interface SymbolResponse {
  o: number;
  h: number;
  l: number;
  c: number;
  pc: number;
}

/**
 * Queries the /quote endpoint to get pricing information for a single symbol.
 */
export const useSymbolQuote = (symbol: string, config: QueryConfig = {}) => {
  const query = useQuery<SymbolResponse>(
    ['quote', { symbol }],
    createQueryFn('quote', { symbol }),
    {
      // The time in milliseconds after data is considered stale. If set to
      // Infinity, the data will never be considered stale.
      staleTime: ms('10 seconds'),
      retry: false,
      ...config
    }
  );

  return {
    quote: query.data,
    query
  };
};
