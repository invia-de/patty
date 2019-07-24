import React from 'react';
import PropTypes from 'prop-types';
import Price from '../../utilities/Price/Price';
import url from '../../../utils/url';
import './Universalprice.module.scss';

export const usePriceTotal =
  url.get('crm') !== false || url.get('children') > 0;

export default function UniversalPrice({
  priceInEuro,
  price,
  currency,
  priceTotalInEuro,
  priceTotal,
  usePriceTotal
}) {
  if ((usePriceTotal && !priceTotal) || (currency && !priceTotal)) {
    return null;
  }

  return (
    <span>
      {currency !== 'EUR' && (
        <span>
          <Price
            value={usePriceTotal ? priceTotal : price}
            currency={currency}
          />
        </span>
      )}
      <Price value={usePriceTotal ? priceTotalInEuro : priceInEuro} />
    </span>
  );
}
UniversalPrice.propTypes = {
  priceInEuro: PropTypes.number,
  price: PropTypes.number,
  currency: PropTypes.string,
  priceTotalInEuro: PropTypes.number,
  priceTotal: PropTypes.number,
  usePriceTotal: PropTypes.bool
};
UniversalPrice.defaultProps = {
  priceInEuro: 0,
  price: 0,
  currency: 'EUR',
  priceTotalInEuro: 0,
  priceTotal: 0,
  usePriceTotal: usePriceTotal
};
