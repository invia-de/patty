import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { Heart, Star, Bin, Close } from '../../components/atoms/Icon/Icon';
import DropDown from '../../components/molecules/DropDown/DropDown';
import Modal from '../../components/molecules/Modal/Modal';
import cx from '../../utils/classnames';

import styles from './wishlist.module.scss';
import heartStyles from '../WishlistTrigger/wishlist-trigger.module.scss';
import empty from './img/empty.png';

const Handler = ({ isOpen, count }) => (
  <div className={cx(styles.handlerButton, isOpen && styles.openHandler)}>
    <div className={styles.heartCounter}>
      <div className={styles.heart}>
        <Heart />
      </div>
      <div className={styles.count}>{count}</div>
    </div>
    <span>Merkzettel</span>
  </div>
);

/**
 * @author [Roman Semko](mailto:roman.semko-extern@invia.de)
 */
class Wishlist extends React.Component {
  constructor() {
    super();
    this.state = {
      showBin: false
    };
    this.modalRef = React.createRef();
    this.dropdownRef = React.createRef();
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.removeAll = this.removeAll.bind(this);
    this.loadStorage = this.loadStorage.bind(this);
  }

  componentWillMount() {
    const { eventNamespace } = this.props;

    document.addEventListener(`storage`, this.loadStorage);
    document.addEventListener(`${eventNamespace}.add`, this.add);
    document.addEventListener(`${eventNamespace}.remove`, this.remove);
    this.loadStorage();
  }

  componentWillUnmount() {
    const { eventNamespace } = this.props;

    document.removeEventListener(`storage`, this.loadStorage);
    document.removeEventListener(`${eventNamespace}.add`, this.add);
    document.removeEventListener(`${eventNamespace}.remove`, this.remove);
  }

