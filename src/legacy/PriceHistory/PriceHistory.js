import React from 'react';
import ReactDOM from 'react-dom';
import styles from './PriceHistory.module.scss';

class PriceHistory extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.chart}>
          <div className={styles.bar}>
            <div>€ 506</div>
            <div>16 Tage</div>
          </div>
          <div className={styles.bar}>
            <div>€ 506</div>
            <div>16 Tage</div>
          </div>
          <div className={styles.bar}>
            <div>€ 506</div>
            <div>16 Tage</div>
          </div>
          <div className={styles.bar}>
            <div>€ 506</div>
            <div>16 Tage</div>
          </div>
          <div className={styles.bar}>
            <div>€ 506</div>
            <div>16 Tage</div>
          </div>
          <div className={styles.bar}>
            <div>€ 506</div>
            <div>16 Tage</div>
          </div>
          <div className={styles.bar}>
            <div>€ 506</div>
            <div>16 Tage</div>
          </div>
          <div className={styles.bar}>
            <div>€ 506</div>
            <div>16 Tage</div>
          </div>
          <div className={styles.bar}>
            <div>€ 506</div>
            <div>16 Tage</div>
          </div>
          <div className={styles.bar}>
            <div>€ 506</div>
            <div>16 Tage</div>
          </div>
          <div className={styles.bar}>
            <div>€ 506</div>
            <div>16 Tage</div>
          </div>
          <div className={styles.bar}>
            <div>€ 506</div>
            <div>16 Tage</div>
          </div>
          <div className={styles.bar}>
            <div>€ 506</div>
            <div>16 Tage</div>
          </div>
          <div className={styles.bar}>
            <div>€ 506</div>
            <div>16 Tage</div>
          </div>
        </div>
        <div className={styles.axis}>
          <div className={styles.x} />
        </div>
      </div>
    );
  }
}

export default PriceHistory;

export function renderPriceHistory(props, container, callback) {
  ReactDOM.render(<PriceHistory {...props} />, container, callback);
}
