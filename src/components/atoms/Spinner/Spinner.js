import React from 'react';
import PropTypes from 'prop-types';

import styles from './spinner.module.scss';
import cx from '../../../utils/classnames';

export default function Spinner({ className }) {
  return (
    <div className={cx(styles.spinner, className)}>
      <div className={styles.bounce1} />
      <div className={styles.bounce2} />
      <div className={styles.bounce3} />
    </div>
  );
}
Spinner.propTypes = {
  /** additional classNames you want to add */
  className: PropTypes.string
};
