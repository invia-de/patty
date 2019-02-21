import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import styles from './{{placeHolderForName}}.module.scss';

function {{placeHolderForName}}(props) {
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

export default {{placeHolderForName}};

export function render{{placeHolderForName}}(props, container, callback) {
  ReactDOM.render(<{{placeHolderForName}} {...props} />, container, callback);
};