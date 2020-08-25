import cx from 'classnames';
import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
// import Table from 'react-bootstrap/Table';
import Stack from 'react-bootstrap/Stack';
import { NumericFormat } from 'react-number-format';

import { Symbol } from 'components/Symbol';
import securities, { type SecurityData } from 'etc/securities';
import { getCompanyLogoUrl } from 'lib/utils';
import { type RouteProps } from 'routes';


import classes from './Stonks.css';


interface StockPriceProps {
  companyName: string;
}

const StockPrice = ({ companyName }: StockPriceProps) => {
  const [securityData, setSecurityData] = React.useState<SecurityData>();

  /**
   * [Effect]
   *
   * Look-up and set the static data for this security.
   */
  React.useEffect(() => {
    const data = securities.find(s => s.name === companyName);
    if (!data) throw new Error(`[StockPrice] Unknown company: "${companyName}".`);
    setSecurityData(data);
  }, [companyName]);


  if (!securityData) return null;
  const { name, symbol } = securityData;

  return (
    <Symbol symbol={symbol}>
      {(quote, query) => (
        <Card
          className="bg-dark text-white"
        >
          <Card.Body className={cx(classes.bgSlightlyDarker, 'rounded')}>
            <Stack direction="horizontal" gap={4}>

              {/* Logo */}
              <Image
                src={getCompanyLogoUrl(symbol)}
                width={46}
                height={46}
                roundedCircle
              />

              {/* Name & Symbol */}
              <Stack gap={0}>
                <strong>{name}</strong>
                <small className="text-muted">{symbol}</small>
              </Stack>

              {/* Price */}
              <Card.Text className="my-0">
                <Badge
                  pill
                  bg="dark"
                  className="py-3 px-4"
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
                      query.isFetching ? 'text-muted' : 'text-success'
                    )}
                    style={{
                      fontSize: '14px'
                    }}
                  />
                </Badge>
              </Card.Text>

            </Stack>
          </Card.Body>
        </Card>
      )}
    </Symbol>
  );
};


export const Stonks = ({ useRouteConfig }: RouteProps) => {
  const { label } = useRouteConfig();

  return (
    <Row className="mt-4">
      <Col xs={12}>
        <h1 className="mb-4">
          {label}
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
            <StockPrice
              key={security.symbol}
              companyName={security.name}
            />
          ))}
        </Stack>
      </Col>
    </Row>
  );
};
