import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Tooltip from '../../components/atoms/Tooltip/Tooltip.js';
import { Hotline, Quotation } from '../../components/atoms/Icon/Icon';
import ScreenReaderText from '../../components/utilities/ScreenReaderText/ScreenReaderText';

function ServiceAgentElement(props) {
  const agent = props.agent;
  const styles = props.styles;
  if (agent === undefined || styles === undefined) return null;
  return React.createElement("div", {
    className: styles.agent,
    "data-testid": "serviceAgent"
  }, React.createElement("div", {
    className: styles.row
  }, React.createElement("img", {
    className: styles.img,
    src: agent.image,
    alt: "",
    "aria-hidden": "true"
  }), React.createElement("div", {
    className: styles.infoCol
  }, React.createElement("div", {
    className: styles.colMid
  }, React.createElement(Quotation, {
    className: styles.quoteBegin
  }), React.createElement("div", {
    className: styles.serviceElementText
  }, agent.text.map((str, i) => {
    if (str.includes('#HOTEL_NAME#')) {
      let arr = str.split('#HOTEL_NAME#');
      return React.createElement("strong", {
        key: i
      }, arr[0] + props.serviceContext.hotelName + arr[1]);
    } else if (str.includes('#PROMOTION_CODE#')) {
      let arr = str.split('#PROMOTION_CODE#');
      return React.createElement("strong", {
        key: i
      }, arr[0] + props.serviceContext.promotionCode + arr[1]);
    } else if (str.includes('#REGION_NAME#')) {
      let arr = str.split('#REGION_NAME#');
      return React.createElement("strong", {
        key: i
      }, arr[0] + props.serviceContext.regionName + arr[1]);
    } else if (str.includes('#LINE_BREAK#')) {
      let arr = str.split('#LINE_BREAK#');
      return React.createElement(React.Fragment, {
        key: i
      }, arr[0], React.createElement("br", null), arr[1]);
    }

    return React.createElement(React.Fragment, {
      key: i
    }, str);
  })), React.createElement(Quotation, {
    className: styles.quoteEnd
  })), React.createElement("div", {
    className: styles.colEnd
  }, React.createElement("strong", {
    className: styles.agentNameMobile
  }, agent.name), React.createElement(Tooltip, {
    message: props.serviceContext.tooltipMessage,
    classNameMessage: styles.tooltip
  }, React.createElement(Hotline, {
    viewBox: '0 18 512 512'
  }), React.createElement(ScreenReaderText, null, props.serviceContext.tooltipMessage)), React.createElement("a", {
    className: styles.hotline,
    href: 'tel: ' + agent.telephone[props.serviceContext.deviceType],
    target: "_blank",
    rel: "noopener noreferrer"
  }, agent.telephone[props.serviceContext.deviceType]), React.createElement("div", {
    className: styles.availability
  }, "(tgl. 8 - 23 Uhr)")), React.createElement("div", {
    className: styles.agentExperienceMobile
  }, agent.experience))), React.createElement("div", {
    className: styles.colfull
  }, React.createElement("strong", {
    "data-testid": "agentName",
    className: styles.agentName
  }, agent.name), React.createElement("div", {
    className: styles.agentExperience
  }, agent.experience), React.createElement("div", {
    className: styles.agentAdvice
  }, "Ich berate Sie gern.")));
}

ServiceAgentElement.propTypes = {
  /** additional classNames you want to add */
  className: PropTypes.string,
  agent: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired
  /** required due to accessibility */

  /** KG: Is it required if this is the last child element? */

  /**children: PropTypes.node.isRequired */

};
export default ServiceAgentElement;
export function renderServiceAgentElement(props, container, callback) {
  ReactDOM.render(React.createElement(ServiceAgentElement, props), container, callback);
}