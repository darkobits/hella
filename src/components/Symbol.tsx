import ms from 'ms';
import React from 'react';

import { useSymbolQuote, SymbolResponse } from 'queries/finnhub';

import type { UseQueryResult } from '@tanstack/react-query';


export interface SymbolProps {
  symbol: string;
  children: (quote: SymbolResponse | undefined, query: UseQueryResult<SymbolResponse>) => JSX.Element;
}

/**
 * Generic component that accepts a symbol and a render function, and passes
 * price information on that symbol to the provided render function every 20
 * seconds.
 */
export const Symbol: React.FunctionComponent<SymbolProps> = ({ children, symbol }) => {
  const { quote, query } = useSymbolQuote(symbol, {
    refetchInterval: ms('20 seconds')
  });

  return children(quote, query);
};
