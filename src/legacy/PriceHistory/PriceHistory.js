import React from 'react';
import ReactDOM from 'react-dom';
import Price from '../../components/utilities/Price/Price';
import NoBreak from '../../components/utilities/NoBreak/NoBreak';
import DateTime from '../../components/utilities/DateTime/DateTime';
import Loading from '../../components/atoms/Loading/Loading';
import styles from './PriceHistory.module.scss';
import mock from './mock.json';
import {
  IconArrowLeft,
  IconArrowRight
} from '../../components/atoms/Icon/Icon';
import Tooltip from '../../components/atoms/Tooltip/Tooltip';
import travelService from '../../utils/travelService';

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

    this.onClickPrev = this.onClickPrev.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
  }

  componentDidMount() {
    this.setState({});
    travelService.get('search-pricechart', { hotelId: '1111' });
  }

  onClickPrev() {
    this.setState(({ data, position }) => {
      let newPos = position - 7;
      return {
        position: newPos,
        loading: newPos > data.length - 14 || newPos < 0
      };
    }, this.getData);
  }

  onClickNext() {
    this.setState(({ data, position }) => {
      let newPos = position + 7;
      return {
        position: newPos,
        loading: newPos > data.length - 14 || newPos < 0
      };
    }, this.getData);
  }

  getData() {
    if (this.state.loading) {
      window.setTimeout(() => {
        this.setState({ loading: false });
      }, 1500);
    }
  }

  addDaysToDate(date, daysToAdd) {
    date = new Date(date);
    date.setDate(date.getDate() + daysToAdd);
    return date;
  }

  getFiller(fillCount, departureDate, dayModification) {
    let filler = new Array(fillCount <= 14 ? fillCount : 14)
      .fill(1)
      .map((_, i) => {
        return {
          loading: true,
          priceInEuro: null,
          departureDate: this.addDaysToDate(
            departureDate,
            (i + 1) * dayModification
          )
        };
      });

    return dayModification === -1 ? filler.reverse() : filler;
  }

  getView() {
    const { data, position } = this.state;

    if (position < 0) {
      return [
        ...this.getFiller(~position + 1, data[0].departureDate, -1),
        ...(position > -14 ? data.slice(0, 14 + position) : [])
      ];
    } else if (data.length < position + 14) {
      return [
        ...(position < data.length ? data.slice(position) : []),
        ...this.getFiller(
          position + 14 - data.length,
          data[data.length - 1].departureDate,
          1
        )
      ];
    }

    return data.slice(position, 14 + position);
  }

  render() {
    let view = this.getView();
    const arr = view
      .map(obj => obj.priceInEuro)
      .filter(price => price !== null);
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const step = (max - min) / 100;

    view = view.map(obj => {
      if (obj.loading) {
        obj.className = styles.bar_loading;
      } else if (obj.priceInEuro === min) {
        obj.className = styles.bar_cheapest;
      } else {
        obj.className = styles.bar;
      }

      return obj;
    });

    return (
      <div className={styles.container}>
        <h2>Preisverlauf</h2>
        <div className={styles.chart}>
          {view.map(
            (
              { priceInEuro, currency, duration, className, airport, loading },
              i
            ) => {
              return loading ? (
                <div className={styles.loading_wrapper}>
                  <div className={className}>
                    <Loading />
                  </div>
                </div>
              ) : (
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
            disabled={this.state.loading}
            className={styles.button}
            onClick={this.onClickPrev}
          >
            <IconArrowLeft />
          </button>
          <div className={styles.axis}>
            {view.map(obj => {
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
            disabled={this.state.loading}
            className={styles.button}
            onClick={this.onClickNext}
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
