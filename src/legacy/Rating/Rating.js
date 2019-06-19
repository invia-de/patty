import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import RatingIcon from './RatingIcon/RatingIcon';
import styles from './rating.module.scss';
import cx from '../../utils/classnames';

const ratings = {
  1: 'In Ordnung',
  2: 'In Ordnung',
  3: 'Gut',
  4: 'Sehr Gut',
  5: 'Exzellent'
};

/**
 * @author [Roman Semko](mailto:roman.semko-extern@invia.de)
 */
function Rating({ rating, link, count, className }) {
  const r = ratings[Math.max(1, Math.min(5, Math.round(rating)))];
  return (
    <a className={cx(styles.rating, className)} alt="Bewertung" href={link}>
      <RatingIcon />
      <div>
        {rating} / 5 <strong>{r}</strong>
        <span>
          {count} Bewertung{count !== 1 ? 'en' : ''}
        </span>
      </div>
    </a>
  );
}

Rating.propTypes = {
  /** additional classNames you want to add */
  className: PropTypes.string,
  /** required due to accessibility */
  children: PropTypes.node,
  rating: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired
};

export default Rating;

export function renderRating(props, container, callback) {
  ReactDOM.render(<Rating {...props} />, container, callback);
}
