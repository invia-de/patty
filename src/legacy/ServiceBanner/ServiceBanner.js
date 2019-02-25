import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import API_MOCK from './mock.json';
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
  }
  componentDidMount() {
    // this.setState();

    //TODO: Remove hardcoded props/mock data after development.
    this.timeout = window.setTimeout(() => {
      this.setState({
        agents: API_MOCK.response.agents,
        serviceContext: {
          hotelName: 'Fancy hotel',
          promotionalCode: 'CODE123',
          regionName: 'Somewhere in the world'
        }
      });
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
            <ServiceAgentElement
              agent={agent}
              styles={styles}
              key={i}
              serviceContext={this.state.serviceContext}
            />
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
            auto: 1000,
            speed: 200
          }}
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
