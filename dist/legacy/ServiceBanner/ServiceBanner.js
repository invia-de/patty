import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './ServiceBanner.module.scss';
import { ArrowRight, ArrowLeft } from '../../components/atoms/Icon/Icon';
import ScreenReaderText from '../../components/utilities/ScreenReaderText/ScreenReaderText';
import ReactSwipe from 'react-swipe';
import ServiceAgentElement from '../ServiceAgentElement/ServiceAgentElement';
import storageAvailable from '../../utils/localstorage';

class ServiceBanner extends React.Component {
  constructor() {
    super();
    this.state = {
      agents: null,
      serviceContext: null
    };
    this.reactSwipe = React.createRef();
    this.autoSpeed = 5000;
    this.setAgentOnTransition = this.setAgentOnTransition.bind(this);
    this.setActiveAgent = this.setActiveAgent.bind(this); // Specify the step to which IBE step the banner belongs
    // If not passed by props, this step will be used

    this.hasLocalStorage = storageAvailable('localStorage');
  }

  componentWillMount() {
    if (this.props.deviceType === 'mobile' || localStorage.getItem('SESSION_ACTIVE_AGENT') !== null) {
      //Stop the automatic slideshow on mobile
      //and when there is an active session agent
      this.autoSpeed = 0;
    }
  }

  componentDidMount() {
    const activeAgent = this.hasLocalStorage && this.props.step !== 'regions' ? parseInt(localStorage.getItem('SESSION_ACTIVE_AGENT')) : null;
    this.setState({
      agents: this.inPlaceShuffle(this.props.agents, activeAgent, this.props.random),
      //TODO Add fallback logic?
      serviceContext: {
        hotelName: this.props.hotelName || '',
        promotionCode: this.props.promotionCode || '',
        regionName: this.props.regionName || '',
        tooltipMessage: this.props.tooltipMessage || 'Ortstarif, Mobilfunk abweichend <br> (Montag - Sonntag von 8 - 23 Uhr)',
        deviceType: this.props.deviceType || 'desktop'
      }
    });
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
      if (this.hasLocalStorage) localStorage.setItem('SESSION_ACTIVE_AGENT', localAgentID);
    }
  } // Place the active agent in front,
  // Shuffle the rest


  inPlaceShuffle(arr, agentId) {
    if (typeof arr !== 'undefined') {
      const activeAgent = agentId ? arr.splice(arr.findIndex(agent => {
        return agent.id === agentId;
      }), 1)[0] : null;

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
    if (!this.state.agents) return null;
    const agentNodes = this.state.agents.map((agent, i) => {
      return React.createElement("div", {
        key: i,
        onClick: () => this.setAgentOnTransition('stop')
      }, React.createElement(ServiceAgentElement, {
        agent: agent,
        styles: styles,
        serviceContext: this.state.serviceContext,
        step: this.props.step
      }));
    });
    return React.createElement("div", {
      className: styles.servicebanner
    }, React.createElement(ReactSwipe, {
      ref: this.reactSwipe,
      swipeOptions: {
        auto: this.autoSpeed,
        speed: 1000
      },
      childCount: agentNodes.length
    }, agentNodes), React.createElement("button", {
      className: styles.prev,
      onClick: () => this.setAgentOnTransition('prev')
    }, React.createElement(ArrowLeft, null), React.createElement(ScreenReaderText, null, "prev")), React.createElement("button", {
      className: styles.next,
      onClick: () => this.setAgentOnTransition('next')
    }, React.createElement(ArrowRight, null), React.createElement(ScreenReaderText, null, "next")));
  }

}

ServiceBanner.propTypes = {
  /** additional classNames you want to add */
  className: PropTypes.string,

  /** deactivates the random rendering of service agents for visual-test */
  random: PropTypes.bool
};
ServiceBanner.defaultProps = {
  random: true
};
export default ServiceBanner;
export function renderServiceBanner(props, container, callback) {
  ReactDOM.render(React.createElement(ServiceBanner, props), container, callback);
}