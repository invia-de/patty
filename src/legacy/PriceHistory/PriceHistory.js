import React from 'react';
import ReactDOM from 'react-dom';
import UniversalPrice from '../../components/atoms/UniversalPrice/UniversalPrice';
import NoBreak from '../../components/utilities/NoBreak/NoBreak';
import {
  formatDate,
  DateTime
} from '../../components/utilities/DateTime/DateTime';
import Loading from '../../components/atoms/Loading/Loading';
import styles from './PriceHistory.module.scss';
import {
  IconArrowLeft,
  IconArrowRight
} from '../../components/atoms/Icon/Icon';
import Tooltip from '../../components/atoms/Tooltip/Tooltip';
import travelService from '../../utils/travelService';
import url from '../../utils/url';
import isActive from '../../utils/features';

const durationMap = {
  '-1': 0,
  '6_91': 0,
  '6_7': 7,
  '6_14': 14,
  '6_3-7': 7,
  '6_7-14': 14,
  '10': 8,
  '7': 12,
  '6_10': 10
};

class PriceHistory extends React.Component {
  constructor() {
    super();

    this.state = {
      data: null,
      loading: true,
      position: 0,
      view: []
    };

    this.today = formatDate(new Date(), 'yyyy-mm-dd')[0];
    this.tomorrow = new Date(this.today).getTime() + 86400000;
    this.formattedTomorrow = formatDate(this.tomorrow, 'yyyy-mm-dd')[0];

    this.onClickPrev = this.onClickPrev.bind(this);
    this.onClickNext = this.onClickNext.bind(this);

    this.params = url.getAll(
      [
        'hotelId',
        'hotelIdType',
        'port',
        'adult',
        'area',
        'dest',
        'duration',
        'depDate',
        'retDate',
        'optPrice',
        'optOrganizer',
        'dynamicPricing',
        'ultSpecialTransfer',
        'depAirport',
        'optOcean',
        'optMeal',
        'roomtype',
        'topHotelSelected',
        'directFlight',
        'transferFilter',
        'children',
        'child1',
        'child2',
        'child3',
        'suppliers'
      ],
      {
        hotelId: '1111',
        retDate: '15.06.2019',
        depDate: '01.06.2019',
        suppliers: 'tt'
      }
    );

    if (isActive('useAllBlockedOrganizerInIbe4', false)) {
      this.params.useAllBlockedOrganizer = 1;
    }

    if (isActive('blockOrganizerByTravelType', false)) {
      this.params.blockOrganizerByTravelType = 1;
    }

    // delete params that value is false
    for (let param in this.params) {
      if (this.params.hasOwnProperty(param)) {
        if (this.params[param] === false) {
          delete this.params[param];
        }
      }
    }

    this.retDate =
      this.params.retDate &&
      this.params.retDate
        .split('.')
        .reverse()
        .join('-');
    this.depDate =
      this.params.depDate &&
      this.params.depDate
        .split('.')
        .reverse()
        .join('-');
  }

  inDateRange(date) {
    let timestamp = new Date(date).getTime();
    if (this.retDate && this.depDate) {
      return (
        new Date(this.retDate).getTime() >= timestamp &&
        new Date(this.depDate).getTime() <= timestamp
      );
    }
  }

  componentDidMount() {
    travelService.get('search-pricechart', this.params, result => {
      if (
        result.success &&
        result.response &&
        result.response.items &&
        result.response.items.length
      ) {
        let arr = result.response.items.map(obj => obj.priceInEuro);
        let index = arr.indexOf(Math.min(...arr));
        let position = index > 6 ? index - 7 : 0;
        let [view, fillCount] = this.getView(result.response.items, position);

        this.setState(
          {
            data: result.response.items,
            loading:
              position > result.response.items.length - 14 || position < 0,
            position: position,
            view: view,
            fillCount: fillCount
          },
          () => {
            this.getData();
          }
        );
      }
    });
  }

  moveView(moveBy) {
    this.setState(
      ({ data, position }) => {
        let newPos = position + moveBy;
        const [view, fillCount] = this.getView(this.state.data, newPos);
        return {
          position: newPos,
          loading: newPos > data.length - 14 || newPos < 0,
          view: view,
          fillCount: fillCount
        };
      },
      () => this.getData()
    );
  }

  onClickPrev() {
    this.moveView(-7);
  }

  onClickNext() {
    this.moveView(7);
  }

  mergeData(prevData, newData, oldView) {
    let testSet = new Set();

    return Array.from(new Set([...prevData, ...newData, ...oldView]))
      .filter(function(obj) {
        if (testSet.has(obj.departureDate)) {
          return false;
        }

        if (obj.loading) {
          obj.placeholder = true;
        }

        testSet.add(obj.departureDate);
        return true;
      })
      .sort(function(a, b) {
        if (a.departureDate > b.departureDate) return 1;
        if (a.departureDate < b.departureDate) return -1;
        return 0;
      });
  }

