import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';

import cx from '../../utils/classnames';
import { Heart, Bin } from '../../components/atoms/Icon/Icon';
import Stars from '../../components/atoms/Stars';
import Tooltip from '../../components/atoms/Tooltip/Tooltip';
import ActionLink from '../../components/atoms/ActionLink';
import Loading from '../../components/atoms/Loading/Loading';
import Spinner from '../../components/atoms/Spinner';
import Modal from '../../components/molecules/Modal/Modal';
import Rating from '../Rating';
import WishlistShareDialog from '../WishlistShareDialog/WishlistShareDialog';

import getItems from './stores/local-store';
import getSharedItems from './stores/shared-store';

import empty from '../Wishlist/img/empty.svg';
import wishlistStyles from '../Wishlist/wishlist.module.scss';
import heartStyles from '../WishlistTrigger/wishlist-trigger.module.scss';
import styles from './wishlistlp.module.scss';

class WishlistLP extends React.Component {
  constructor() {
    super();
    this.state = {
      hasMore: true,
      items: [],
      total: 0,
      updatedItems: {},
      deletingItems: {},
      sorting: '-age',
      isEmpty: false
    };
    this.scrollRef = React.createRef();
    this.modalRef = React.createRef();
    this.loadItems = this.loadItems.bind(this);
    this.changeSorting = this.changeSorting.bind(this);
    this.removeAll = this.removeAll.bind(this);
  }

  render() {
    return (
      <div className={cx(wishlistStyles.wishlist, styles.wishlistlp)}>
        {this.renderHeader()}
        {this.renderSubheader()}
        {this.renderItems()}
        {this.renderModal()}
      </div>
    );
  }

  renderHeader() {
    const { items, total, sharedId } = this.props;
    const count = total || (items && items.length) || 0;

    return (
      <div className={cx(styles.headers, styles.header)}>
        <h1>
          {sharedId ? 'Geteilter ' : ''}Merkzettel
          <span className={styles.headerCounter}>
            : {count} Hotel{count === 1 ? '' : 's'}
          </span>
        </h1>
        {this.renderOptions()}
      </div>
    );
  }

  renderOptions() {
    const {
      sharedId,
      saveURL,
      agent,
      portalName,
      baseURL,
      disableSharing
    } = this.props;

    if (sharedId) {
      return null;
    }

    return (
      <div className={cx(wishlistStyles.buttons, styles.buttons)}>
        {!disableSharing && (
          <WishlistShareDialog {...{ saveURL, agent, portalName, baseURL }} />
        )}
        <button
          onClick={() =>
            this.setState(
              { openDelete: true },
              () => this.modalRef && this.modalRef.openModal()
            )
          }
          aria-label="Merkzettel löschen"
        >
          Alle löschen <Bin />
        </button>
      </div>
    );
  }

  renderSubheader() {
    const { sorting, items, total, isEmpty } = this.state;
    const count = total || items.length;

    if (isEmpty) {
      return null;
    }

    return (
      <div className={cx(styles.headers, styles.subheader)}>
        <h2>
          {count} Hotel{count === 1 ? '' : 's'}
        </h2>
        <div>
          <span>Sortieren nach:</span>
          <select value={sorting} onChange={this.changeSorting}>
            <option value="-age">Zuletzt gemerkt</option>
            <option value="+age">Zuerst gemerkt</option>
            <option value="+price">Preis aufsteigend</option>
            <option value="-price">Preis absteigend</option>
          </select>
        </div>
      </div>
    );
  }

  renderItems() {
    const { hasMore, items, isEmpty } = this.state;

    if (isEmpty) {
      return this.renderEmptyList();
    }

    const renderedItems = items.map(item => this.renderItem(item));

    return (
      <InfiniteScroll
        ref={ref => {
          this.scrollRef = ref;
        }}
        pageStart={-1}
        loadMore={this.loadItems}
        hasMore={hasMore}
        loader={<Loading size="large" key={0} />}
      >
        {renderedItems}
      </InfiniteScroll>
    );
  }

