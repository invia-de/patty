import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import API_MOCK from './mock.json';
import styles from './ServiceBanner.module.scss';
import { IconArrowRight, IconArrowLeft, IconHotline } from '../Icons/Icons';
import ScreenReaderText from '../ScreenReaderText/ScreenReaderText';
import Tooltip from '../Tooltip/Tooltip.js';
import ReactSwipe from 'react-swipe';

class ServiceBanner extends React.Component {
  constructor() {
    super();
    this.state = { agents: null, a: ['a', 'b', 'c'] };
    this.reactSwipe = React.createRef();
  }

  componentDidMount() {
    window.setTimeout(() => {
      this.setState({ agents: API_MOCK.response.agents });
    }, 5000);
  }

  render() {
    return (
      <div className={styles.servicebanner}>
        <ReactSwipe
          ref={this.reactSwipe}
          swipeOptions={{
            auto: 1000
          }}
        >
          <div>
            <div className={styles.colImg}>
              <img
                className={styles.img}
                src="https://eric-zieger.de/eric-zieger.jpg"
                alt=""
                aria-hidden="true"
              />
            </div>
            <div className={styles.colMid}>
              Sie sind noch unsicher, wohin Sie reisen möchten? Ich berate Sie
              gern telefonisch.
            </div>
            <div className={styles.colEnd}>
              <Tooltip message="bla">
                <IconHotline />
                <ScreenReaderText>Tarif und Geschaftszeiten</ScreenReaderText>
              </Tooltip>
              <a
                className={styles.hotline}
                href="tel:0341 65050 87340"
                target="_blank"
                rel="noopener noreferrer"
              >
                0341 65050 87500
              </a>
              <small className={styles.availability}>(tgl. 8 - 23 Uhr)</small>
            </div>
            <div className={styles.colfull}>
              <strong className={styles.agentName}>Eric</strong>
              <div className={styles.agentExperience}>
                7 Jahre Berufserfahrung
              </div>
            </div>
          </div>
          <div>
            <div className={styles.colImg}>
              <img
                className={styles.img}
                src="https://eric-zieger.de/eric-zieger.jpg"
                alt=""
                aria-hidden="true"
              />
            </div>
            <div className={styles.colMid}>
              Sie sind noch unsicher, wohin Sie reisen möchten? Ich berate Sie
              gern telefonisch.
            </div>
            <div className={styles.colEnd}>
              <Tooltip message="bla">
                <IconHotline />
                <ScreenReaderText>Tarif und Geschaftszeiten</ScreenReaderText>
              </Tooltip>
              <a
                className={styles.hotline}
                href="tel:0341 65050 87340"
                target="_blank"
                rel="noopener noreferrer"
              >
                0341 65050 87500
              </a>
              <small className={styles.availability}>(tgl. 8 - 23 Uhr)</small>
            </div>
            <div className={styles.colfull}>
              <strong className={styles.agentName}>Eric</strong>
              <div className={styles.agentExperience}>
                7 Jahre Berufserfahrung
              </div>
            </div>
          </div>
          <div>
            <div className={styles.colImg}>
              <img
                className={styles.img}
                src="https://eric-zieger.de/eric-zieger.jpg"
                alt=""
                aria-hidden="true"
              />
            </div>
            <div className={styles.colMid}>
              Sie sind noch unsicher, wohin Sie reisen möchten? Ich berate Sie
              gern telefonisch.
            </div>
            <div className={styles.colEnd}>
              <Tooltip message="bla">
                <IconHotline />
                <ScreenReaderText>Tarif und Geschaftszeiten</ScreenReaderText>
              </Tooltip>
              <a
                className={styles.hotline}
                href="tel:0341 65050 87340"
                target="_blank"
                rel="noopener noreferrer"
              >
                0341 65050 87500
              </a>
              <small className={styles.availability}>(tgl. 8 - 23 Uhr)</small>
            </div>
            <div className={styles.colfull}>
              <strong className={styles.agentName}>Eric</strong>
              <div className={styles.agentExperience}>
                7 Jahre Berufserfahrung
              </div>
            </div>
          </div>
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
