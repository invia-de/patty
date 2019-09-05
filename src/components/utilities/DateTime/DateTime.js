import React from 'react';
import PropTypes from 'prop-types';

import './DateTime.css';

const WEEK_DAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
const MONTHS = [
  'Januar',
  'Februar',
  'März',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Dezember'
];

const withLeadingZero = function(number) {
  return ('0' + number).substr(-2);
};

const formatDate = function(value, format) {
  const dateObject = new Date(value);
  const year = dateObject.getFullYear();
  const month = withLeadingZero(dateObject.getMonth() + 1);
  const date = withLeadingZero(dateObject.getDate());

  format = format.replace('wd', WEEK_DAYS[dateObject.getDay()]);
  format = format.replace('yyyy', year);
  format = format.replace('mm', month);
  format = format.replace('MMMM', MONTHS[dateObject.getMonth()]);
  format = format.replace('dd', date);
  format = format.replace('yy', ('' + year).substr(-2));

  return [format, `${year}-${month}-${date}`];
};

export default function DateTime({ value, format, className, ...props }) {
  const [text, attr] = formatDate(value, format);

  return (
    <time className={className} dateTime={attr} {...props}>
      {text}
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
   * yy: short year
   */
  format: PropTypes.string,
  /** the provided date to render */
  value: PropTypes.string.isRequired
};
DateTime.defaultProps = {
  format: 'wd dd.mm.'
};

export { formatDate, DateTime };