  renderEmptyList() {
    const { sharedId } = this.props;

    if (sharedId) {
      return (
        <div className={cx(wishlistStyles.empty, styles.empty)} role="alert">
          <img src={empty} alt="leeres Merkzettel" />
          <div className={wishlistStyles.emptyHeader}>
            <p>Es ist ein Fehler aufgetreten.</p>
            <p>Leider sind keine Angebote auf diesem Merkzettel gespeichert.</p>
            <a className={styles.backLink} href="/">
              Zurück zur Startseite
            </a>
          </div>
        </div>
      );
    }

    return (
      <div className={cx(wishlistStyles.empty, styles.empty)} role="alert">
        <img src={empty} alt="leeres Merkzettel" />
        <div className={wishlistStyles.emptyHeader}>
          Sie haben noch keine Angebote auf Ihrer Merkliste gespeichert.
        </div>
        <div className={wishlistStyles.emptyHeart}>
          <Heart empty />
        </div>
        <div className={wishlistStyles.emptyText}>
          Klicken Sie bei dem gewünschten Hotel einfach auf das Herz, um es
          Ihrer Merkliste hinzuzufügen.
        </div>
      </div>
    );
  }

  renderItem(item) {
    const { deletingItems } = this.state;
    const deleting = !!deletingItems[item.key];

    return (
      <div
        key={item.key}
        className={cx(styles.item, deleting && styles.itemDeleting)}
      >
        <div
          className={styles.itemImg}
          style={{ backgroundImage: `url(${item.image})` }}
          role="img"
        >
          &nbsp;
        </div>
        <div className={styles.itemContent}>
          <div className={styles.itemMainContent}>
            <div>
              <h2>
                {item.name}
                <div className={styles.mobileDelete}>
                  {this.renderDelete(item)}
                </div>
              </h2>
              <div className={styles.stars}>
                <Stars value={item.stars} />
                <div className={styles.mobileDate}>{this.renderDate(item)}</div>
              </div>
              <div className={wishlistStyles.location}>{item.location}</div>
            </div>
            {item.rating ? (
              <Rating {...item.rating} className={styles.rating} />
            ) : null}
          </div>
          <div className={styles.itemSecondaryContent}>
            <div className={cx(wishlistStyles.itemOptions, styles.itemOptions)}>
              {this.renderDate(item)}
              {this.renderDelete(item)}
            </div>
            <span>{item.details || ''}</span>
            <span className={styles.pricing}>
              {item.price ? this.renderPricing(item) : null}
            </span>
            <ActionLink
              className={styles.action}
              arrow="right"
              href={item.link}
              target="_blank"
            >
              Zum Hotel
            </ActionLink>
            <ActionLink
              className={styles.actionMobile}
              href={item.link}
              target="_blank"
              arrow={item.price ? null : 'right'}
            >
              {item.price ? this.renderPricing(item) : 'Zum Hotel'}
            </ActionLink>
          </div>
        </div>
      </div>
    );
  }

  renderPricing(item) {
    return item.updating ? (
      <Spinner />
    ) : (
      <span>
        ab <span className={styles.price}>{item.price}</span>
        p.P.
      </span>
    );
  }

  renderDate(item) {
    const { sharedId } = this.props;
    const date = new Date(item.date);
    const month = date.getMonth();

    if (sharedId) {
      return null;
    }

    return (
      <span className={styles.date}>
        Gemerkt am: {date.getDate()}.{`${month < 9 ? '0' : ''}${month}.`}
      </span>
    );
  }

  renderDelete(item) {
    const { sharedId } = this.props;
    const { deletingItems } = this.state;

    if (sharedId) {
      return null;
    }

    return (
      <Tooltip
        message={`${item.name} vom merkzettel löschen`}
        classNameMessage={styles.tooltip}
        className={cx(heartStyles.trigger, styles.deleteButton)}
        onClick={e => this.remove(item.key) || e.stopPropagation()}
        position="top"
      >
        <Heart empty={!!deletingItems[item.key]} />
      </Tooltip>
    );
  }

