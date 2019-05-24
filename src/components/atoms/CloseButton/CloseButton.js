import React from 'react';
import PropTypes from 'prop-types';
import { Close } from '../Icon/Icon';
import cx from '../../../utils/classnames';
import styles from './CloseButton.module.scss';

export default function CloseButton({ className, onClick }) {
  return (
    <button
      type="button"
      aria-label="Close"
      className={cx(styles.button, className)}
      onClick={onClick}
    >
      <Close />
    </button>
  );
}
CloseButton.propTypes = {
  /** additional classNames you want to add */
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired
};
