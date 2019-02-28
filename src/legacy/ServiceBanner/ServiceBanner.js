import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import API_MOCK from './mock.json';
import styles from './ServiceBanner.module.scss';
import { IconArrowRight, IconArrowLeft } from '../Icons/Icons';
import ScreenReaderText from '../ScreenReaderText/ScreenReaderText';
import ReactSwipe from 'react-swipe';
import ServiceAgentElement from '../ServiceAgentElement/ServiceAgentElement';
import { debug } from 'util';

// linear time in-place shuffle
const inPlaceShuffle = (arr, agentId) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

class ServiceBanner extends React.Component {
  constructor() {
    super();
    this.state = { agents: null, serviceContext: null };
    this.reactSwipe = React.createRef();
    this.autoSpeed = 5000;
    this.setAgentOnTransition = this.setAgentOnTransition.bind(this);
    this.setActiveAgent = this.setActiveAgent.bind(this);
  }

  componentWillMount() {
    //Check if the device is a mobile.
    // Note: Not 100% future proof
    if (
      typeof window.orientation !== 'undefined' ||
      navigator.userAgent.indexOf('IEMobile') !== -1
    ) {
      //Stop the automatic slideshow on mobile
      this.autoSpeed = 0;
    }
  }

  setAgentOnTransition() {
    if (this.reactSwipe.current !== null)
      this.setActiveAgent(this.reactSwipe.current.getPos());
  }

  setActiveAgent(swipeAgentID) {
    if (this.state.agents) {
      // Get the real id of the agent
      const localAgentID = this.state.agents[swipeAgentID].id;
      localStorage.setItem('SESSION_ACTIVE_AGENT', localAgentID);
    }
  }

  componentDidMount() {
    //TODO: Remove hardcoded props/mock data after development.
    const localAgentID = localStorage.getItem('SESSION_ACTIVE_AGENT');
    const activeAgent = localAgentID ? localAgentID : 0;
    const randomized_agents = inPlaceShuffle(
      API_MOCK.response.agents,
      localAgentID
    );

    this.timeout = window.setTimeout(() => {
      this.setState(
        {
          agents: randomized_agents,
          serviceContext: {
            hotelName: 'Fancy hotel',
            promotionalCode: 'CODE123',
            regionName: 'Somewhere in the world'
          }
        },
        () => {
          this.setActiveAgent(activeAgent);
        }
      );
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timeout) clearTimeout(this.timeout);
  }

  render() {
    const agentNodes =
      this.state.agents !== null ? (
        this.state.agents.map((agent, i) => {
          return (
            <div key={i} onClick={() => this.reactSwipe.current.swipe.stop()}>
              <ServiceAgentElement
                agent={agent}
                styles={styles}
                serviceContext={this.state.serviceContext}
              />
            </div>
          );
        }, this)
      ) : (
        <div>Loading stuff</div>
      );

    return (
      <div className={styles.servicebanner}>
        <ReactSwipe
          ref={this.reactSwipe}
          swipeOptions={{
            auto: this.autoSpeed,
            speed: 1000,
            transitionEnd: () => {
              this.setAgentOnTransition();
            }
          }}
          childCount={agentNodes.length}
        >
          {agentNodes}
        </ReactSwipe>
        <button
          className={styles.prev}
          onClick={() => this.reactSwipe.current.prev()}
        >
          <IconArrowLeft />
          <ScreenReaderText>prev</ScreenReaderText>
        </button>
        <button
          className={styles.next}
          onClick={() => this.reactSwipe.current.next()}
        >
          <IconArrowRight />
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
