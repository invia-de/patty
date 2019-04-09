import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Modal from '../../components/molecules/Modal/Modal';

import styles from './cleverpricebanner.module.scss';
import cleverPriceBanner from './img/CleverPriceBanner.png';
import cleverPriceBannerMobile from './img/CleverPriceBannerMobile.png';
import cleverPriceHeader from './img/CleverPriceHeader.png';

class CleverPriceBanner extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { onClick } = this.props;

    return (
      <Modal trigger={this.renderTrigger()} onClick={onClick}>
        {this.renderModal()}
      </Modal>
    );
  }

  renderTrigger() {
    const { mobile } = this.props;
    return (
      <img
        src={mobile ? cleverPriceBannerMobile : cleverPriceBanner}
        alt="CleverPrice"
        className={cx(styles.banner, {
          [styles.mobile]: mobile,
          [styles.desktop]: !mobile
        })}
      />
    );
  }

  renderModal() {
    return (
      <div>
        <img src={cleverPriceHeader} alt="Clever Price" />
      </div>
    );
  }
}
CleverPriceBanner.propTypes = {
  /** additional classNames you want to add */
  className: PropTypes.string,
  /** required due to accessibility */
  children: PropTypes.node.isRequired,
  mobile: PropTypes.bool,
  onClick: PropTypes.func
};

export default CleverPriceBanner;

export function renderCleverPriceBanner(props, container, callback) {
  ReactDOM.render(<CleverPriceBanner {...props} />, container, callback);
}
