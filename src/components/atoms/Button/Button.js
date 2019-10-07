import React from 'react';
import PropTypes from 'prop-types';
import cx from '../../../utils/classnames';

import styles from './Button.module.scss';

export default function Button({
  children,
  className,
  onClick,
  secondary,
  block,
  ...props
}) {
  return (
    <button
      className={cx(
        styles.button,
        secondary ? styles.secondary : null,
        block ? styles.block : null,
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  /** additional classNames you want to add */
  className: PropTypes.string,
  /** required due to accessibility */
  children: PropTypes.node.isRequired,
  /** What should happen when the button is pressed */
  onClick: PropTypes.func.isRequired,
  /** should the secondary style be rendered */
  secondary: PropTypes.bool,
  /** Show button as a 100% wide block */
  block: PropTypes.bool
};
