import React from 'react';
import PropTypes from 'prop-types';
import styles from './CloseButton.module.scss';
export default function CloseButton(props) {
  return React.createElement("button", {
    className: styles.button
  }, "\xD7");
}
CloseButton.propTypes = {
  /** additional classNames you want to add */
  className: PropTypes.string,

  /** required due to accessibility */
  children: PropTypes.node.isRequired
};