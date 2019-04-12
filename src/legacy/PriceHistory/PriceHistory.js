import React from 'react';
import ReactDOM from 'react-dom';
import Price from '../../components/utilities/Price/Price';
import styles from './PriceHistory.module.scss';

class PriceHistory extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [1234, 1841, 1344, 1534, 1634, 1568, 1277, 1245, 2132, 1256],
      labels: new Array(10)
        .fill(1)
        .map((n, i) => 'So ' + ('0' + (1 + i)).substr(-2) + '.08')
    };
  }

  render() {
    let max = Math.max(...this.state.data);
    let min = Math.min(...this.state.data);
    let step = (max - min) / 100;

    return (
      <div className={styles.container}>
        <h2>Sparkalender - Anreisetermine</h2>
        <div className={styles.chart}>
          {this.state.data.map((price, i) => {
            return (
              <div
                key={i}
                className={
                  min === price
                    ? styles.bar_cheapest
                    : i < 3
                    ? styles.bar_notInRange
                    : styles.bar
                }
                style={{ height: 140 - (max - price) / step }}
              >
                <strong className={styles.price}>
                  <Price value={price} />
                </strong>
                <div>16 Tage</div>
              </div>
            );
          })}
        </div>
        <div className={styles.axis}>
          {this.state.labels.map((date, i) => {
            let arr = date.split(' ');
            return (
              <div className={styles.label} key={i}>
                <strong className={styles.labelDay}>{arr[0]}</strong>
                {arr[1]}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default PriceHistory;

export function renderPriceHistory(props, container, callback) {
  ReactDOM.render(<PriceHistory {...props} />, container, callback);
}
