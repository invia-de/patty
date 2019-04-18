import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Tooltip from '../../components/atoms/Tooltip/Tooltip.js';
import { IconHotline, IconQuotation } from '../../components/atoms/Icon/Icon';
import ScreenReaderText from '../../components/utilities/ScreenReaderText/ScreenReaderText';
import reactStringReplace from 'react-string-replace';

const textReplacement = function(txt, placeholder, replacement) {
  return reactStringReplace(txt, placeholder, () => (
    <React.Fragment key={txt}>{replacement}</React.Fragment>
  ));
};
const ProcessText = props => {
  const replacementMappings = [
    ['#LINE_BREAK#', <br />],
    ['#HOTEL_NAME#', <strong>{props.serviceContext.hotelName}</strong>],
    ['#PROMOTION_CODE#', <strong>{props.serviceContext.promotionCode}</strong>],
    ['#REGION_NAME#', props.serviceContext.regionName]
  ];
  let txt = props.txt;
  for (const [placeholder, replacement] of replacementMappings) {
    txt = textReplacement(txt, placeholder, replacement);
  }
  return <span>{txt}</span>;
};

function ServiceAgentElement(props) {
  const agent = props.agent;
  const styles = props.styles;
  const bDisplayAdviceText = props.step !== 'offers' ? true : false;

  if (agent === undefined || styles === undefined) return null;

  return (
    <div data-testid="serviceAgent">
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
            <IconQuotation className={styles.quoteBegin} />
            <blockquote className={styles.serviceElementText}>
              {agent.text.map((t, i) => {
                return (
                  <ProcessText
                    txt={t}
                    index={i}
                    agentId={agent.id}
                    serviceContext={props.serviceContext}
                    key={i}
                  />
                );
              }, props)}
              {bDisplayAdviceText && (
                <span className={styles.agentAdviceTextMobile}>
                  Ich berate Sie gern.
                </span>
              )}
            </blockquote>
            <IconQuotation className={styles.quoteEnd} />
          </div>
          <div className={styles.colEnd}>
            <strong className={styles.agentNameMobile}>{agent.name}</strong>

            <Tooltip message={props.serviceContext.tooltipMessage}>
              <IconHotline />
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
            <small className={styles.availability}>(tgl. 8 - 23 Uhr)</small>
          </div>
          <div className={styles.agentExperienceMobile}>{agent.experience}</div>
        </div>
      </div>
      <div className={styles.colfull}>
        <strong data-testid="agentName" className={styles.agentName}>
          {agent.name}
        </strong>
        <div className={styles.agentExperience}>{agent.experience}</div>
        <div className={styles.agentAdviceText}>
          {bDisplayAdviceText && 'Ich berate Sie gern.'}
        </div>
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
