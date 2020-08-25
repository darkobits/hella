export interface SecurityData {
  name: string;
  symbol: string;
}

/**
 * List of company names, their primary domain, and their stock ticker symbols.
 */
const securityData: ReadonlyArray<SecurityData> = [{
  name: 'Apple',
  symbol: 'AAPL'
}, {
  name: 'Alphabet',
  symbol: 'GOOG'
}, {
  name: 'Tesla',
  symbol: 'TSLA'
}, {
  name: 'Microsoft',
  symbol: 'MSFT'
}, {
  name: 'Netflix',
  symbol: 'NFLX'
}, {
  name: 'AMD',
  symbol: 'AMD'
}, {
  name: 'Atlassian',
  symbol: 'TEAM'
}, {
  name: 'Amazon',
  symbol: 'AMZN'
}, {
  name: 'Starbucks',
  symbol: 'SBUX'
}, {
  name: 'Airbnb',
  symbol: 'ABNB'
}];


export default securityData;
