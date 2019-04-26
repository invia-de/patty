import React from 'react';
import PropTypes from 'prop-types';
import styles from './Tooltip.module.scss';
import cx from '../../../utils/classnames';

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
    const {
      message,
      children,
      classNameMessage,
      styleMessage,
      position,
      className
    } = this.props;

    return (
      <div
        className={cx(styles.tooltip, className)}
        onMouseEnter={this.handleShow}
        onMouseLeave={this.handleHide}
      >
        <div
          style={styleMessage}
          className={cx(
            this.state.visible
              ? styles['tooltip__message--visible-' + position]
              : styles.tooltip__message,
            classNameMessage
          )}
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
  message: PropTypes.node.isRequired,
  /** optional render position for the tooltip message */
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /** optional classNameMessage for the tooltip message */
  classNameMessage: PropTypes.string,
  /** optional style object for the tooltip message */
  styleMessage: PropTypes.object
};
Tooltip.defaultProps = {
  position: 'top',
  styleMessage: {}
};
