import React from 'react';
import PropTypes from 'prop-types';
import styles from './Tooltip.module.scss';

/**
 * @author [Heydon Pickering](https://inclusive-components.design/tooltips-toggletips/)
 * @author [Eric Zieger](mailto:eric.zieger@invia.de)
 */
export default class Tooltip extends React.Component {
  constructor() {
    super();

    this.state = {
      visible: false,
      counter: Math.round(new Date().getTime() * Math.random())
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
    if (
      event.type === 'blur' ||
      (!this.state.click && event.type !== 'blur' && this.state.visible)
    ) {
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
    const { message, children, ...other } = this.props;

    return (
      <div
        {...other}
        onMouseEnter={this.handleShow}
        onMouseLeave={this.handleHide}
      >
        <div
          className={
            this.state.visible
              ? styles['tooltip__message--visible']
              : styles.tooltip__message
          }
          role="tooltip"
          id={`tooltip-${this.state.counter}`}
        >
          {message}
        </div>
        <button
          type="button"
          className={styles.tooltip__button}
          aria-describedby={`tooltip-${this.state.counter}`}
          id={`tooltip-button-${this.state.counter}`}
          onFocus={this.handleShow}
          onBlur={this.handleHide}
          onClick={this.handleClick}
        >
          {children}
        </button>
      </div>
    );
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
