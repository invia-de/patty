function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import styles from './Tooltip.module.scss';
let globalCounter = 0;
/**
 * @author [Heydon Pickering](https://inclusive-components.design/tooltips-toggletips/)
 * @author [Eric Zieger](mailto:eric.zieger@invia.de)
 */

export default class Tooltip extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      counter: globalCounter++
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleShow() {
    if (!this.state.visible) {
      this.setState({
        visible: true
      });
    }
  }

  handleHide(event) {
    if (event.type === 'blur' || !this.state.click && event.type !== 'blur' && this.state.visible) {
      this.setState({
        visible: false,
        click: false
      });
    }
  }

  handleClick(event) {
    if (this.props.onClick) {
      event.persist();
      this.props.onClick && this.props.onClick(event);
    } else {
      this.setState({
        visible: true,
        click: true
      });
    }
  }

  render() {
    const {
      message,
      children,
      ...other
    } = this.props;
    return React.createElement("div", _extends({}, other, {
      onMouseEnter: this.handleShow,
      onMouseLeave: this.handleHide
    }), React.createElement("div", {
      className: this.state.visible ? styles['tooltip__message--visible'] : styles.tooltip__message,
      role: "tooltip",
      id: `tooltip-${this.state.counter}`
    }, message), React.createElement("button", {
      type: "button",
      className: styles.tooltip__button,
      "aria-describedby": `tooltip-${this.state.counter}`,
      id: `tooltip-button-${this.state.counter}`,
      onFocus: this.handleShow,
      onBlur: this.handleHide,
      onClick: this.handleClick
    }, children));
  }

}
Tooltip.propTypes = {
  /** additional classNames you want to add */
  className: PropTypes.string,

  /** required due to accessibility */
  children: PropTypes.node.isRequired,

  /** the tooltip content */
  message: PropTypes.node.isRequired
};
Tooltip.defaultProps = {
  className: styles.tooltip
};