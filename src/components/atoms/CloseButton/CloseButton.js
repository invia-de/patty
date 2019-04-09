import React from 'react';
import PropTypes from 'prop-types';

import styles from './CloseButton.module.scss';

export default function CloseButton(props) {
  return <button className={styles.button}>×</button>;
}
CloseButton.propTypes = {
  /** additional classNames you want to add */
  className: PropTypes.string,
  /** required due to accessibility */
  children: PropTypes.node.isRequired
};
