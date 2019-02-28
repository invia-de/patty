import React from 'react';
import PropTypes from 'prop-types';

import './{{placeHolderForPrecompiler}}';

export default function {{placeHolderForName}}(props) {
  return (
    <div />
  );
}
{{placeHolderForName}}.propTypes = {
  /** additional classNames you want to add */
  className: PropTypes.string,
  /** required due to accessibility */
  children: PropTypes.node.isRequired
}
