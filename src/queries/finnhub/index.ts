import ms from 'ms';
import { useQuery, QueryConfig } from 'react-query';

import { get } from './client';

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
export const useSymbolQuote = (symbol: string, config: QueryConfig<SymbolResponse> = {}) => {
  const query = useQuery<SymbolResponse>(['quote', { symbol }], get(), {
    staleTime: ms('10 seconds'),
    retry: false,
    ...config
  });

  return {
    quote: query.data,
    query
  };
};
