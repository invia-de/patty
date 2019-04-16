import React from 'react';
import ReactDOM from 'react-dom';
import Price from '../../components/utilities/Price/Price';
import DateTime from '../../components/utilities/DateTime/DateTime';
import styles from './PriceHistory.module.scss';
import mock from './mock.json';

class PriceHistory extends React.Component {
  constructor() {
    super();
    this.state = {
      data: mock.response.items,
      page: 0
    };
  }

  render() {
    let view = this.state.data.slice(this.state.page, 14 + this.state.page);
    const arr = view.map(obj => obj.priceInEuro);
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const step = (max - min) / 100;

    view = view.map(obj => {
      obj.className = styles.bar;
      if (obj.priceInEuro === min) {
        obj.className = styles.bar_cheapest;
      }
      return obj;
    });

    return (
      <div className={styles.container}>
        <h2>Preisverlauf</h2>
        <div className={styles.chart}>
          {view.map(({ priceInEuro, currency, duration, className }, i) => {
            return (
              <div
                key={i}
                className={className}
                style={{ height: 140 - (max - priceInEuro) / step }}
              >
                <strong className={styles.price}>
                  <Price value={priceInEuro} currency={currency} />
                </strong>
                <div>{duration} Tage</div>
              </div>
            );
          })}
        </div>
        <div className={styles.axisContainer}>
          <button
            onClick={() => this.setState(({ page }) => ({ page: page - 7 }))}
          >
            o
          </button>
          <div className={styles.axis}>
            {view.map((obj, i) => {
              return (
                <DateTime
                  className={styles.label}
                  value={obj.departureDate}
                  key={obj.departureDate}
                />
              );
            })}
          </div>
          <button
            onClick={() => this.setState(({ page }) => ({ page: page + 7 }))}
          >
            o
          </button>
        </div>
      </div>
    );
  }
}

export default PriceHistory;

export function renderPriceHistory(props, container, callback) {
  ReactDOM.render(<PriceHistory {...props} />, container, callback);
}
