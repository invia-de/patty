import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './CloseButton.module.scss';
export default function CloseButton({
  className,
  onClick
}) {
  return React.createElement("button", {
    className: cx(styles.button, className),
    onClick: onClick
  }, "\xD7");
}
CloseButton.propTypes = {
  /** additional classNames you want to add */
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired
};
