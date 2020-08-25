import cx from 'classnames';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import CurrencyFormat from 'react-number-format';

import { Symbol } from 'components/Symbol';
import { type RouteProps } from 'routes';

import classes from './Stonks.css';


export const Stonks = ({ useRouteConfig }: RouteProps) => {
  const { label } = useRouteConfig();
  const symbols = ['AAPL', 'AMZN', 'TSLA', 'GOOG'];

  return (
    <Row className="mt-4">
      <Col xs="12">
        <h1 className="mb-5">
          {label}
        </h1>
        <Table
          variant="dark"
          bordered
          hover
          className={classes.symbolsTable}
        >
          <thead className="font-weight-bold">
            <tr>
              <th className={classes.compact} style={{ width: '1px', whiteSpace: 'nowrap' }}>Symbol</th>
              <th className={classes.compact}>Open</th>
              <th className={classes.compact}>High</th>
              <th className={classes.compact}>Low</th>
              <th className={classes.compact}>Close</th>
              <th className={classes.compact}>Previous</th>
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
                    <td
                      className={cx(
                        classes.tabularNumbers,
                        classes.compact,
                        query.isFetched && 'text-right'
                      )}
                    >
                      <CurrencyFormat
                        prefix="$"
                        value={quote?.o as number}
                        displayType="text"
                        thousandSeparator
                        decimalScale={2}
                        fixedDecimalScale
                        className={cx(query.isFetching && 'text-muted')}
                      />
                    </td>
                    <td
                      className={cx(
                        classes.tabularNumbers,
                        classes.compact,
                        query.isFetched && 'text-right'
                      )}
                    >
                      <CurrencyFormat
                        prefix="$"
                        value={quote?.h as number}
                        displayType="text"
                        thousandSeparator
                        decimalScale={2}
                        fixedDecimalScale
                        className={cx(query.isFetching && 'text-muted')}
                      />
                    </td>
                    <td
                      className={cx(
                        classes.tabularNumbers,
                        classes.compact,
                        query.isFetched && 'text-right'
                      )}
                    >
                      <CurrencyFormat
                        prefix="$"
                        value={quote?.l as number}
                        displayType="text"
                        thousandSeparator
                        decimalScale={2}
                        fixedDecimalScale
                        className={cx(query.isFetching && 'text-muted')}
                      />
                    </td>
                    <td
                      className={cx(
                        classes.tabularNumbers,
                        classes.compact,
                        query.isFetched && 'text-right'
                      )}
                    >
                      <CurrencyFormat
                        prefix="$"
                        value={quote?.c as number}
                        displayType="text"
                        thousandSeparator
                        decimalScale={2}
                        fixedDecimalScale
                        className={cx(query.isFetching && 'text-muted')}
                      />
                    </td>
                    <td
                      className={cx(
                        classes.tabularNumbers,
                        classes.compact,
                        query.isFetched && 'text-right'
                      )}
                    >
                      <CurrencyFormat
                        prefix="$"
                        value={quote?.pc as number}
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
        </Table>
      </Col>
    </Row>
  );
};
