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

class CleverPriceBanner extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.modalRef = React.createRef();
    this.closeModal = this.closeModal.bind(this);
  }

  render() {
    const {
      onClick
    } = this.props;
    return React.createElement(Modal, {
      trigger: this.renderTrigger(),
      onClick: onClick,
      ref: ref => {
        this.modalRef = ref;
      }
    }, this.renderModal());
  }

  renderTrigger() {
    const {
      mobile
    } = this.props;
    return React.createElement("img", {
      src: mobile ? cleverPriceBannerMobile : cleverPriceBanner,
      alt: "CleverPrice banner",
      className: cx(styles.banner, {
        [styles.mobile]: mobile,
        [styles.desktop]: !mobile
      })
    });
  }

  renderModal() {
    const {
      className
    } = this.props;
    return React.createElement("div", {
      className: cx(styles.modal, className)
    }, React.createElement("img", {
      src: cleverPriceHeader,
      alt: "CleverPrice header"
    }), React.createElement("div", {
      className: styles.content
    }, React.createElement("div", {
      className: styles.close
    }, React.createElement(CloseButton, {
      onClick: this.closeModal
    })), this.renderHeader(), React.createElement("div", {
      className: styles.main
    }, this.renderList(), this.renderExample()), this.renderFooter()));
  }

  renderHeader() {
    return React.createElement("div", {
      className: styles.header
    }, React.createElement("img", {
      src: cleverPriceIcon,
      alt: "CleverPrice Icon"
    }), React.createElement("h1", null, "Bei ", React.createElement("strong", null, "ab-in-den-urlaub.de"), " k\xF6nnen Sie sich schon jetzt Lastminute-Preise sichern."), React.createElement("h2", null, "Aus diesem Grund erh\xE4ltst du, wenn du auf einer anderen Website ein billigeres Angebot findest, die Differenz von uns zur\xFCck."));
  }

  renderList() {
    return React.createElement("div", {
      className: styles.list
    }, React.createElement("ul", null, React.createElement("li", null, React.createElement("strong", null, "Lastminute-Preise"), " schon jetzt", ' ', React.createElement("strong", null, "ab \u20AC 4,99"), " sichern"), React.createElement("li", null, "bis 14 Tage vor Reisebeginn in Ruhe", ' ', React.createElement("strong", null, "bei allen Reisevermittlern"), " die Preise vergleichen"), React.createElement("li", null, React.createElement("strong", null, "Entsch\xE4digung"), " im Fall eines g\xFCnstigeren Angebots der gleichen Reise"), React.createElement("li", null, "Erstattung von bis zu ", React.createElement("strong", null, "10% des Reisepreises"), ' ')), this.renderLinks(), this.renderDescription());
  }

  renderLinks() {
    return React.createElement("div", {
      className: styles.links
    }, React.createElement("a", {
      href: "https://secure.berlin-direktversicherung.de/rda-web/servlet/DokumentAdapter?dokumentTyp=PIB&uuidGroup=cab5ffa4-2aae-4363-8588-6b700a1963b1/31253",
      rel: "noopener noreferrer",
      target: "_blank"
    }, "Produktinformationen"), React.createElement("a", {
      href: "https://secure.berlin-direktversicherung.de/rda-web/servlet/DokumentAdapter?dokumentTyp=AVB&uuidGroup=5c02ba06-371c-444c-88ca-b951a43e91b2/31253",
      rel: "noopener noreferrer",
      target: "_blank"
    }, "Versicherungsbedingungen"));
  }

  renderDescription() {
    return React.createElement("div", {
      className: styles.description
    }, "Sie wollen sich Ihre Reise schon jetzt sichern und haben Angst, die Chance auf Lastminute Rabatte zu verpassen? G\xF6nnen Sie sich die Ruhe bis zu 14 Tage vor Abreise die Preise bei uns und allen anderen Reisevermittlern zu vergleichen. Mit CleverPrice buchen Sie jetzt und erhalten bis zu 10% Ihres Reisepreises zur\xFCck, wenn Sie Ihre gebuchte Reise bei uns oder woanders g\xFCnstiger finden. So sichern Sie sich jetzt schon die Chance auf Lastminute-Angebote!", React.createElement("br", null), React.createElement("strong", null, "CleverPrice - Top Preise sichern!"));
  }

  renderExample() {
    return React.createElement("div", {
      className: styles.example
    }, React.createElement("div", null, React.createElement("h1", null, React.createElement("div", {
      className: styles.badge
    }, "\xA0"), React.createElement("br", null), React.createElement("strong", null, "CleverPrice"), " Beispiel"), React.createElement("div", {
      className: styles.exampleInner
    }, React.createElement("div", {
      className: styles.prices
    }, React.createElement("span", null, "Gekauft f\xFCr"), React.createElement("span", {
      className: styles.dots
    }, "\xA0"), React.createElement("span", null, "\u20AC 1998,00")), React.createElement("div", {
      className: styles.prices
    }, React.createElement("span", null, "Sp\xE4ter gefunden f\xFCr"), React.createElement("span", {
      className: styles.dots
    }, "\xA0"), React.createElement("span", null, "\u20AC 1799,00")), React.createElement("hr", null), React.createElement("div", {
      className: styles.prices
    }, React.createElement("strong", null, "Sie erhalten"), React.createElement("strong", {
      className: styles.bigPrice
    }, "\u20AC 199 zur\xFCck!")))));
  }

  renderFooter() {
    return React.createElement("div", {
      className: styles.footer
    }, React.createElement("div", null, React.createElement("img", {
      src: berlinDirektLogo,
      alt: "Berlin Direkt"
    })), React.createElement("div", null, "Dies ist ein Angebot der BD24 Berlin Direkt Versicherung AG vermittelt durch die Invia Travel Germany GmbH. S\xE4mtliche Pflichtangaben im Rahmen der Versicherungsvermittlung finden Sie\xA0", React.createElement("a", {
      href: "https://www.ab-in-den-urlaub.de/resources/pdf/Erstinformation.pdf",
      rel: "noopener noreferrer",
      target: "_blank"
    }, "hier"), "."));
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
  ReactDOM.render(React.createElement(CleverPriceBanner, props), container, callback);
}