import { css, cx } from 'linaria';
import { styled } from 'linaria/react';
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { QueryResult } from 'react-query';
// @ts-expect-error
import CurrencyFormat from 'react-currency-format';

import BooleanIndicator from 'components/BooleanIndicator';
import { GRAY_SLIGHTLY_DARKER } from 'etc/colors';
import { FONT_FAMILY_MONOSPACE } from 'etc/constants';

import { useSymbolQuote, SymbolResponse } from 'queries/finnhub';

import { routes } from 'routes';

// ----- Debug Table -----------------------------------------------------------

const tabularNumbers = css`
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum';
`;

const compact = css`
  white-space: nowrap;
  width: 150px;
`;

const DebugTable = styled.div`
  border: 1px solid var(--gray);
  border-radius: 40px;
  width: min-content;
  border-radius: 1em;
  padding-left: 4px;

  & td {
    width: 1px;
    font-size: 12px;
    padding-top: 6px;
    padding-bottom: 6px;
    font-family: ${FONT_FAMILY_MONOSPACE};
  }
`;

// ----- Query Status Panel ----------------------------------------------------

interface QueryStatusProps {
  query: QueryResult<any>;
}

export const QueryStatus: React.FunctionComponent<QueryStatusProps> = ({ query }) => {
  return (
    <DebugTable className="mb-4 mx-auto">
      <table>
        <tbody>
          <tr>
            <td className="pl-2">isFetching</td>
            <td className="pr-3"><BooleanIndicator value={query.isFetching} /></td>
            <td>isLoading</td>
            <td className="pr-3"><BooleanIndicator value={query.isLoading} /></td>
            <td>isStale</td>
            <td className="pr-2"><BooleanIndicator value={query.isStale} /></td>
          </tr>
        </tbody>
      </table>
    </DebugTable>
  );
};

// ----- Spinner ---------------------------------------------------------------

const spinner = css`
  display: block;
  width: 1em;
  height: 1em;
  margin-right: auto;
  margin-left: auto;
  border-width: 1px;
`;

export const Spinner = () => {
  return (
    <div className={cx('spinner-border', spinner)} role="status">
      <span className="sr-only">...</span>
    </div>
  );
};


// ----- Symbols Table ---------------------------------------------------------

const SymbolsTable = styled.table`
  & thead th {
    /* background-color: var(--gray-dark); */
    background-color: ${GRAY_SLIGHTLY_DARKER};
    text-align: right;
  }

  & td {
    vertical-align: middle;
  }
`;


// ----- Symbol Component ------------------------------------------------------

export interface SymbolProps {
  symbol: string;
  children: (quote: SymbolResponse | undefined, query: QueryResult<SymbolResponse>) => JSX.Element;
}

export const Symbol: React.FunctionComponent<SymbolProps> = ({ children, symbol }) => {
  const { quote, query } = useSymbolQuote(symbol);
  return children(quote, query);
};


// ----- Stonks ----------------------------------------------------------------

export const Stonks = () => {
  const symbols = ['AAPL', 'AMZN', 'TSLA'];

  return (
    <Row className="mt-4">
      <Col>
        <h1 className="mb-5">
          {routes.get('stonks').label}
        </h1>
        <SymbolsTable className="table text-light table-bordered col-12 offset-0 col-lg-10 offset-lg-1">
          <thead className="font-weight-bold">
            <tr>
              <th className={cx(compact)}>Symbol</th>
              <th className={cx(compact)}>Open</th>
              <th className={cx(compact)}>High</th>
              <th className={cx(compact)}>Low</th>
              <th className={cx(compact)}>Close</th>
              <th className={cx(compact)}>Previous</th>
            </tr>
          </thead>
          <tbody>
            {symbols.map(symbol => (
              <Symbol key={symbol} symbol={symbol}>
                {(quote, query) => (
                  <tr>
                    <td className="align-middle text-right">
                      {symbol}
                    </td>
                    <td className={cx(tabularNumbers, compact, query.isFetched && 'text-right')}>
                      <CurrencyFormat
                        prefix="$"
                        value={quote?.o}
                        displayType="text"
                        thousandSeparator
                        decimalScale={2}
                        fixedDecimalScale
                        className={cx(query.isFetching && 'text-muted')}
                      />
                    </td>
                    <td className={cx(tabularNumbers, compact, query.isFetched && 'text-right')}>
                      <CurrencyFormat
                        prefix="$"
                        value={quote?.h}
                        displayType="text"
                        thousandSeparator
                        decimalScale={2}
                        fixedDecimalScale
                        className={cx(query.isFetching && 'text-muted')}
                      />
                    </td>
                    <td className={cx(tabularNumbers, compact, query.isFetched && 'text-right')}>
                      <CurrencyFormat
                        prefix="$"
                        value={quote?.l}
                        displayType="text"
                        thousandSeparator
                        decimalScale={2}
                        fixedDecimalScale
                        className={cx(query.isFetching && 'text-muted')}
                      />
                    </td>
                    <td className={cx(tabularNumbers, compact, query.isFetched && 'text-right')}>
                      <CurrencyFormat
                        prefix="$"
                        value={quote?.c}
                        displayType="text"
                        thousandSeparator
                        decimalScale={2}
                        fixedDecimalScale
                        className={cx(query.isFetching && 'text-muted')}
                      />
                    </td>
                    <td className={cx(tabularNumbers, compact, query.isFetched && 'text-right')}>
                      <CurrencyFormat
                        prefix="$"
                        value={quote?.pc}
                        displayType="text"
                        thousandSeparator
                        decimalScale={2}
                        fixedDecimalScale
                        className={cx(query.isFetching && 'text-muted')}
                      />
                    </td>
                  </tr>
                )}
              </Symbol>
            ))}
          </tbody>
        </SymbolsTable>
      </Col>
    </Row>
  );
};

// Required for React.lazy / import().
export default Stonks;