  getData() {
    if (this.state.loading) {
      let departureDate;
      let returnDate;
      let addToDays = 14;

      if (this.params.duration) {
        if (durationMap[this.params.duration]) {
          addToDays = durationMap[this.params.duration];
        } else if (this.params.duration && this.params.duration.indexOf('6_')) {
          addToDays = parseInt(this.params.duration.substr(2));
        }
      }

      this.state.view.forEach((item, i, arr) => {
        if (!departureDate && item.loading) {
          departureDate = formatDate(item.departureDate, 'dd.mm.yyyy')[0];
        } else if (departureDate && arr[i].loading) {
          returnDate = formatDate(
            this.addDaysToDate(item.departureDate, addToDays),
            'dd.mm.yyyy'
          )[0];
        }
      });

      travelService.get(
        'search-pricechart',
        {
          ...this.params,
          depDate: departureDate,
          retDate: returnDate
        },
        result => {
          if (
            result.success &&
            result.response &&
            result.response.items &&
            result.response.items.length
          ) {
            this.setState(prevState => {
              let mergedData = this.mergeData(
                prevState.data,
                result.response.items,
                prevState.view
              );
              let newPos = this.state.position < 0 ? 0 : prevState.position;
              const [view, fillCount] = this.getView(mergedData, newPos);

              return {
                data: mergedData,
                view: view,
                fillCount: fillCount,
                loading: false,
                position: newPos
              };
            });
          }

          if (
            result.success &&
            result.response &&
            result.response.items &&
            !result.response.items.length
          ) {
            this.setState({
              loading: false
            });
          }
        }
      );
    }
  }

  addDaysToDate(date, daysToAdd) {
    date = new Date(date);
    date.setDate(date.getDate() + daysToAdd);
    return date;
  }

  getFiller(fillCount, departureDate, dayModification) {
    let maxFill = 99;

    if (dayModification === -1) {
      const firstDate = this.state.data[0].departureDate;
      maxFill = (new Date(firstDate).getTime() - this.tomorrow) / 86400000;
    }

    if (fillCount > 14) {
      fillCount = 14;
    }

    if (fillCount > maxFill) {
      fillCount = maxFill;
    }

    let filler = new Array(fillCount).fill(1).map((_, i) => {
      return {
        loading: true,
        priceInEuro: null,
        departureDate: formatDate(
          this.addDaysToDate(departureDate, (i + 1) * dayModification),
          'yyyy-mm-dd'
        )[0]
      };
    });

    return dayModification === -1
      ? [filler.reverse(), fillCount]
      : [filler, fillCount];
  }

  getView(data, position) {
    if (position < 0) {
      let [filler, fillCount] = this.getFiller(
        ~position + 1,
        data[0].departureDate,
        -1
      );
      return [
        [...filler, ...(position > -14 ? data.slice(0, 14 + position) : [])],
        fillCount
      ];
    } else if (data.length < position + 14) {
      let [filler, fillCount] = this.getFiller(
        position + 14 - data.length,
        data[data.length - 1].departureDate,
        1
      );
      return [
        [...(position < data.length ? data.slice(position) : []), ...filler],
        fillCount
      ];
    }

    return [data.slice(position, 14 + position), 14, false];
  }

  render() {
    if (!this.state.data) {
      return null;
    }

    let view = this.state.view;
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
      } else if (!this.inDateRange(obj.departureDate)) {
        obj.className = styles.bar_notInRange;
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
              {
                duration,
                className,
                airport,
                loading,
                placeholder,
                price,
                priceTotal,
                priceInEuro,
                priceTotalInEuro,
                currency
              },
              i
            ) => {
              return placeholder ? (
                <Tooltip
                  classNameMessage={styles.tooltip}
                  key={i}
                  message={
                    <NoBreak>
                      Zu diesem Tag liegen uns leider keine Angebote vor.
                    </NoBreak>
                  }
                >
                  <div className={className} style={{ height: 31 }}>
                    <strong className={styles.price}>&nbsp;</strong>
                  </div>
                </Tooltip>
              ) : loading ? (
                <div key={i} className={styles.loading_wrapper}>
                  <div className={className}>
                    <Loading />
                  </div>
                </div>
              ) : (
                <Tooltip
                  classNameMessage={styles.tooltip}
                  key={i}
                  message={
                    <div>
                      <strong>
                        <NoBreak>
                          ab{' '}
                          <UniversalPrice
                            {...{
                              price,
                              priceTotal,
                              priceInEuro,
                              priceTotalInEuro,
                              currency
                            }}
                          />{' '}
                          p.P.
                        </NoBreak>
                      </strong>
                      <NoBreak>
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
                      <UniversalPrice
                        {...{
                          price,
                          priceTotal,
                          priceInEuro,
                          priceTotalInEuro,
                          currency
                        }}
                      />
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
            disabled={
              this.state.loading ||
              view[0].departureDate === this.formattedTomorrow
            }
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
                  format={
                    this.formattedTomorrow.substr(0, 4) !==
                    obj.departureDate.substr(0, 4)
                      ? 'wd dd.mm.yy'
                      : undefined
                  }
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
