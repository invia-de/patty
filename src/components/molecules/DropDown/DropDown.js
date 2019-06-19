import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import cx from '../../../utils/classnames';

import styles from './dropdown.module.scss';

/**
 * @author [Roman Semko](mailto:roman.semko-extern@invia.de)
 * @since 0.1.0
 */
class DropDown extends React.Component {
  constructor() {
    super();
    this.ref = React.createRef();
    this.state = {
      isOpen: false,
      keep: false
    };
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onClickOutside = this.onClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.onClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickOutside, true);
  }

  render() {
    const {
      className,
      classNameHandler,
      handler,
      children,
      openBackgroundColor,
      align
    } = this.props;
    const { isOpen } = this.state;
    const cls = defaultClassName =>
      cx(defaultClassName, isOpen ? styles.open : '');
    const openStyle =
      isOpen && openBackgroundColor && openBackgroundColor.length > 0
        ? { backgroundColor: openBackgroundColor }
        : {};

    return (
      <div
        className={styles.dropdown}
        onMouseEnter={this.onOpen}
        onMouseLeave={this.onClose}
        ref={ref => {
          this.ref = ref;
        }}
      >
        <div
          className={cls(cx(styles.handler, classNameHandler))}
          onClick={this.onClick}
          style={openStyle}
        >
          {React.cloneElement(handler, { isOpen })}
        </div>
        {isOpen && (
          <div
            className={cls(
              cx(
                styles.content,
                align === 'right' ? styles.right : '',
                className
              )
            )}
            style={openStyle}
          >
            {children}
          </div>
        )}
      </div>
    );
  }

  onOpen() {
    const { openOnHover } = this.props;

    openOnHover && this.setState({ isOpen: true });
  }

  onClose() {
    const { openOnHover, keepOnClick } = this.props;
    const { keep } = this.state;

    openOnHover && (!keepOnClick || !keep) && this.setState({ isOpen: false });
  }

  close() {
    this.setState({ isOpen: false, keep: false });
  }

  onClick() {
    const { keepOnClick } = this.props;
    const { isOpen, keep } = this.state;

    keepOnClick &&
      this.setState({
        keep: !keep,
        isOpen: keep || (keepOnClick && !isOpen) ? !isOpen : isOpen
      });
  }

  onClickOutside(e) {
    if (this.ref && !this.ref.contains(e.target)) {
      this.setState({ isOpen: false, keep: false });
    }
  }
}
DropDown.propTypes = {
  /** additional classNames to be applied to the handler and dropdown content containers when the dropdown is open */
  className: PropTypes.string,
  classNameHandler: PropTypes.string,
  /** required due to accessibility */
  children: PropTypes.node.isRequired,

  /** react element to be used as handler */
  handler: PropTypes.any.isRequired,
  /** whether to open/close the dropdown on mouse hover */
  openOnHover: PropTypes.bool,
  /** control dropdown open/close with clicks on the handler */
  keepOnClick: PropTypes.bool,
  /** dropdown content alignment relative to the handler */
  align: PropTypes.oneOf(['left', 'right']),
  /** background color to be applied to the handler and content containers when the dropdown is open */
  openBackgroundColor: PropTypes.string
};

DropDown.defaultProps = {
  align: 'left',
  openOnHover: true,
  openBackgroundColor: ''
};

export default DropDown;

export function renderDropDown(props, container, callback) {
  ReactDOM.render(<DropDown {...props} />, container, callback);
}
