import React from 'react';
import ReactDOM from 'react-dom';
import Price from '../../components/utilities/Price/Price';
import NoBreak from '../../components/utilities/NoBreak/NoBreak';
import DateTime from '../../components/utilities/DateTime/DateTime';
import styles from './PriceHistory.module.scss';
import mock from './mock.json';
import {
  IconArrowLeft,
  IconArrowRight
} from '../../components/atoms/Icon/Icon';
import Tooltip from '../../components/atoms/Tooltip/Tooltip';

class PriceHistory extends React.Component {
  constructor() {
    super();

    let arr = mock.response.items.map(obj => obj.priceInEuro);
    let index = arr.indexOf(Math.min(...arr));

    this.state = {
      data: mock.response.items,
      position: index > 6 ? index - 7 : 0,
      lowestPriceIndex: index > 6 ? index - 7 : 0
    };
  }

  componentDidMount() {
    this.setState({});
  }

  onClickPrev() {}

  onClickNext() {}

  render() {
    let view = this.state.data.slice(
      this.state.position,
      14 + this.state.position
    );
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
          {view.map(
            ({ priceInEuro, currency, duration, className, airport }, i) => {
              return (
                <Tooltip
                  key={i}
                  message={
                    <div className={styles.tooltip}>
                      <NoBreak>
                        <strong>
                          ab <Price value={priceInEuro} /> p.P.
                        </strong>
                        {duration} Tage,
                        <br />
                        ab {airport.name} ({airport.id})
                      </NoBreak>
                    </div>
                  }
                >
                  <div
                    className={className}
                    style={{ height: 140 - (max - priceInEuro) / step }}
                  >
                    <strong className={styles.price}>
                      <Price value={priceInEuro} currency={currency} />
                    </strong>
                    <div>{duration} Tage</div>
                  </div>
                </Tooltip>
              );
            }
          )}
        </div>
        <div className={styles.axisContainer}>
          <button
            className={styles.button}
            onClick={() =>
              this.setState(({ position }) => ({ position: position - 7 }))
            }
          >
            <IconArrowLeft />
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
            className={styles.button}
            onClick={() =>
              this.setState(({ position }) => ({ position: position + 7 }))
            }
          >
            <IconArrowRight />
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
