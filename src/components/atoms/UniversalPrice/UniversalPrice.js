import React from 'react';
import PropTypes from 'prop-types';
import Price from '../../utilities/Price/Price';
import url from '../../../utils/url';
import './Universalprice.module.scss';

export default function UniversalPrice({
  priceInEuro,
  price,
  currency,
  priceTotalInEuro,
  priceTotal
}) {
  const usePriceTotal =
    url.get('crm') !== false ||
    (url.get('children') !== false && url.get('children') > 0);

  if ((usePriceTotal && !priceTotal) || (currency && !priceTotal)) {
    return null;
  }

  return (
    <div>
      {currency !== 'EUR' && (
        <div>
          <Price
            value={usePriceTotal ? priceTotal : price}
            currency={currency}
          />
        </div>
      )}
      <Price value={usePriceTotal ? priceTotalInEuro : priceInEuro} />
    </div>
  );
}
UniversalPrice.propTypes = {
  priceInEuro: PropTypes.number,
  price: PropTypes.number,
  currency: PropTypes.string,
  priceTotalInEuro: PropTypes.number,
  priceTotal: PropTypes.number
};
UniversalPrice.defaultProps = {
  priceInEuro: 0,
  price: 0,
  currency: 'EUR',
  priceTotalInEuro: 0,
  priceTotal: 0
};
