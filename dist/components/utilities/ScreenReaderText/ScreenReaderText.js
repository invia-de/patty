function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import { screenreadertext } from './ScreenReaderText.module.scss';
export default function ScreenReaderText({
  children,
  className,
  ...other
}) {
  return React.createElement("div", _extends({
    className: className
  }, other), children);
}
ScreenReaderText.propTypes = {
  /** additional classNames you want to add */
  className: PropTypes.string,

  /** required due to accessibility */
  children: PropTypes.node.isRequired
};
ScreenReaderText.defaultProps = {
  className: screenreadertext
};