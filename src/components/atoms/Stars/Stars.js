import React from 'react';
import PropTypes from 'prop-types';

import { Star } from '../Icon/Icon';
import cx from '../../../utils/classnames';

import styles from './stars.module.scss';

/**
 * @author [Roman Semko](mailto:roman.semko-extern@invia.de)
 */
const Stars = ({ value, className }) => {
  const stars = Array.from({ length: Math.floor(value) }).map((x, i) => (
    <Star key={i} />
  ));
  if (value % 1 > 0) {
    stars.push(<Star half key={0.5} />);
  }
  return <span className={cx(styles.stars, className)}>{stars}</span>;
};

Stars.propTypes = {
  /** how many stars to show */
  value: PropTypes.number.isRequired,
  /** additional styling classes */
  className: PropTypes.string
};

export default Stars;