  render() {
    if (!this.state.data) {
      return null;
    }

    return (
      <>
        <DropDown
          align="right"
          keepOnClick
          handler={this.renderHandler()}
          className={cx(styles.dropdownContent)}
          classNameHandler={styles.dropdownHandler}
          ref={ref => {
            this.dropdownRef = ref;
          }}
        >
          {this.renderDropdown()}
        </DropDown>
        <Modal
          trigger={null}
          ref={ref => {
            this.modalRef = ref;
          }}
          isStatic
          onOpen={() =>
            this.setState({ showBin: true }, () => this.keepDropdown(true))
          }
          onClose={() => this.setState({ showBin: false })}
          overlayClassName={styles.deleteModalOverlay}
        >
          <div className={styles.deleteModal} role="alertdialog">
            <h2>Merkzettel löschen</h2>
            <p>
              Sind Sie sich sicher, dass Sie alle Merkzettel-Einträge löschen
              möchten?
            </p>
            <div className={styles.buttons}>
              <button
                onClick={() => this.modalRef && this.modalRef.closeModal()}
                aria-label="Abbrechen"
              >
                Abbrechen
              </button>
              <button
                onClick={this.removeAll}
                className={styles.primaryButton}
                aria-label="Löschen"
              >
                Ja, löschen.
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  }

  renderHandler() {
    const { data } = this.state;
    return <Handler count={data ? Object.keys(data).length : 0} />;
  }

  renderDropdown() {
    const { showBin } = this.state;

    return (
      <div className={styles.wishlist}>
        <h1>
          <span>Merkzettel</span>
          <button
            className={styles.mobileCloseButton}
            onClick={() => this.dropdownRef && this.dropdownRef.close()}
            aria-label="Merkzettel schließen"
          >
            <Close />
          </button>
        </h1>
        {this.renderList()}
        {showBin && (
          <div className={styles.deleteOverlay}>
            <Bin open />
          </div>
        )}
      </div>
    );
  }

  renderList() {
    const { data } = this.state;
    const { link } = this.props;
    const keysSorted = Object.keys(data).sort(function(a, b) {
      return data[b].date - data[a].date;
    });

    if (keysSorted.length === 0) {
      return this.renderEmptyList();
    }

    return (
      <div className={styles.listWrapper}>
        <div className={styles.dropdownList} role="list">
          {keysSorted.map(key => this.renderListItem(key, data[key]))}
        </div>
        <div className={cx(styles.buttons, styles.listButtons)}>
          {link && (
            <button
              onClick={() => (window.location = link)}
              aria-label="Zum Merkzettel"
              className={styles.primaryButton}
            >
              Zum Merkzettel
            </button>
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
      </div>
    );
  }

  renderEmptyList() {
    return (
      <div className={styles.empty} role="alert">
        <img src={empty} alt="leere merkliste" />
        <div className={styles.emptyHeader}>
          Sie haben noch keine Angebote auf Ihrer Merkliste gespeichert.
        </div>
        <div className={styles.emptyHeart}>
          <Heart empty />
        </div>
        <div className={styles.emptyText}>
          Klicken Sie bei dem gewünschten Hotel einfach auf das Herz, um es
          Ihrer Merkliste hinzuzufügen.
        </div>
      </div>
    );
  }

  renderListItem(key, item) {
    return (
      <div
        key={key}
        className={styles.item}
        onClick={() => (window.location.href = item.link)}
        role="listitem"
      >
        <div
          className={styles.itemImg}
          style={{ backgroundImage: `url(${item.image})` }}
          role="img"
        >
          &nbsp;
        </div>
        <div className={styles.itemContent}>
          <h2>{item.name}</h2>
          <span className={styles.stars}>{this.renderStars(item)}</span>
          <div className={styles.location}>{item.location}</div>
        </div>
        <div className={styles.itemOptions}>
          <button
            className={heartStyles.trigger}
            onClick={e =>
              this.remove({ detail: { key } }) || e.stopPropagation()
            }
            alt="Vom Merkzettel entfernen"
          >
            <Heart />
          </button>
        </div>
      </div>
    );
  }

  renderStars(item) {
    const stars = Array.from({ length: Math.floor(item.stars) }).map((x, i) => (
      <Star key={i} />
    ));
    if (item.stars % 1 > 0) {
      stars.push(<Star half key={0.5} />);
    }
    return stars;
  }

  add(event) {
    const {
      detail: { key, item }
    } = event;
    const { storageName, eventNamespace } = this.props;
    const { data } = this.state;

    if (!window.localStorage) {
      return;
    }

    const callback = () => {
      const { data } = this.state;

      const newData = Object.assign({}, data);
      newData[key] = Object.assign({}, item, { date: Date.now() });

      window.localStorage.setItem(storageName, JSON.stringify(newData));
      this.setState({ data: newData }, () =>
        document.dispatchEvent(
          new CustomEvent(`${eventNamespace}.changed`, {
            detail: { key }
          })
        )
      );
    };

    if (!data) {
      this.loadStorage(callback);
    } else {
      callback();
    }
  }

  remove(event) {
    const {
      detail: { key }
    } = event;
    const { storageName, eventNamespace } = this.props;
    const { data } = this.state;

    if (!window.localStorage) {
      return;
    }

    const callback = () => {
      const { data } = this.state;

      const newData = Object.assign({}, data);
      delete newData[key];

      window.localStorage.setItem(storageName, JSON.stringify(newData));
      this.setState({ data: newData }, () =>
        document.dispatchEvent(
          new CustomEvent(`${eventNamespace}.changed`, {
            detail: { key }
          })
        )
      );
    };

    if (!data) {
      this.loadStorage(callback);
    } else {
      callback();
    }
  }

  removeAll() {
    const { data } = this.state;
    const { storageName, eventNamespace } = this.props;

    if (!window.localStorage) {
      return;
    }

    window.localStorage.setItem(storageName, JSON.stringify({}));
    Object.keys(data || {}).forEach(key =>
      document.dispatchEvent(
        new CustomEvent(`${eventNamespace}.changed`, {
          detail: { key }
        })
      )
    );

    this.setState({ data: {} });

    this.modalRef && this.modalRef.closeModal();
  }

  loadStorage(callback = () => {}) {
    const { storageName } = this.props;
    if (!window.localStorage) {
      return;
    }

    this.setState({
      data: JSON.parse(window.localStorage.getItem(storageName)) || {},
      callback
    });
  }

  keepDropdown(keep) {
    if (this.dropdownRef && this.dropdownRef.state) {
      this.dropdownRef.state.keep = keep;
    }
  }
}
Wishlist.propTypes = {
  /** name of the storage to use */
  storageName: PropTypes.string,
  /** name of the event space to use */
  eventNamespace: PropTypes.string,
  /** required due to accessibility */
  children: PropTypes.node.isRequired,
  /** link to the wishlist LP */
  link: PropTypes.string
};

Wishlist.defaultProps = {
  storageName: 'wishlist',
  eventNamespace: 'wishlist'
};

export default Wishlist;

export function renderWishlist(props, container, callback) {
  ReactDOM.render(<Wishlist {...props} />, container, callback);
}
