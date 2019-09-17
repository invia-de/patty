import React from 'react';
import PropTypes from 'prop-types';
import classnames from '../../../utils/classnames';
import styles from './NoBreak.module.scss';

/**
 * @author [Eric Zieger](mailto:eric.zieger@invia.de)
 */
export default function NoBreak({ ellipsis, className, children, ...other }) {
  return (
    <div
      className={classnames(styles.nobreak, ellipsis && styles.ellipsis)}
      {...other}
    >
      {children}
    </div>
  );
}
NoBreak.propTypes = {
  /** required due to accessibility */
  children: PropTypes.node.isRequired,
  /** cut text and add ... */
  ellipsis: PropTypes.bool
};
