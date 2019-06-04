import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cx from '../../utils/classnames';
import Modal from '../../components/molecules/Modal/Modal';

import styles from './cleverpricebanner.module.scss';
import cleverPriceBanner from './img/CleverPriceBanner.png';
import cleverPriceBannerMobile from './img/CleverPriceBannerMobile.png';
import cleverPriceHeader from './img/CleverPriceHeader.png';
import cleverPriceIcon from './img/CleverPriceIcon.svg';
import berlinDirektLogo from './img/BerlinDirektLogo.png';
import CloseButton from '../../components/atoms/CloseButton/CloseButton';

/**
 * @author [Roman Semko](mailto:roman.semko-extern@invia.de)
 * @since 0.1.0
 */
class CleverPriceBanner extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.modalRef = React.createRef();
    this.closeModal = this.closeModal.bind(this);
  }

  render() {
    const { onClick } = this.props;

    return (
      <Modal
        trigger={this.renderTrigger()}
        onClick={onClick}
        ref={ref => {
          this.modalRef = ref;
        }}
      >
        {this.renderModal()}
      </Modal>
    );
  }

  renderTrigger() {
    const { mobile } = this.props;
    return (
      <img
        src={mobile ? cleverPriceBannerMobile : cleverPriceBanner}
        alt="CleverPrice banner"
        className={cx(styles.banner, {
          [styles.mobile]: mobile,
          [styles.desktop]: !mobile
        })}
      />
    );
  }

  renderModal() {
    const { className } = this.props;

    return (
      <div className={cx(styles.modal, className)}>
        <img src={cleverPriceHeader} alt="CleverPrice header" />
        <div className={styles.content}>
          <div className={styles.close}>
            <CloseButton onClick={this.closeModal} />
          </div>
          {this.renderHeader()}
          <div className={styles.main}>
            {this.renderList()}
            {this.renderExample()}
          </div>
          {this.renderFooter()}
        </div>
      </div>
    );
  }

  renderHeader() {
    return (
      <div className={styles.header}>
        <img src={cleverPriceIcon} alt="CleverPrice Icon" />
        <h1>
          Bei <strong>ab-in-den-urlaub.de</strong> können Sie sich schon jetzt
          Lastminute-Preise sichern.
        </h1>
        <h2>
          Aus diesem Grund erhältst du, wenn du auf einer anderen Website ein
          billigeres Angebot findest, die Differenz von uns zurück.
        </h2>
      </div>
    );
  }

  renderList() {
    return (
      <div className={styles.list}>
        <ul>
          <li>
            <strong>Lastminute-Preise</strong> schon jetzt{' '}
            <strong>ab € 4,99</strong> sichern
          </li>
          <li>
            bis 14 Tage vor Reisebeginn in Ruhe{' '}
            <strong>bei allen Reisevermittlern</strong> die Preise vergleichen
          </li>
          <li>
            <strong>Entschädigung</strong> im Fall eines günstigeren Angebots
            der gleichen Reise
          </li>
          <li>
            Erstattung von bis zu <strong>10% des Reisepreises</strong>{' '}
          </li>
        </ul>
        {this.renderLinks()}
        {this.renderDescription()}
      </div>
    );
  }

  renderLinks() {
    return (
      <div className={styles.links}>
        <a
          href="https://secure.berlin-direktversicherung.de/rda-web/servlet/DokumentAdapter?dokumentTyp=PIB&uuidGroup=cab5ffa4-2aae-4363-8588-6b700a1963b1/31253"
          rel="noopener noreferrer"
          target="_blank"
        >
          Produktinformationen
        </a>
        <a
          href="https://secure.berlin-direktversicherung.de/rda-web/servlet/DokumentAdapter?dokumentTyp=AVB&uuidGroup=5c02ba06-371c-444c-88ca-b951a43e91b2/31253"
          rel="noopener noreferrer"
          target="_blank"
        >
          Versicherungsbedingungen
        </a>
      </div>
    );
  }

  renderDescription() {
    return (
      <div className={styles.description}>
        Sie wollen sich Ihre Reise schon jetzt sichern und haben Angst, die
        Chance auf Lastminute Rabatte zu verpassen? Gönnen Sie sich die Ruhe bis
        zu 14 Tage vor Abreise die Preise bei uns und allen anderen
        Reisevermittlern zu vergleichen. Mit CleverPrice buchen Sie jetzt und
        erhalten bis zu 10% Ihres Reisepreises zurück, wenn Sie Ihre gebuchte
        Reise bei uns oder woanders günstiger finden. So sichern Sie sich jetzt
        schon die Chance auf Lastminute-Angebote!
        <br />
        <strong>CleverPrice - Top Preise sichern!</strong>
      </div>
    );
  }

  renderExample() {
    return (
      <div className={styles.example}>
        <div>
          <h1>
            <div className={styles.badge}>&nbsp;</div>
            <br />
            <strong>CleverPrice</strong> Beispiel
          </h1>
          <div className={styles.exampleInner}>
            <div className={styles.prices}>
              <span>Gekauft für</span>
              <span className={styles.dots}>&nbsp;</span>
              <span>€ 1998,00</span>
            </div>
            <div className={styles.prices}>
              <span>Später gefunden für</span>
              <span className={styles.dots}>&nbsp;</span>
              <span>€ 1799,00</span>
            </div>
            <hr />
            <div className={styles.prices}>
              <strong>Sie erhalten</strong>
              <strong className={styles.bigPrice}>€ 199 zurück!</strong>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderFooter() {
    return (
      <div className={styles.footer}>
        <div>
          <img src={berlinDirektLogo} alt="Berlin Direkt" />
        </div>
        <div>
          Dies ist ein Angebot der BD24 Berlin Direkt Versicherung AG vermittelt
          durch die Invia Travel Germany GmbH. Sämtliche Pflichtangaben im
          Rahmen der Versicherungsvermittlung finden Sie&nbsp;
          <a
            href="https://www.ab-in-den-urlaub.de/resources/pdf/Erstinformation.pdf"
            rel="noopener noreferrer"
            target="_blank"
          >
            hier
          </a>
          .
        </div>
      </div>
    );
  }

  closeModal() {
    this.modalRef && this.modalRef.closeModal();
  }
}
CleverPriceBanner.propTypes = {
  /** additional classNames you want to add */
  className: PropTypes.string,
  mobile: PropTypes.bool,
  onClick: PropTypes.func
};

export default CleverPriceBanner;

export function renderCleverPriceBanner(props, container, callback) {
  ReactDOM.render(<CleverPriceBanner {...props} />, container, callback);
}
