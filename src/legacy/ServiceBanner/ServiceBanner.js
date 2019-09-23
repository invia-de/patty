import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { ArrowLeft, ArrowRight } from '../../components/atoms/Icon/Icon';
import ReactSwipe from 'react-swipe';
import ServiceAgentElement from '../ServiceAgentElement/ServiceAgentElement';
import localStorageIsAvailable from '../../utils/localstorage';

import styles from './ServiceBanner.module.scss';

class ServiceBanner extends React.Component {
  constructor(props) {
    super(props);

    const activeAgent = localStorageIsAvailable
      ? parseInt(localStorage.getItem('SESSION_ACTIVE_AGENT'))
      : null;

    this.state = {
      agents: this.inPlaceShuffle(props.agents, activeAgent),
      serviceContext: {
        hotelName: props.hotelName,
        promotionCode: props.promotionCode,
        regionName: props.regionName,
        tooltipMessage: props.tooltipMessage,
        deviceType: props.deviceType
      }
    };
    this.reactSwipe = React.createRef();
    this.autoSpeed = 5000;
    this.setAgentOnTransition = this.setAgentOnTransition.bind(this);
    this.setActiveAgent = this.setActiveAgent.bind(this);

    if (
      props.deviceType === 'mobile' ||
      (localStorageIsAvailable &&
        localStorage.getItem('SESSION_ACTIVE_AGENT') !== null)
    ) {
      //Stop the automatic slideshow on mobile
      //and when there is an active session agent
      this.autoSpeed = 0;
    }
  }

  setAgentOnTransition(transition) {
    if (this.reactSwipe.current !== null) {
      this.reactSwipe.current.swipe[transition]();
      const pos = this.reactSwipe.current.getPos();
      this.setActiveAgent(pos);
    }
  }

  setActiveAgent(swipeAgentID) {
    if (this.state.agents) {
      // Get the real id of the agent
      const localAgentID = this.state.agents[swipeAgentID].id;
      if (localStorageIsAvailable)
        localStorage.setItem('SESSION_ACTIVE_AGENT', localAgentID);
    }
  }

  // Place the active agent in front,
  // Shuffle the rest
  inPlaceShuffle(arr, agentId) {
    if (typeof arr !== 'undefined') {
      let index = 0;
      arr.some((agent, i) => {
        if (agent.id === agentId) {
          index = i;
          return true;
        }

        return false;
      });

      const activeAgent = agentId ? arr.splice(index, 1)[0] : null;

      if (this.props.random) {
        for (let i = arr.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * i);
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      }

      if (activeAgent) arr.unshift(activeAgent);
    }
    return arr;
  }

  render() {
    const { agents } = this.state;

    if (agents.length === 0) return null;

    return (
      <div className={styles.servicebanner}>
        <ReactSwipe
          ref={this.reactSwipe}
          swipeOptions={{
            auto: this.autoSpeed,
            speed: agents.length < 3 ? 1 : 1000
          }}
          childCount={agents.length}
        >
          {agents.map(agent => (
            <div
              key={agent.id}
              onClick={() => this.setAgentOnTransition('stop')}
            >
              <ServiceAgentElement
                agent={agent}
                styles={styles}
                serviceContext={this.state.serviceContext}
                step={this.props.step}
              />
            </div>
          ))}
        </ReactSwipe>
        <button
          className={styles.prev}
          onClick={() => this.setAgentOnTransition('prev')}
        >
          <ArrowLeft />
        </button>
        <button
          className={styles.next}
          onClick={() => this.setAgentOnTransition('next')}
        >
          <ArrowRight />
        </button>
      </div>
    );
  }
}

ServiceBanner.propTypes = {
  /** additional classNames you want to add */
  className: PropTypes.string,
  /** deactivates the random rendering of service agents for visual-test */
  random: PropTypes.bool,
  regionName: PropTypes.string,
  agents: PropTypes.arrayOf(PropTypes.object),
  hotelName: PropTypes.string,
  promotionCode: PropTypes.string,
  deviceType: PropTypes.string,
  step: PropTypes.string,
  tooltipMessage: PropTypes.node
};

ServiceBanner.defaultProps = {
  random: true,
  regionName: '',
  hotelName: '',
  agents: [],
  promotionCode: '',
  tooltipMessage: (
    <span>
      Ortstarif, Mobilfunk abweichend
      <br />
      (Montag - Sonntag von 8 - 23 Uhr)
    </span>
  ),
  deviceType: 'desktop',
  step: ''
};

export default ServiceBanner;

export function renderServiceBanner(props, container, callback) {
  ReactDOM.render(<ServiceBanner {...props} />, container, callback);
}
