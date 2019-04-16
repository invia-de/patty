import React from 'react';
import PropTypes from 'prop-types';

import './DateTime.css';

const WEEK_DAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

const withLeadingZero = function(number) {
  return ('' + number).padStart(2, '0');
};

export default function DateTime({ value, format, className }) {
  const dateObject = new Date(value);
  const year = dateObject.getFullYear();
  const month = withLeadingZero(dateObject.getMonth() + 1);
  const date = withLeadingZero(dateObject.getDate());

  format = format.replace('wd', WEEK_DAYS[dateObject.getDay()]);
  format = format.replace('yyyy', year);
  format = format.replace('mm', month);
  format = format.replace('dd', date);

  return (
    <time className={className} dateTime={`${year}-${month}-${date}`}>
      {format}
    </time>
  );
}
DateTime.propTypes = {
  /** add your own styles */
  className: PropTypes.string,
  /**
   * wd: weekday
   * dd: day of the month with leading zero
   * mm: month with leading zero
   * yyyy: full year
   */
  format: PropTypes.string,
  /** the provided date to render */
  value: PropTypes.string.isRequired
};
DateTime.defaultProps = {
  format: 'wd dd.mm.'
};
