import { useQuery, type UseQueryResult, type UseQueryOptions } from '@tanstack/react-query';
import ms from 'ms';

import { createQueryFn } from './client';


// ----- [Query] Symbol --------------------------------------------------------

export interface SymbolResponse {
  o: number;
  h: number;
  l: number;
  c: number;
  pc: number;
}

export interface UseSymbolQuoteReturn {
  quote: SymbolResponse | undefined;
  query: UseQueryResult<SymbolResponse>;
}


/**
 * Queries the /quote endpoint to get pricing information for a single symbol.
 */
export function useSymbolQuote(symbol: string, config: Partial<UseQueryOptions<SymbolResponse>> = {}) {
  const query = useQuery<SymbolResponse>({
    queryKey: ['quote', { symbol }],
    queryFn: createQueryFn('quote', { symbol }),
    // The time in milliseconds after data is considered stale. If set to
    // Infinity, the data will never be considered stale.
    staleTime: ms('10 seconds'),
    retry: false,
    ...config
  });

  return {
    quote: query.data,
    query
  } as UseSymbolQuoteReturn;
}
