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

  return (
    <div className={styles.agent} data-testid="serviceAgent">
      <div className={styles.row}>
        <img
          className={styles.img}
          src={agent.image}
          alt=""
          aria-hidden="true"
        />
        <div className={styles.infoCol}>
          <div className={styles.colMid}>
            <Quotation className={styles.quoteBegin} />
            <div className={styles.serviceElementText}>
              {agent.text.map((str, i) => {
                if (str.includes('#HOTEL_NAME#')) {
                  let arr = str.split('#HOTEL_NAME#');
                  return (
                    <strong key={i}>
                      {arr[0] + props.serviceContext.hotelName + arr[1]}
                    </strong>
                  );
                } else if (str.includes('#PROMOTION_CODE#')) {
                  let arr = str.split('#PROMOTION_CODE#');
                  return (
                    <strong key={i}>
                      {arr[0] + props.serviceContext.promotionCode + arr[1]}
                    </strong>
                  );
                } else if (str.includes('#REGION_NAME#')) {
                  let arr = str.split('#REGION_NAME#');
                  return (
                    <strong key={i}>
                      {arr[0] + props.serviceContext.regionName + arr[1]}
                    </strong>
                  );
                } else if (str.includes('#LINE_BREAK#')) {
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
              })}
            </div>
            <Quotation className={styles.quoteEnd} />
          </div>
          <div className={styles.colEnd}>
            <strong className={styles.agentNameMobile}>{agent.name}</strong>

            <Tooltip
              message={props.serviceContext.tooltipMessage}
              classNameMessage={styles.tooltip}
            >
              <Hotline viewBox={'0 18 512 512'} />
              <ScreenReaderText>
                {props.serviceContext.tooltipMessage}
              </ScreenReaderText>
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
  /** required due to accessibility */
  /** KG: Is it required if this is the last child element? */
  /**children: PropTypes.node.isRequired */
};

export default ServiceAgentElement;

export function renderServiceAgentElement(props, container, callback) {
  ReactDOM.render(<ServiceAgentElement {...props} />, container, callback);
}
