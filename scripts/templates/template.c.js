import React from 'react';
import PropTypes from 'prop-types';

import './{{placeHolderForName}}.css';
import classnames from '../../classnames';

export default class {{placeHolderForName}} extends React.Component {
  constructor() {
    super();
    this.state = {};
  };

  render() {
    return (
      <div />
    );
  }
}
{{placeHolderForName}}.propTypes = {
  /** additional classNames you want to add */
  className: PropTypes.string,
  /** required due to accessibility */
  children: PropTypes.node.isRequired
}