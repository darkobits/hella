'use client';

import cx from 'classnames';
import Image from 'next/image';
import React from 'react';
import { Row, Col, Card, Badge } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import { NumericFormat } from 'react-number-format';

import { Symbol } from 'components/Symbol';
import securities, { type SecurityData } from 'etc/securities';
import { getCompanyLogoUrl } from 'lib/utils';

import classes from './stonks.css';


interface StockPriceProps {
  data: SecurityData;
}

function StockPriceCard({ data }: StockPriceProps) {
  if (!data) return null;

  return (
    <Symbol symbol={data.symbol}>
      {(quote, query) => (
        <Card>
          <Card.Body className="rounded">
            <Stack direction="horizontal" gap={4}>

              {/* Logo */}
              <Image
                className={classes.companyLogo}
                src={getCompanyLogoUrl(data.symbol)}
                alt={data.symbol}
                width={46}
                height={46}
              />

              {/* Name & Symbol */}
              <Stack gap={0}>
                <span className="fw-bolder">{data.name}</span>
                <small className="text-secondary">{data.symbol}</small>
              </Stack>

              {/* Price */}
              <Card.Text className="my-0">
                <Badge
                  pill
                  bg="gray"
                  className="py-3 px-4 border"
                >
                  <NumericFormat
                    prefix="$"
                    value={quote?.c as number}
                    displayType="text"
                    thousandSeparator
                    decimalScale={2}
                    fixedDecimalScale
                    className={cx(
                      classes.price,
                      query.isFetching ? 'text-secondary' : 'text-success'
                    )}
                  />
                </Badge>
              </Card.Text>

            </Stack>
          </Card.Body>
        </Card>
      )}
    </Symbol>
  );
}


/**
 * TODO: Bring back useRouteConfig() here to dynamically get this routes label.
 */
export default function StonksPage() {
  return (
    <Row className="mt-4">
      <Col xs={12}>
        <h1 className="mb-4">
          Stonks
        </h1>
        <p>
          Performance Nikkei bills bondholders prices management money maturities market established
          index funds fluctuate district. Debt benchmark retirement capital mutual funds market exchange
          interest established receive. Treasury financial health quarterly. Value capital rollover
          substantially retirement income IRA yield return appeal NYSE.
        </p>
      </Col>
      <Col xs={12} sm={{ span: 6, offset: 3 }}>
        <Stack gap={3} className="mb-3">
          {securities.map(security => (
            <StockPriceCard
              key={security.symbol}
              data={security}
            />
          ))}
        </Stack>
      </Col>
    </Row>
  );
}
