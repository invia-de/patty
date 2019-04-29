function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import { icons } from './Icon.module.scss';
import cx from '../../../utils/classnames';
/**
 * @author [Eric Zieger](mailto:eric.zieger@invia.de)
 * @since 0.1.0
 */

export function Icon({
  viewBox,
  path,
  className,
  ...other
}) {
  return React.createElement("svg", _extends({
    viewBox: viewBox,
    "aria-hidden": "true"
  }, other, {
    className: cx(icons, className)
  }), path && path.map((d, i) => React.createElement("path", {
    key: i,
    d: d
  })));
}
Icon.propTypes = {
  /** additional classname you want to add */
  className: PropTypes.string,

  /**
   * if you want to render a custom SVG icon you can drop in as many paths as
   * needed (attention: will automatically render `<path d="XYZ" />`) and will
   * not work with other SVG tags.
   */
  path: PropTypes.arrayOf(PropTypes.string),

  /** set a custom viewbox if `0 0 512 512` does not fit your icon */
  viewBox: PropTypes.string
};
Icon.defaultProps = {
  viewBox: '0 0 512 512'
};
export function Hotline(props) {
  return React.createElement(Icon, _extends({}, props, {
    path: ['M312 129c4 4 6 10 6 16 0 9-4 16-9 22-6 6-13 9-21 9h-1c-6 0-12-2-16-6-4-5-6-11-6-18s3-14 8-20 12-9 22-10c7 0 12 3 17 7zm-85 129l-7-20 1-1c14-12 27-22 41-31 13-8 24-12 31-12 5 0 8 2 10 5 2 4 3 8 3 13 0 10-1 18-3 25l-20 83-2 10v2l11-7c7-4 11-8 15-12l3-1 8 16v2h-1c-12 13-25 24-39 33-14 8-25 13-31 13-5 0-9-2-12-5s-4-8-4-16l2-26 19-80 2-10c-6 2-14 8-24 17l-3 2zm231 149c-55 67-139 95-218 84-5-16-8-14-19-38a202 202 0 1 0-38-376c0-18 5-26 6-42a237 237 0 0 1 269 372zM92 363l61-5c17 21 37 83 37 83-37 35-86 39-124 0a309 309 0 0 1-44-310c14-37 63-73 104-56 42 16 21 76 2 109l-53 5s-15 17-8 89c7 71 25 85 25 85z']
  }));
}
export function ArrowLeft(props) {
  return React.createElement(Icon, _extends({}, props, {
    path: ['M425 430L249 255 426 80 346 0 87 259l253 253 85-82z']
  }));
}
export function ArrowRight(props) {
  return React.createElement(Icon, _extends({}, props, {
    path: ['M88 82l176 176L87 432l80 80 259-259L173 0 88 82z']
  }));
}
export function Quotation(props) {
  return React.createElement(Icon, _extends({
    viewBox: '0 0 350 350'
  }, props, {
    path: [`M150.299 26.634v58.25c0 7.9-6.404 14.301-14.304 14.301-28.186 0-43.518 28.909-45.643 85.966h45.643c7.9 0 14.304 6.407 14.304 14.304v122.992c0 7.896-6.404 14.298-14.304 14.298H14.301C6.398 336.745 0 330.338 0 322.447V199.455c0-27.352 2.754-52.452 8.183-74.611 5.568-22.721 14.115-42.587 25.396-59.048 11.608-16.917 26.128-30.192 43.16-39.44C93.886 17.052 113.826 12.333 136 12.333c7.895 0 14.299 6.401 14.299 14.301zm184.474 72.552c7.896 0 14.305-6.407 14.305-14.301v-58.25c0-7.9-6.408-14.301-14.305-14.301-22.165 0-42.108 4.72-59.249 14.023-17.035 9.248-31.563 22.523-43.173 39.44-11.277 16.461-19.824 36.328-25.393 59.054-5.426 22.166-8.18 47.266-8.18 74.605v122.992c0 7.896 6.406 14.298 14.304 14.298h121.69c7.896 0 14.299-6.407 14.299-14.298V199.455c0-7.896-6.402-14.304-14.299-14.304H289.78c2.093-57.056 17.201-85.965 44.993-85.965z`]
  }));
} // at the moment only needed for styleguidist since it only loads [A-Z]*.js
// and not the [A-Z]*/index.js

export default {
  Icon,
  ArrowRight,
  ArrowLeft,
  Hotline
};