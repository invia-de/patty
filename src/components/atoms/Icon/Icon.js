import React from 'react';
import PropTypes from 'prop-types';
import { icon } from './Icon.module.scss';

/**
 * @author [Eric Zieger](mailto:eric.zieger@invia.de)
 */
export function Icon({ viewBox, path }) {
  return (
    <svg viewBox={viewBox} aria-hidden="true" className={icon}>
      {path && path.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}
Icon.propTypes = {
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

export function IconArrowLeft(props) {
  return (
    <Icon
      {...props}
      path={['M425 430L249 255 426 80 346 0 87 259l253 253 85-82z']}
    />
  );
}

export function IconArrowRight(props) {
  return (
    <Icon
      {...props}
      path={['M88 82l176 176L87 432l80 80 259-259L173 0 88 82z']}
    />
  );
}

// at the moment only needed for styleguidist since it only loads [A-Z]*.js
// and not the [A-Z]*/index.js
export default {
  Icon,
  IconArrowRight,
  IconArrowLeft
};