  renderModal() {
    return (
      <Modal
        trigger={null}
        ref={ref => {
          this.modalRef = ref;
        }}
      >
        <div className={wishlistStyles.deleteModal} role="alertdialog">
          <h2>Merkzettel löschen</h2>
          <p>Wirklich alle Merkzettel-Einträge löschen?</p>
          <div
            className={cx(wishlistStyles.buttons, wishlistStyles.modalButtons)}
          >
            <button
              onClick={() => this.modalRef && this.modalRef.closeModal()}
              aria-label="Abbrechen"
            >
              Abbrechen
            </button>
            <button
              onClick={this.removeAll}
              className={wishlistStyles.primaryButton}
              aria-label="Löschen"
            >
              Ja, löschen.
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  getItems(page) {
    const { storageName, sharedId, pageSize, loadURL, agent } = this.props;
    const { sorting } = this.state;

    return sharedId
      ? getSharedItems(loadURL, agent, sharedId, page, sorting, pageSize)
      : getItems(page, sorting, storageName, pageSize);
  }

  loadItems(page) {
    const { updatePrice } = this.props;
    const { items, updatedItems } = this.state;

    this.getItems(page).then(({ items: newItems, hasMore, total }) => {
      const combinedItems = [...items, ...newItems].map(item => {
        if (updatedItems[item.key]) {
          return Object.assign({}, item, {
            price: updatedItems[item.key]
          });
        }

        updatePrice(item).then(price => {
          const { items, updatedItems } = this.state;
          const newUpdatedItems = Object.assign({}, updatedItems, {
            [item.key]: price
          });
          const newItems = items.map(item =>
            newUpdatedItems[item.key]
              ? Object.assign({}, item, {
                  price: newUpdatedItems[item.key],
                  updating: false
                })
              : item
          );
          this.setState({
            items: newItems,
            updatedItems: newUpdatedItems
          });
        });

        return Object.assign({}, item, { updating: true });
      });

      this.setState({
        items: combinedItems,
        isEmpty: combinedItems.length === 0,
        hasMore,
        total
      });
    });
  }

  remove(itemKey) {
    const { deletingItems } = this.state;

    const copy = Object.assign({}, deletingItems);

    if (deletingItems[itemKey]) {
      delete copy[itemKey];
      this.setState({ deletingItems: copy });
      return;
    }

    copy[itemKey] = true;
    this.setState({ deletingItems: copy });
    setTimeout(() => {
      const { items, deletingItems, total } = this.state;
      if (!deletingItems[itemKey]) {
        return;
      }
      document.dispatchEvent(
        new CustomEvent('wishlist.remove', {
          detail: { key: itemKey }
        })
      );
      const newDeletingItems = Object.assign({}, deletingItems);
      delete newDeletingItems[itemKey];
      this.setState({
        items: items.filter(item => item.key !== itemKey),
        deletingItems: newDeletingItems,
        total: Math.max(total - 1, 0)
      });
    }, 1000);
  }

  removeAll() {
    const { items } = this.state;
    const { storageName, eventNamespace } = this.props;

    if (!window.localStorage) {
      return;
    }

    window.localStorage.setItem(storageName, JSON.stringify({}));
    items.forEach(({ key }) =>
      document.dispatchEvent(
        new CustomEvent(`${eventNamespace}.changed`, {
          detail: { key }
        })
      )
    );

    if (this.scrollRef) {
      this.scrollRef.pageLoaded = -1;
    }
    this.setState({
      items: [],
      hasMore: false,
      isEmpty: true
    });

    this.modalRef && this.modalRef.closeModal();
  }

  changeSorting(event) {
    const { sorting } = this.state;
    const {
      target: { value }
    } = event;

    if (sorting !== value) {
      if (this.scrollRef) {
        this.scrollRef.pageLoaded = -1;
      }
      this.setState({
        sorting: value,
        items: [],
        hasMore: true
      });
    }
  }
}

WishlistLP.propTypes = {
  /** additional classNames you want to add */
  className: PropTypes.string,
  /** name of the storage to use */
  storageName: PropTypes.string,
  /** name of the event namespace to use */
  eventNamespace: PropTypes.string,
  /** how many items to load at once */
  pageSize: PropTypes.number,
  /** a price updating function that should return a promise which resolves in a new price string */
  updatePrice: PropTypes.func,
  /** ID of the shared wishlist */
  sharedId: PropTypes.string,
  /** URL to be called to save a wishlist */
  saveURL: PropTypes.string,
  /** URL to be called to load a wishlist */
  loadURL: PropTypes.string,
  /** Agent to use when saving the shared wishlist */
  agent: PropTypes.string,
  /** The name of the current portal */
  portalName: PropTypes.string,
  /** Base wishlist URL where to append the shareID to when sharing */
  baseURL: PropTypes.string,
  /** Disable sharing options */
  disableSharing: PropTypes.bool
};

WishlistLP.defaultProps = {
  storageName: 'wishlist',
  eventNamespace: 'wishlist',
  pageSize: 5,
  updatePrice: item => new Promise(resolve => resolve(item.price)),
  disableSharing: false
};

export default WishlistLP;

export function renderWishlistLP(props, container, callback) {
  ReactDOM.render(<WishlistLP {...props} />, container, callback);
}
