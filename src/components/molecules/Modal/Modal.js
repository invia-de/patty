import React from 'react';
import PropTypes from 'prop-types';
import cx from '../../../utils/classnames';
import Overlay from '../../atoms/Overlay/Overlay';

import styles from './Modal.module.scss';

/**
 * @author [Roman Semko](mailto:roman.semko-extern@invia.de)
 * @since 0.1.0
 */
export default class Modal extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
    this.onEscape = this.onEscape.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.modalRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onEscape, false);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEscape, false);
  }

  render() {
    const {
      children,
      trigger,
      className,
      isStatic,
      overlayClassName
    } = this.props;
    const { open } = this.state;

    return (
      <>
        <div className={styles.trigger} onClick={this.openModal}>
          {trigger}
        </div>
        <Overlay
          open={open}
          onClick={this.closeModal}
          isStatic={isStatic}
          className={cx(styles.overlay, overlayClassName)}
        >
          <div
            className={cx(styles.modal, isStatic && styles.static, className)}
            ref={this.modalRef}
            onClick={e => e.stopPropagation()}
          >
            {children}
          </div>
        </Overlay>
      </>
    );
  }

  onEscape(event) {
    if (event.keyCode === 27) {
      this.closeModal();
    }
  }

  closeModal() {
    const { onClose } = this.props;
    this.setState({ open: false });
    onClose && onClose();
  }

  openModal() {
    const { onClick, onOpen } = this.props;

    this.setState({ open: true }, () => {
      if (this.modalRef) {
        this.modalRef && this.modalRef.focus();
        this.modalRef.parentElement.style.opacity = 1;
      }
      onClick && onClick();
      onOpen && onOpen();
    });
  }
}

Modal.propTypes = {
  /** additional classNames you want to add */
  className: PropTypes.string,
  /** additional overlay classNames you want to add */
  overlayClassName: PropTypes.string,
  /** required due to accessibility */
  children: PropTypes.node.isRequired,
  trigger: PropTypes.element.isRequired,
  /* triggered when the modal is opened */
  onClick: PropTypes.func,
  /* triggered when the modal is opened */
  onOpen: PropTypes.func,
  /* triggered when the modal is closed */
  onClose: PropTypes.func,
  /* prevents modal from unfolding full-screen on smaller devices */
  isStatic: PropTypes.bool
};
