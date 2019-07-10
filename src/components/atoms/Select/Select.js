import React from 'react';
import PropTypes from 'prop-types';

import cx from '../../../utils/classnames';
import { ArrowDown } from '../Icon/Icon';

import styles from './select.module.scss';

/**
 * @author [Roman Semko](mailto:roman.semko-extern@invia.de)
 */
export default function Select({ children, className, ...props }) {
  return (
    <div className={cx(styles.select, className)}>
      <ArrowDown className={styles.icon} />
      <select {...props}>{children}</select>
    </div>
  );
}

Select.propTypes = {
  /** additional classNames you want to add */
  className: PropTypes.string,
  /** required due to accessibility */
  children: PropTypes.node.isRequired
};
