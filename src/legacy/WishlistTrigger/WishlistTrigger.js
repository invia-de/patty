import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { Heart } from '../../components/atoms/Icon/Icon';
import localStorageIsAvailable from '../../utils/localstorage';

import styles from './wishlist-trigger.module.scss';
import cx from '../../utils/classnames';

/**
 * @author [Roman Semko](mailto:roman.semko-extern@invia.de)
 *
 * TODO: might be a good idea to write to the database directly without events?
 * Downside: central responsible unit for writing _can_ have concurrency control,
 * several elements writing at once could be problematic...?
 */
class WishlistTrigger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enabled: false,
      pulsate: false
    };
    this.loadStorage = this.loadStorage.bind(this);
    this.changed = this.changed.bind(this);
    this.onClick = this.onClick.bind(this);

    const { eventNamespace } = this.props;

    document.addEventListener(`storage`, this.loadStorage);
    document.addEventListener(`${eventNamespace}.changed`, this.changed);
    setImmediate(this.loadStorage);
  }

  componentWillUnmount() {
    const { eventNamespace } = this.props;

    document.removeEventListener(`storage`, this.loadStorage);
    document.removeEventListener(`${eventNamespace}.changed`, this.changed);
  }

  render() {
    const { enabled, pulsate } = this.state;

    return (
      <button
        className={styles.trigger}
        onClick={this.onClick}
        aria-label={
          enabled ? 'Von Bookmarks entfernen' : 'Zu Bookmarks hinzufügen'
        }
        title={enabled ? 'gemerkt' : 'merken'}
      >
        <Heart empty={!enabled} className={pulsate && styles.pulsate} />
      </button>
    );
  }

  changed(event) {
    const {
      detail: { key }
    } = event;
    const { itemKey } = this.props;
    if (itemKey === key) {
      this.loadStorage();
    }
  }

  loadStorage() {
    const { storageName, itemKey } = this.props;
    if (!localStorageIsAvailable) {
      return;
    }

    this.setState({
      enabled: !!(JSON.parse(window.localStorage.getItem(storageName)) || {})[
        itemKey
      ]
    });
  }

  onClick() {
    const { itemKey, itemValue, eventNamespace } = this.props;
    const { enabled } = this.state;

    if (enabled) {
      document.dispatchEvent(
        new CustomEvent(`${eventNamespace}.remove`, {
          detail: { key: itemKey }
        })
      );
    } else {
      document.dispatchEvent(
        new CustomEvent(`${eventNamespace}.add`, {
          detail: { key: itemKey, item: itemValue }
        })
      );
    }
    this.setState({ pulsate: true });
    setTimeout(
      () =>
        this.setState({
          pulsate: false
        }),
      200
    );
  }
}
WishlistTrigger.propTypes = {
  /** name of the storage to use */
  storageName: PropTypes.string,
  /** name of the event space to use */
  eventNamespace: PropTypes.string,
  /** key of the item that is used for identification */
  itemKey: PropTypes.string.isRequired,
  /** value of the item to be passed to the wishlist */
  itemValue: PropTypes.any.isRequired,
  /** required due to accessibility */
  children: PropTypes.node.isRequired
};

WishlistTrigger.defaultProps = {
  storageName: 'wishlist',
  eventNamespace: 'wishlist'
};

export default WishlistTrigger;

export function renderWishlistTrigger(props, container, callback) {
  ReactDOM.render(<WishlistTrigger {...props} />, container, callback);
}
