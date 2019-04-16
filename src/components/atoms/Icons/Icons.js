import React from 'react';
import PropTypes from 'prop-types';

import './Icons.scss';

export default function Icons(props) {
  return <div />;
}
Icons.propTypes = {
  /** additional classNames you want to add */
  className: PropTypes.string,
  /** required due to accessibility */
  children: PropTypes.node.isRequired
};
