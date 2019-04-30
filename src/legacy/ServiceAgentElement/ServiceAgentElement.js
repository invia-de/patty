import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Tooltip from '../../components/atoms/Tooltip/Tooltip.js';
import { Hotline, Quotation } from '../../components/atoms/Icon/Icon';

const processSpecialTags = function(str, i) {
  if (typeof str === 'function' || typeof str === 'object') return str;
  if (typeof str !== 'string') return '';

  if (~str.indexOf('#HOTEL_NAME#')) {
    let arr = str.split('#HOTEL_NAME#');
    return <strong key={i}>{arr[0] + this.hotelName + arr[1]}</strong>;
  } else if (~str.indexOf('#PROMOTION_CODE#')) {
    let arr = str.split('#PROMOTION_CODE#');
    return <strong key={i}>{arr[0] + this.promotionCode + arr[1]}</strong>;
  } else if (~str.indexOf('#REGION_NAME#')) {
    let arr = str.split('#REGION_NAME#');
    return <strong key={i}>{arr[0] + this.regionName + arr[1]}</strong>;
  } else if (~str.indexOf('#LINE_BREAK#')) {
    let arr = str.split('#LINE_BREAK#');
    return (
      <React.Fragment key={i}>
        {arr[0]}
        <br />
        {arr[1]}
      </React.Fragment>
    );
  }

  return <React.Fragment key={i}>{str}</React.Fragment>;
};

function ServiceAgentElement(props) {
  const agent = props.agent;
  const styles = props.styles;

  if (agent === undefined || styles === undefined) return null;

  return (
    <div className={styles.agent} data-testid="serviceAgent">
      <div className={styles.row}>
        <div className={styles.colImg}>
          <img
            className={styles.img}
            src={agent.image}
            alt=""
            aria-hidden="true"
          />
        </div>
        <div className={styles.infoCol}>
          <div className={styles.colMid}>
            <Quotation className={styles.quoteBegin} />
            <div className={styles.serviceElementText}>
              {agent.text.map(processSpecialTags.bind(props.serviceContext))}
            </div>
            <Quotation className={styles.quoteEnd} />
          </div>
          <div className={styles.colEnd}>
            <strong className={styles.agentNameMobile}>{agent.name}</strong>

            <Tooltip
              message={processSpecialTags(
                props.serviceContext.tooltipMessage,
                0
              )}
              classNameMessage={styles.tooltip}
            >
              <Hotline viewBox={'0 18 512 512'} />
            </Tooltip>
            <a
              className={styles.hotline}
              href={'tel: ' + agent.telephone[props.serviceContext.deviceType]}
              target="_blank"
              rel="noopener noreferrer"
            >
              {agent.telephone[props.serviceContext.deviceType]}
            </a>
            <div className={styles.availability}>(tgl. 8 - 23 Uhr)</div>
          </div>
          <div className={styles.agentExperienceMobile}>{agent.experience}</div>
        </div>
      </div>
      <div className={styles.colfull}>
        <strong data-testid="agentName" className={styles.agentName}>
          {agent.name}
        </strong>
        <div className={styles.agentExperience}>{agent.experience}</div>
        <div className={styles.agentAdvice}>Ich berate Sie gern.</div>
      </div>
    </div>
  );
}

ServiceAgentElement.propTypes = {
  /** additional classNames you want to add */
  className: PropTypes.string,
  agent: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired
};

export default ServiceAgentElement;

export function renderServiceAgentElement(props, container, callback) {
  ReactDOM.render(<ServiceAgentElement {...props} />, container, callback);
}
