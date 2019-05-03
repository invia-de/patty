import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { Heart } from '../../components/atoms/Icon/Icon';

import styles from './wishlist-trigger.module.scss';

class WishlistTrigger extends React.Component {
  constructor() {
    super();
    this.state = {
      enabled: false
    };
    this.loadStorage = this.loadStorage.bind(this);
    this.changed = this.changed.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    const { eventNamespace } = this.props;

    document.addEventListener(`storage`, this.loadStorage);
    document.addEventListener(`${eventNamespace}.changed`, this.changed);
    this.loadStorage();
  }

  componentWillUnmount() {
    const { eventNamespace } = this.props;

    document.removeEventListener(`storage`, this.loadStorage);
    document.addEventListener(`${eventNamespace}.changed`, this.changed);
  }

  render() {
    const { enabled } = this.state;

    return (
      <button
        className={styles.trigger}
        onClick={this.onClick}
        alt={enabled ? 'Von Bookmarks entfernen' : 'Zu Bookmarks hinzufügen'}
      >
        <Heart empty={!enabled} />
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
    if (!window.localStorage) {
      return;
    }

    this.setState({
      enabled: !!(JSON.parse(window.localStorage.getItem(storageName)) || {})[
        itemKey
      ]
    });
  }

  onClick() {
    const { itemKey, itemValue } = this.props;
    const { enabled } = this.state;

    if (enabled) {
      document.dispatchEvent(
        new CustomEvent('wishlist.remove', {
          detail: { key: itemKey }
        })
      );
    } else {
      document.dispatchEvent(
        new CustomEvent('wishlist.add', {
          detail: { key: itemKey, item: itemValue }
        })
      );
    }
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
