import React from 'react';
import PropTypes from 'prop-types';

import cx from '../../../utils/classnames';
import { ArrowDown, ArrowRight } from '../Icon/Icon';

import styles from './actionlink.module.scss';

/**
 * @author [Roman Semko](mailto:roman.semko-extern@invia.de)
 */
export default function ActionLink({ arrow, children, className, ...props }) {
  return (
    <a className={cx(styles.actionlink, className)} {...props}>
      {children}
      {arrow === 'down' ? (
        <ArrowDown className={styles.arrow} />
      ) : (
        <ArrowRight className={styles.arrow} />
      )}
    </a>
  );
}

ActionLink.propTypes = {
  /** additional classNames you want to add */
  className: PropTypes.string,
  /** text of the link */
  children: PropTypes.node.isRequired,
  /** whether to show an arrow at the end of the text */
  arrow: PropTypes.oneOf(['down', 'right']),
  href: PropTypes.string.isRequired
};
