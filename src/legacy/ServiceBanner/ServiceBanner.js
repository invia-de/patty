import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './ServiceBanner.module.scss';
import { IconArrowRight, IconArrowLeft } from '../Icons/Icons';
import ScreenReaderText from '../ScreenReaderText/ScreenReaderText';
import ReactSwipe from 'react-swipe';
import ServiceAgentElement from '../ServiceAgentElement/ServiceAgentElement';

class ServiceBanner extends React.Component {
  constructor() {
    super();
    this.state = { agents: null, serviceContext: null };
    this.reactSwipe = React.createRef();
    this.autoSpeed = 5000;
    this.setAgentOnTransition = this.setAgentOnTransition.bind(this);
    this.setActiveAgent = this.setActiveAgent.bind(this);
    this.endpointURL =
      process.env.NODE_ENV === 'development'
        ? `${process.env.REACT_APP_PUBLIC_URL}/live/ms/v/5/service-agents?step=`
        : '/live/ms/v/5/service-agents?step=';

    // Specify the step to which IBE step the banner belongs
    // If not passed by props, this step will be used
    this.step = 'regions';
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
    const URL = this.props.step
      ? `${this.endpointURL}${this.props.step}`
      : `${this.endpointURL}${this.step}`;

    fetch(URL)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(data => {
        this.setState({
          agents: this.inPlaceShuffle(
            data.response.agents,
            localStorage.getItem('SESSION_ACTIVE_AGENT')
          ),
          serviceContext: {
            hotelName: this.props.hotelName || 'Fancy hotel',
            promotionalCode: this.props.promotionalCode || 'CODE123',
            regionName: this.props.regionName || 'Somewhere in the world'
          }
        });
      })
      .catch(e => {
        console.log(e);
        return e;
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
      localStorage.setItem('SESSION_ACTIVE_AGENT', localAgentID);
    }
  }

  // Place the active agent in front,
  // Shuffle the rest
  inPlaceShuffle = (arr, agentId) => {
    const activeAgent = agentId ? arr.splice(agentId, 1)[0] : null;

    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * i);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    if (activeAgent) arr.unshift(activeAgent);
    return arr;
  };

  render() {
    const agentNodes =
      this.state.agents !== null ? (
        this.state.agents.map((agent, i) => {
          return (
            <div key={i} onClick={() => this.setAgentOnTransition('stop')}>
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
          <IconArrowLeft />
          <ScreenReaderText>prev</ScreenReaderText>
        </button>
        <button
          className={styles.next}
          onClick={() => this.setAgentOnTransition('next')}
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
