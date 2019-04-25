import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Tooltip from '../../components/atoms/Tooltip/Tooltip.js';
import { Hotline, Quotation } from '../../components/atoms/Icon/Icon';
import ScreenReaderText from '../../components/utilities/ScreenReaderText/ScreenReaderText';
import reactStringReplace from 'react-string-replace';

const textReplacement = function (txt, placeholder, replacement) {
  return reactStringReplace(txt, placeholder, () => React.createElement(React.Fragment, {
    key: txt
  }, replacement));
};

const ProcessText = props => {
  const replacementMappings = [['#LINE_BREAK#', React.createElement("br", null)], ['#HOTEL_NAME#', React.createElement("strong", null, props.serviceContext.hotelName)], ['#PROMOTION_CODE#', React.createElement("strong", null, props.serviceContext.promotionCode)], ['#REGION_NAME#', props.serviceContext.regionName]];
  let txt = props.txt;

  for (const [placeholder, replacement] of replacementMappings) {
    txt = textReplacement(txt, placeholder, replacement);
  }

  return React.createElement("span", null, txt);
};

function ServiceAgentElement(props) {
  const agent = props.agent;
  const styles = props.styles;
  const bDisplayAdviceText = props.step !== 'offers' ? true : false;
  if (agent === undefined || styles === undefined) return null;
  return React.createElement("div", {
    "data-testid": "serviceAgent"
  }, React.createElement("div", {
    className: styles.row
  }, React.createElement("div", {
    className: styles.colImg
  }, React.createElement("img", {
    className: styles.img,
    src: agent.image,
    alt: "",
    "aria-hidden": "true"
  })), React.createElement("div", {
    className: styles.infoCol
  }, React.createElement("div", {
    className: styles.colMid
  }, React.createElement(Quotation, {
    className: styles.quoteBegin
  }), React.createElement("blockquote", {
    className: styles.serviceElementText
  }, agent.text.map((t, i) => {
    return React.createElement(ProcessText, {
      txt: t,
      index: i,
      agentId: agent.id,
      serviceContext: props.serviceContext,
      key: i
    });
  }, props), bDisplayAdviceText && React.createElement("span", {
    className: styles.agentAdviceTextMobile
  }, "Ich berate Sie gern.")), React.createElement(Quotation, {
    className: styles.quoteEnd
  })), React.createElement("div", {
    className: styles.colEnd
  }, React.createElement("strong", {
    className: styles.agentNameMobile
  }, agent.name), React.createElement(Tooltip, {
    message: props.serviceContext.tooltipMessage
  }, React.createElement(Hotline, {
    viewBox: '0 18 512 512'
  }), React.createElement(ScreenReaderText, null, props.serviceContext.tooltipMessage)), React.createElement("a", {
    className: styles.hotline,
    href: 'tel: ' + agent.telephone[props.serviceContext.deviceType],
    target: "_blank",
    rel: "noopener noreferrer"
  }, agent.telephone[props.serviceContext.deviceType]), React.createElement("small", {
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
    className: styles.agentAdviceText
  }, bDisplayAdviceText && 'Ich berate Sie gern.')));
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