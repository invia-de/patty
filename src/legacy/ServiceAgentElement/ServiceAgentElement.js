import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Tooltip from '../../components/atoms/Tooltip/Tooltip.js';
import { Phone, Info } from '../../components/atoms/Icon/Icon';
import appData from '../../utils//applicationData';

const processSpecialTags = function(str, i) {
  if (typeof str === 'function' || typeof str === 'object') return str;
  if (typeof str !== 'string') return '';
  debugger;

  if (~str.indexOf('#HOTEL_NAME#')) {
    let arr = str.split('#HOTEL_NAME#');
    return (
      <span key={i}>
        {processSpecialTags.bind(this)(arr[0], i)}
        {this.hotelName}
        {processSpecialTags.bind(this)(arr[1], i)}
      </span>
    );
  } else if (~str.indexOf('#PROMOTION_CODE#')) {
    let arr = str.split('#PROMOTION_CODE#');
    return (
      <span key={i}>
        {processSpecialTags.bind(this)(arr[0], i)}
        <strong>{this.promotionCode}</strong>
        {processSpecialTags.bind(this)(arr[1], i)}
      </span>
    );
  } else if (~str.indexOf('#REGION_NAME#')) {
    let arr = str.split('#REGION_NAME#');
    return (
      <span key={i}>
        {processSpecialTags.bind(this)(arr[0], i)}
        {this.regionName}
        {processSpecialTags.bind(this)(arr[1], i)}
      </span>
    );
  } else if (~str.indexOf('#LINE_BREAK#')) {
    let arr = str.split('#LINE_BREAK#');
    return (
      <span key={i}>
        {processSpecialTags.bind(this)(arr[0], i)}
        <br />
        {processSpecialTags.bind(this)(arr[1], i)}
      </span>
    );
  }

  return <span key={i}>{str}</span>;
};

function ServiceAgentElement(props) {
  const agent = props.agent;
  const styles = props.styles;

  if (agent === undefined || styles === undefined) return null;

  return (
    <div className={styles.agent} data-testid="serviceAgent">
      <div className={styles.imageCol}>
        <img
          className={styles.img}
          src={agent.image}
          alt=""
          aria-hidden="true"
        />
        <div className={styles.agentInfo}>
          <strong data-testid="agentName" className={styles.agentName}>
            {agent.name}
          </strong>
          <br />
          <span>{agent.experience}</span>
        </div>
      </div>
      <div className={styles.textCol}>
        <div className={styles.quoteElement}>
          &#8222;
          {agent.text.map(processSpecialTags.bind(props.serviceContext))}
          &#8220;
        </div>
        <div className={styles.phoneElement}>
          <a
            className={styles.phoneNumber}
            href={'tel: ' + agent.phone}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.serviceContext.deviceType !== 'desktop' && <Phone />}
            {agent.phone}
          </a>
          <div className={styles.phoneInfo}>
            <span>{appData('hotline.default', false, true).availability}</span>
            {props.serviceContext.deviceType === 'desktop' && (
              <span>
                , {processSpecialTags(props.serviceContext.tooltipMessage)}
              </span>
            )}
            {props.serviceContext.deviceType !== 'desktop' && (
              <Tooltip
                message={processSpecialTags(
                  props.serviceContext.tooltipMessage,
                  0
                )}
                position="left"
                className={styles.tooltipWrapper}
                classNameMessage={styles.tooltip}
              >
                <Info />
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

ServiceAgentElement.propTypes = {
  /** additional classNames you want to add */
  className: PropTypes.string,
  agent: PropTypes.object.isRequired,
  serviceContext: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired
};

export default ServiceAgentElement;

export function renderServiceAgentElement(props, container, callback) {
  ReactDOM.render(<ServiceAgentElement {...props} />, container, callback);
}
