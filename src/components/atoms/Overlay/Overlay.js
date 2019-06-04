import React from 'react';
import PropTypes from 'prop-types';
import cx from '../../../utils/classnames';

import styles from './Overlay.module.scss';

/**
 * @author [Roman Semko](mailto:roman.semko-extern@invia.de)
 * @since 0.1.0
 */
export default function Overlay({
  children,
  className,
  open,
  onClick,
  isStatic
}) {
  if (!open) {
    return null;
  }
  return (
    <div
      onClick={onClick}
      className={cx(styles.overlay, isStatic && styles.static, className)}
    >
      {children}
    </div>
  );
}

Overlay.propTypes = {
  /** additional classNames you want to add */
  className: PropTypes.string,
  /** required due to accessibility */
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  /** When the overly gets clicked */
  onClick: PropTypes.func,
  /* prevents modal from unfolding full-screen on smaller devices */
  isStatic: PropTypes.bool
};
