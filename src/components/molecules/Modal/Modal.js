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
    this.modalRef = null;
    this.overlayRef = null;
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onEscape, false);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEscape, false);
  }

  render() {
    const { children, trigger, className } = this.props;
    const { open } = this.state;

    return (
      <>
        <div className={styles.trigger} onClick={this.openModal}>
          {trigger}
        </div>
        <Overlay
          open={open}
          onClick={this.closeModal}
          className={styles.overlay}
        >
          <div
            className={cx(styles.modal, className)}
            ref={ref => {
              this.modalRef = ref;
            }}
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
    this.setState({ open: false });
  }

  openModal() {
    const { onClick } = this.props;

    this.setState({ open: true }, () => {
      if (this.modalRef) {
        this.modalRef && this.modalRef.focus();
        this.modalRef.parentElement.style.opacity = 1;
      }
      onClick && onClick();
    });
  }
}

Modal.propTypes = {
  /** additional classNames you want to add */
  className: PropTypes.string,
  /** required due to accessibility */
  children: PropTypes.node.isRequired,
  trigger: PropTypes.element.isRequired,
  onClick: PropTypes.func
};
