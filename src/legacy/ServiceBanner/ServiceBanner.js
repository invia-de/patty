import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './ServiceBanner.module.scss';
import { ArrowRight, ArrowLeft } from '../Icon/Icon';
import ScreenReaderText from '../ScreenReaderText/ScreenReaderText';
import ReactSwipe from 'react-swipe';
import ServiceAgentElement from '../ServiceAgentElement/ServiceAgentElement';

class ServiceBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { agents: null, serviceContext: null };
    this.reactSwipe = React.createRef();
    this.autoSpeed = 5000;
    this.setAgentOnTransition = this.setAgentOnTransition.bind(this);
    this.setActiveAgent = this.setActiveAgent.bind(this);
    // Specify the step to which IBE step the banner belongs
    // If not passed by props, this step will be used
    this.step = 'regions';
    this.hasLocalStorage = this.storageAvailable();
  }

  componentWillMount() {
    //Check if the device is a mobile.
    // Note: Not 100% future proof
    if (
      typeof window.orientation !== 'undefined' ||
      navigator.userAgent.indexOf('IEMobile') !== -1 ||
      localStorage.getItem('SESSION_ACTIVE_AGENT') !== null
    ) {
      //Stop the automatic slideshow on mobile
      //and when there is an active session agent
      this.autoSpeed = 0;
    }
  }

  componentDidMount() {
    const activeAgent = this.hasLocalStorage
      ? parseInt(localStorage.getItem('SESSION_ACTIVE_AGENT'))
      : null;
    this.setState({
      agents: this.inPlaceShuffle(this.props.agents, activeAgent),
      //TODO Add fallback logic?
      serviceContext: {
        hotelName: this.props.hotelName || 'Fancy hotel',
        promotionalCode: this.props.promotionalCode || 'CODE123',
        regionName: this.props.regionName || 'Somewhere in the world'
      }
    });
  }

  setAgentOnTransition(transition) {
    if (this.reactSwipe.current !== null) {
      this.reactSwipe.current.swipe[transition]();
      this.setActiveAgent(this.reactSwipe.current.getPos());
    }
  }

  setActiveAgent(swipeAgentID) {
    if (this.state.agents) {
      // Get the real id of the agent
      const localAgentID = this.state.agents[swipeAgentID].id;
      if (this.hasLocalStorage)
        localStorage.setItem('SESSION_ACTIVE_AGENT', localAgentID);
    }
  }

  // Place the active agent in front,
  // Shuffle the rest
  inPlaceShuffle = (arr, agentId) => {
    const activeAgent = agentId
      ? arr.splice(
          arr.findIndex(agent => {
            return agent.id === agentId;
          }),
          1
        )[0]
      : null;

    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * i);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    if (activeAgent) arr.unshift(activeAgent);
    return arr;
  };

  //Feature-detecting localStorage
  // ref:
  // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Testing_for_availability
  storageAvailable(type) {
    try {
      var storage = window[type],
        x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage.length !== 0
      );
    }
  }

  render() {
    if (!this.state.agents) return null;

    const agentNodes = this.state.agents.map((agent, i) => {
      return (
        <div key={i} onClick={() => this.setAgentOnTransition('stop')}>
          <ServiceAgentElement
            agent={agent}
            styles={styles}
            serviceContext={this.state.serviceContext}
          />
        </div>
      );
    }, this);

    return (
      <div className={styles.servicebanner}>
        <ReactSwipe
          ref={this.reactSwipe}
          swipeOptions={{
            auto: this.autoSpeed,
            speed: 1000
          }}
          childCount={agentNodes.length}
        >
          {agentNodes}
        </ReactSwipe>
        <button
          className={styles.prev}
          onClick={() => this.setAgentOnTransition('prev')}
        >
          <ArrowLeft />
          <ScreenReaderText>prev</ScreenReaderText>
        </button>
        <button
          className={styles.next}
          onClick={() => this.setAgentOnTransition('next')}
        >
          <ArrowRight />
          <ScreenReaderText>next</ScreenReaderText>
        </button>
      </div>
    );
  }
}

ServiceBanner.propTypes = {
  /** additional classNames you want to add */
  className: PropTypes.string
};

export default ServiceBanner;

export function renderServiceBanner(props, container, callback) {
  ReactDOM.render(<ServiceBanner {...props} />, container, callback);
}
