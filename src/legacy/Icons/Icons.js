import React from 'react';
import PropTypes from 'prop-types';
import { icons } from './Icons.module.scss';

/**
 * @author [Eric Zieger](mailto:eric.zieger@invia.de)
 * @since 0.1.0
 */
export function Icons({ viewBox, path, ...other }) {
  return (
    <svg viewBox={viewBox} aria-hidden="true" {...other}>
      {path && path.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}
Icons.propTypes = {
  /** additional classname you want to add */
  className: PropTypes.string,
  /**
   * if you want to render a custom SVG icon you can drop in as many paths as
   * needed (attention: will automatically render `<path d="XYZ" />`) and will
   * not work with other SVG tags.
   */
  path: PropTypes.arrayOf(PropTypes.string),
  /** set a custom viewbox if `0 0 512 512` does not fit your icon */
  viewBox: PropTypes.string
};
Icons.defaultProps = {
  viewBox: '0 0 512 512',
  className: icons
};

export function IconHotline(props) {
  return (
    <Icons
      {...props}
      path={[
        'M312 129c4 4 6 10 6 16 0 9-4 16-9 22-6 6-13 9-21 9h-1c-6 0-12-2-16-6-4-5-6-11-6-18s3-14 8-20 12-9 22-10c7 0 12 3 17 7zm-85 129l-7-20 1-1c14-12 27-22 41-31 13-8 24-12 31-12 5 0 8 2 10 5 2 4 3 8 3 13 0 10-1 18-3 25l-20 83-2 10v2l11-7c7-4 11-8 15-12l3-1 8 16v2h-1c-12 13-25 24-39 33-14 8-25 13-31 13-5 0-9-2-12-5s-4-8-4-16l2-26 19-80 2-10c-6 2-14 8-24 17l-3 2zm231 149c-55 67-139 95-218 84-5-16-8-14-19-38a202 202 0 1 0-38-376c0-18 5-26 6-42a237 237 0 0 1 269 372zM92 363l61-5c17 21 37 83 37 83-37 35-86 39-124 0a309 309 0 0 1-44-310c14-37 63-73 104-56 42 16 21 76 2 109l-53 5s-15 17-8 89c7 71 25 85 25 85z'
      ]}
    />
  );
}

export function IconArrowLeft(props) {
  return (
    <Icons
      {...props}
      path={['M425 430L249 255 426 80 346 0 87 259l253 253 85-82z']}
    />
  );
}

export function IconArrowRight(props) {
  return (
    <Icons
      {...props}
      path={['M88 82l176 176L87 432l80 80 259-259L173 0 88 82z']}
    />
  );
}

// at the moment only needed for styleguidist since it only loads [A-Z]*.js
// and not the [A-Z]*/index.js
export default {
  Icons,
  IconArrowRight,
  IconArrowLeft,
  IconHotline
};
