import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import styles from './Test.module.scss';

function Test(props) {
  return <div className={styles.fakefake}>lorem ipsum </div>;
}
Test.propTypes = {
  /** additional classNames you want to add */
  className: PropTypes.string,
  /** required due to accessibility */
  children: PropTypes.node.isRequired
};

export default Test;

export function renderTest(props, container, callback) {
  ReactDOM.render(<Test {...props} />, container, callback);
}
