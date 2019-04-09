import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Modal from '../../components/molecules/Modal/Modal';
import styles from './cleverpricebanner.module.scss';
import cleverPriceBanner from './CleverPriceBanner.png';
import cleverPriceBannerMobile from './CleverPriceBannerMobile.png';

class CleverPriceBanner extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return React.createElement(Modal, {
      trigger: this.renderTrigger()
    }, "CleverPriceBanner");
  }

  renderTrigger() {
    const {
      mobile
    } = this.props;
    return React.createElement("img", {
      src: mobile ? cleverPriceBannerMobile : cleverPriceBanner,
      alt: "CleverPrice",
      className: cx(styles.banner, {
        [styles.mobile]: mobile,
        [styles.desktop]: !mobile
      })
    });
  }

}

CleverPriceBanner.propTypes = {
  /** additional classNames you want to add */
  className: PropTypes.string,

  /** required due to accessibility */
  children: PropTypes.node.isRequired,
  mobile: PropTypes.bool
};
export default CleverPriceBanner;
export function renderCleverPriceBanner(props, container, callback) {
  ReactDOM.render(React.createElement(CleverPriceBanner, props), container, callback);
}