import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';

import {
  Share,
  Close,
  WhatsApp,
  Facebook,
  Copy,
  Envelope,
  Tick
} from '../../components/atoms/Icon/Icon';
import Spinner from '../../components/atoms/Spinner/Spinner';
import Modal from '../../components/molecules/Modal/Modal';
import cx from '../../utils/classnames';
import localStorageIsAvailable from '../../utils/localstorage';

import styles from './wishlistsharedialog.module.scss';

class WishlistShareDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      isSaving: false,
      shareId: null,
      isCopied: false
    };
    this.modalRef = React.createRef();
    this.saveWishlist = this.saveWishlist.bind(this);
    this.actionCopy = this.actionCopy.bind(this);
    this.actionFacebook = this.actionFacebook.bind(this);
  }

  render() {
    return (
      <div>
        {this.renderTrigger()}
        {this.renderModal()}
      </div>
    );
  }

  renderTrigger() {
    const { children } = this.props;
    const { isSaving } = this.state;

    return (
      <button
        className={cx(styles.trigger, isSaving && styles.saving)}
        onClick={this.saveWishlist}
      >
        <span className={styles.triggerText}>
          {children} <Share />
        </span>
        <Spinner className={styles.spinner} />
      </button>
    );
  }

  renderModal() {
    const { portalName } = this.props;
    const { isCopied } = this.state;

    return (
      <Modal
        trigger={null}
        ref={ref => {
          this.modalRef = ref;
        }}
        isStatic
        className={styles.modal}
        //onOpen={() => this.keepDropdown(true)}
        //overlayClassName={styles.deleteModalOverlay}
        // TODO: add sharing options
      >
        <h1>
          <span>Merkzettel teilen</span>
          <button
            className={styles.mobileCloseButton}
            onClick={() => this.modalRef && this.modalRef.closeModal()}
            aria-label="Abbrechen"
          >
            <Close />
          </button>
        </h1>
        <div className={styles.options}>
          {this.renderOption(
            <WhatsApp />,
            'Mit Whatsapp teilen',
            () => {},
            null,
            {
              href: 'whatsapp://send',
              'data-text': `Hallo, schau mal was ich tolles bei ${portalName} gefunden habe.`,
              'data-href': this.shareableLink()
            }
          )}
          {this.renderOption(
            <Facebook />,
            'Mit Facebook teilen',
            this.actionFacebook
          )}
          {this.renderOption(
            <Copy className={styles.aquaIcon} />,
            isCopied ? 'Link kopiert' : 'Als link kopieren',
            this.actionCopy,
            isCopied ? <Tick /> : null
          )}
          {this.renderOption(
            <Envelope className={styles.aquaIcon} />,
            'Als E-Mail versenden',
            () => {},
            null,
            {
              href: this.actionMail()
            }
          )}
        </div>
      </Modal>
    );
  }

  renderOption(icon, text, onClick = () => {}, secondIcon = null, props) {
    return (
      <a onClick={onClick} alt={text} className={styles.option} {...props}>
        {icon}
        <span>
          {text}
          {secondIcon}
        </span>
      </a>
    );
  }

  shareableLink() {
    const { baseURL } = this.props;
    const { shareId } = this.state;

    return baseURL + shareId;
  }

  actionFacebook() {
    const link = new URL('https://www.facebook.com/sharer/sharer.php');
    link.search = new URLSearchParams({
      u: this.shareableLink()
    });
    window.open(link);
  }

  actionMail() {
    const { portalName } = this.props;
    const encoded_subject = encodeURIComponent(
      `Tolle Angebote auf ${portalName}`
    );
    const encoded_body = encodeURIComponent(
      `Hallo, schau mal was ich tolles bei ${portalName} gefunden habe: \n\n${this.shareableLink()}`
    );

    return 'mailto:?subject=' + encoded_subject + '&body=' + encoded_body;
  }

  actionCopy() {
    copy(this.shareableLink());
    this.setState({ isCopied: true });
    setTimeout(() => this.setState({ isCopied: false }), 2000);
  }

  saveWishlist() {
    const { saveURL, agent, storageName } = this.props;
    const { isSaving } = this.state;

    if (isSaving || !localStorageIsAvailable) return;

    this.setState({ isSaving: true });

    const data = JSON.parse(window.localStorage.getItem(storageName)) || {};
    const wishlist = Object.keys(data).map(key => {
      const item = data[key];
      const tokens = key.split('_');
      return Object.assign(item, {
        hotelId: tokens[0],
        hotelIdType: tokens[1]
      });
    });

    fetch(saveURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ wishlist, agent })
    })
      .then(response => response.json())
      .catch(error => {
        console.error(error);
        return null;
      })
      .then(json => {
        const isSaving = false;
        const shareId = json.success ? json.response.id : null;
        this.setState({ isSaving, shareId }, () => {
          this.modalRef && this.modalRef.openModal();
        });
      });
  }
}
WishlistShareDialog.propTypes = {
  /** name of the storage to use */
  storageName: PropTypes.string,
  /** additional classNames you want to add */
  className: PropTypes.string,
  /** required due to accessibility */
  children: PropTypes.node,
  /** URL to be called to save a wishlist */
  saveURL: PropTypes.string,
  /** Agent to use when saving the shared wishlist */
  agent: PropTypes.string,
  /** The name of the curretn portal */
  portalName: PropTypes.string,
  /** Base wishlist URL where to append the shareID to when sharing */
  baseURL: PropTypes.string
};

WishlistShareDialog.defaultProps = {
  storageName: 'wishlist',
  children: 'Teilen',
  baseURL: 'https://ab-in-den-urlaub.de/merkzettel?id=',
  agent: 'ab-in-den-urlaub.de',
  portalName: 'ab-in-de-urlaub.de'
};

export default WishlistShareDialog;

export function renderWishlistShareDialog(props, container, callback) {
  ReactDOM.render(<WishlistShareDialog {...props} />, container, callback);
}
