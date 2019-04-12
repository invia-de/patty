import React from 'react';
import ReactDOM from 'react-dom';
import styles from './PriceHistory.module.scss';
import Price from '../../components/utilities/Price/Price';

class PriceHistory extends React.Component {
  constructor() {
    super();
    this.state = {
      data: new Array(14)
        .fill(1)
        .map(n => Math.ceil(Math.random() * 90 + n + 40)),
      labels: new Array(14)
        .fill(1)
        .map((n, i) => 'So ' + ('0' + (1 + i)).substr(-2) + '.08')
    };
  }

  render() {
    return (
      <div className={styles.container}>
        <h2>Sparkalender - Anreisetermine</h2>
        <div className={styles.chart}>
          {this.state.data.map((price, i) => {
            return (
              <div
                key={i}
                className={
                  i === 0
                    ? styles.bar_cheapest
                    : i < 3
                    ? styles.bar_notInRange
                    : styles.bar
                }
                style={{ height: price + 'px' }}
              >
                <strong className={styles.price}>
                  <Price value={price * 123} />
                </strong>
                <div>16 Tage</div>
              </div>
            );
          })}
        </div>
        <div className={styles.axis}>
          {this.state.labels.map((date, i) => {
            return (
              <div className={styles.label} key={i}>
                {date}
              </div>
            );
          })}
        </div>
        <button
          onClick={() =>
            this.setState({
              data: new Array(14)
                .fill(1)
                .map(n => Math.ceil(Math.random() * 90 + n + 40))
            })
          }
        >
          random
        </button>
      </div>
    );
  }
}

export default PriceHistory;

export function renderPriceHistory(props, container, callback) {
  ReactDOM.render(<PriceHistory {...props} />, container, callback);
}
