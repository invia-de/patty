import PropTypes from 'prop-types';
/**
 * price formatting component
 */
export default function Price({ value, decimals, symbol, currency }) {
  let fractionCount = decimals ? 2 : 0;
  value = parseFloat(value).toLocaleString('de-DE', {
    minimumFractionDigits: fractionCount,
    maximumFractionDigits: fractionCount
  });

  if (symbol === 'none') {
    return value;
  }

  currency = currency.toUpperCase() === 'CHF' ? 'CHF' : '€';

  return symbol === 'before' ? currency + ' ' + value : value + ' ' + currency;
}
Price.propTypes = {
  /** the number you want to format into a price */
  value: PropTypes.number.isRequired,
  /** if you want fraction counts or not */
  decimals: PropTypes.bool,
  /** currency symbol position */
  symbol: PropTypes.oneOf(['before', 'after', 'none']),
  /** currency symbol to use either `EUR` or `CHF` */
  currency: PropTypes.string
};
Price.defaultProps = {
  currency: 'EUR',
  symbol: 'before'
};
