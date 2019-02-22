import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Tooltip from '../Tooltip/Tooltip.js';
import { IconHotline } from '../Icons/Icons';
import ScreenReaderText from '../ScreenReaderText/ScreenReaderText';

function ServiceAgentElement(props) {
  const agent = props.agent;
  const styles = props.styles;
  return (
    <div id={props.agent.name}>
      <div className={styles.colImg}>
        <img
          className={styles.img}
          src={agent.image}
          alt=""
          aria-hidden="true"
        />
      </div>
      <div className={styles.colMid}>
        {/* TODO: Add proper text view logic */}
        {agent.text.map(t => {
          return <p>{t}</p>;
        })}
      </div>
      <div className={styles.colEnd}>
        <Tooltip message="bla">
          <IconHotline />
          <ScreenReaderText>Tarif und Geschaftszeiten</ScreenReaderText>
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
  className: PropTypes.string,
  /** required due to accessibility */
  children: PropTypes.node.isRequired
};

export default ServiceAgentElement;

export function renderServiceAgentElement(props, container, callback) {
  ReactDOM.render(<ServiceAgentElement {...props} />, container, callback);
}
