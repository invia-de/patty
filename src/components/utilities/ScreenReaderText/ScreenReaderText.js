import React from 'react';
import PropTypes from 'prop-types';
import { screenreadertext } from './ScreenReaderText.module.scss';

export default function ScreenReaderText({ children, className, ...other }) {
  return (
    <div className={className} {...other}>
      {children}
    </div>
  );
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
