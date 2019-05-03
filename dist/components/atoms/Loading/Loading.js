import React from 'react';
import PropTypes from 'prop-types';
import cx from '../../../utils/classnames';
import styles from './loading.module.scss';
export default function Loading({
  children,
  className,
  size
}) {
  return React.createElement("div", {
    className: cx(styles.loading, className, styles[size])
  }, React.createElement("svg", {
    className: styles.svg,
    x: "0",
    y: "0",
    viewBox: "0 0 150 150"
  }, React.createElement("circle", {
    className: styles.circle,
    cx: "75",
    cy: "75",
    r: "60"
  })), children);
}
Loading.propTypes = {
  /** size */
  size: PropTypes.oneOf(['small', 'medium', 'large']),

  /** additional classname you want to add */
  className: PropTypes.string,

  /** use children to display text next to the spinner */
  children: PropTypes.node
};
Loading.defaultProps = {
  size: 'medium'
};