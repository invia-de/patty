import React from 'react';
import PropTypes from 'prop-types';
import cx from '../../../utils/classnames';

import styles from './CloseButton.module.scss';

export default function CloseButton({ className, onClick }) {
  return (
    <button
      type="button"
      aria-label="Close"
      className={cx(styles.button, className)}
      onClick={onClick}
    >
      <svg
        version="1.1"
        id="CloseButton"
        xmlns="http://www.w3.org/2000/svg"
        x="2px"
        y="2px"
        width="10px"
        height="10px"
        viewBox="0 0 512 512"
      >
        <path
          d="M255.973,358.455L102.457,511.971L0,409.518l153.515-153.516L0,102.485L102.457,0.029l153.516,153.516L409.49,0.029
	l102.455,102.456L358.429,256.002L512,409.518L409.49,511.971L255.973,358.455z"
        />
      </svg>
    </button>
  );
}
CloseButton.propTypes = {
  /** additional classNames you want to add */
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired
};
