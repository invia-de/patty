import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Tooltip from '../Tooltip/Tooltip.js';
import { IconHotline } from '../Icons/Icons';
import ScreenReaderText from '../ScreenReaderText/ScreenReaderText';
import reactStringReplace from 'react-string-replace';

const ProcessText = (txt, key, serviceContext) => {
  const replacementMappings = [
    ['#LINE_BREAK#', <br />],
    ['#HOTEL_NAME#', <strong>{serviceContext.hotelName}</strong>],
    ['#PROMOTION_CODE#', <strong>{serviceContext.promotionalCode}</strong>],
    ['#REGION_NAME#', serviceContext.regionName]
  ];

  for (const [placeholder, replacement] of replacementMappings) {
    txt = reactStringReplace(txt, placeholder, () => (
      <React.Fragment key={key}>{replacement}</React.Fragment>
    ));
  }
  return <span key={key}>{txt}</span>;
};

function ServiceAgentElement(props) {
  const agent = props.agent;
  const styles = props.styles;

  // TODO: Add fallback logic?
  if (agent === undefined || styles === undefined)
    return <div>Loading stuff</div>;

  return (
    <div>
      <div className={styles.colImg}>
        <img
          className={styles.img}
          src={agent.image}
          alt=""
          aria-hidden="true"
        />
      </div>
      <div className={styles.colMid}>
        <p className={styles.serviceElementText}>
          {agent.text.map((t, i) => (
            <ProcessText
              txt={t}
              key={i}
              serviceContext={props.serviceContext}
            />
          ))}
        </p>
      </div>
      <div className={styles.colEnd}>
        <strong className={styles.agentNameMobile}>{agent.name}</strong>

        <Tooltip message="Tarif und Geschäftszeiten">
          <IconHotline />
          <ScreenReaderText>Tarif und Geschäftszeiten</ScreenReaderText>
        </Tooltip>
        <a
          className={styles.hotline}
          href={'tel: ' + agent.telephone.desktop}
          target="_blank"
          rel="noopener noreferrer"
        >
          {agent.telephone.desktop}
        </a>
        <small className={styles.availability}>(tgl. 8 - 23 Uhr)</small>
      </div>
      <div className={styles.colfull}>
        <strong className={styles.agentName}>{agent.name}</strong>
        <div className={styles.agentExperience}>{agent.experience}</div>
      </div>
    </div>
  );
}

ServiceAgentElement.propTypes = {
  /** additional classNames you want to add */
  className: PropTypes.string
  /** required due to accessibility */
  /** KG: Is it required if this is the last child element? */
  /**children: PropTypes.node.isRequired */
};

export default ServiceAgentElement;

export function renderServiceAgentElement(props, container, callback) {
  ReactDOM.render(<ServiceAgentElement {...props} />, container, callback);
}
