import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import UniversalPrice, {
  usePriceTotal
} from '../../components/atoms/UniversalPrice/UniversalPrice';
import NoBreak from '../../components/utilities/NoBreak/NoBreak';
import cx from '../../utils/classnames';
import {
  formatDate,
  DateTime
} from '../../components/utilities/DateTime/DateTime';
import Loading from '../../components/atoms/Loading/Loading';
import styles from './PriceHistory.module.scss';
import { ArrowLeft, ArrowRight } from '../../components/atoms/Icon/Icon';
import Tooltip from '../../components/atoms/Tooltip/Tooltip';
import travelService from '../../utils/travelService';
import url from '../../utils/url';
import isActive from '../../utils/features';
import noop from '../../utils/noop';

const ONE_DAY_IN_MILLISECONDS = 86400000;

/**
 * maps the URL value of the duration to a usable array of numbers
 * first index: duration to use within inDateRange check
 * second index: duration to use for calculation of returnDate when requesting data form the API
 */
const durationMap = {
  '-1': 14,
  '6_7': 7,
  '6_14': 14,
  '6_3-7': 7,
  '6_7-14': 14,
  '10': 8,
  '7': 12,
  '6_10': 10
};

class PriceHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      /** complete pricechart data we hold - initial and further responses and possible placeholders */
      data: null,
      /** are we currently loading data from the API */
      loading: true,
      /** current position inside this.state.data from where we start the view */
      position: 0,
      view: [],
      /** for bar height transition */
      moved: true
    };

    this.oldHeights = {};

    // references for often used dates or timestamps
    this.today = formatDate(new Date(), 'yyyy-mm-dd')[0];
    this.tomorrow = new Date(this.today).getTime() + ONE_DAY_IN_MILLISECONDS;
    this.formattedTomorrow = formatDate(this.tomorrow, 'yyyy-mm-dd')[0];

    this.onClickPrev = this.onClickPrev.bind(this);
    this.onClickNext = this.onClickNext.bind(this);

    // params we need for the pricechart request
    this.params = {
      ...props.getParameters([
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
      ]),
      ...props.defaultParams
    };

    if (props.isFeatureActive('useAllBlockedOrganizerInIbe4', false)) {
      this.params.useAllBlockedOrganizer = 1;
    }

    if (props.isFeatureActive('blockOrganizerByTravelType', false)) {
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

    if (this.retDate && this.depDate) {
      this.retDateTimestamp = new Date(this.retDate).getTime();
      this.depDateTimestamp = new Date(this.depDate).getTime();
      this.diffOfDateRange =
        (this.retDateTimestamp - this.depDateTimestamp) /
        ONE_DAY_IN_MILLISECONDS;

      if (this.params.duration && this.params.duration === '6_91') {
        this.params.duration = '6_' + this.diffOfDateRange;
      }
    }

    this.addDaysToRetDate = 14; // 14 is the fallback when we can not determine a number from the duration

    if (this.params.duration) {
      if (durationMap[this.params.duration]) {
        this.addDaysToRetDate = durationMap[this.params.duration];
      } else if (
        this.params.duration &&
        this.params.duration.indexOf('6_') === 0
      ) {
        this.addDaysToRetDate = parseInt(this.params.duration.substr(2));
      }
    }
  }

  inDateRange({ returnDate, departureDate }) {
    return this.retDate >= returnDate && this.depDate <= departureDate;
  }

  componentDidMount() {
    let newDepartureDate = this.params.depDate;
    let newReturnDate = this.params.retDate;

    if (this.diffOfDateRange < 14) {
      let add = Math.ceil(
        (14 - (this.diffOfDateRange - this.addDaysToRetDate)) / 2
      );

      newDepartureDate = formatDate(
        this.addDaysToDate(this.depDate, -add),
        'dd.mm.yyyy'
      )[0];

      newReturnDate = formatDate(
        this.addDaysToDate(this.retDate, add),
        'dd.mm.yyyy'
      )[0];
    } else {
      // always add additional days to the first request
      newReturnDate = formatDate(
        this.addDaysToDate(this.retDate, this.addDaysToRetDate),
        'dd.mm.yyyy'
      )[0];
    }

    this.props.getPricesFromAPI.get(
      {
        endpoint: 'search-pricechart',
        parameters: {
          ...this.params,
          depDate: newDepartureDate,
          retDate: newReturnDate
        }
      },
      result => {
        if (
          result.success &&
          result.response &&
          result.response.items &&
          result.response.items.length
        ) {
          let items = result.response.items;
          let position = 0;

          this.fillMissingDates(items);

          let inRangeCount = 0;
          let inRangeStartIndex = null;
          let minPrice = Infinity;
          let minPriceIndex = 0;

          items.forEach((obj, i) => {
            if (this.inDateRange(obj)) {
              inRangeCount++;
              if (inRangeStartIndex === null) {
                inRangeStartIndex = i;
              }
              if (minPrice > obj.priceInEuro) {
                minPrice = obj.priceInEuro;
                minPriceIndex = i;
              }
            }
          });

          let before = Math.floor((14 - inRangeCount) / 2);

          // if we have less than 14 inrange bars
          if (before >= 0) {
            position = inRangeStartIndex - before;

            if (position < 0) {
              position = 0;
            }
          } else {
            position = minPriceIndex - 6;

            if (position < 6) {
              position = 0;
            } else if (items.length - 1 - position < 14) {
              position = items.length - 14;
            }
          }

          let [view, fillCount] = this.getView(items, position);

          this.setState(
            {
              data: items,
              loading: position > items.length - 14 || position < 0,
              position: position,
              view: view,
              fillCount: fillCount
            },
            () => {
              this.getData();
            }
          );
        }
      }
    );
  }

  addFillerElement(arr, index, newDepDate) {
    arr.splice(index, 0, {
      placeholder: true,
      priceInEuro: null,
      loading: true,
      departureDate: newDepDate
    });
  }

  fillMissingDates(items) {
    for (let i = 0; i < items.length - 1; i++) {
      let diff =
        (new Date(items[i + 1].departureDate) -
          new Date(items[i].departureDate)) /
        ONE_DAY_IN_MILLISECONDS;
      if (diff !== 1) {
        this.addFillerElement(
          items,
          i + 1,
          formatDate(
            this.addDaysToDate(items[i].departureDate, 1),
            'yyyy-mm-dd'
          )[0]
        );
      }
    }
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
          fillCount: fillCount,
          moved: true
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
    let result = {};
    let testSet = new Set();

    [...prevData, ...newData, ...oldView].forEach(function(obj) {
      if (testSet.has(obj.departureDate) && obj.priceInEuro === null) {
        return false;
      }

      if (obj.loading) {
        obj.placeholder = true;
      }

      result[obj.departureDate] = obj;
      testSet.add(obj.departureDate);
      return true;
    });

    return Object.values(result).sort(function(a, b) {
      if (a.departureDate > b.departureDate) return 1;
      if (a.departureDate < b.departureDate) return -1;
      return 0;
    });
  }

  getData() {
    if (this.state.loading) {
      let departureDate;
      let returnDate;

      this.state.view.forEach((item, i, arr) => {
        if (!departureDate && item.loading) {
          departureDate = formatDate(item.departureDate, 'dd.mm.yyyy')[0];
        } else if (departureDate && arr[i].loading) {
          returnDate = formatDate(
            this.addDaysToDate(item.departureDate, this.addDaysToRetDate),
            'dd.mm.yyyy'
          )[0];
        }
      });

      this.props.getPricesFromAPI.get(
        {
          endpoint: 'search-pricechart',
          parameters: {
            ...this.params,
            depDate: departureDate,
            retDate: returnDate
          }
        },
        result => {
          if (result.success && result.response && result.response.items) {
            this.fillMissingDates(result.response.items);

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
      const firstDate = departureDate;
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
        [...filler, ...(fillCount < 14 ? data.slice(0, 14 - fillCount) : [])],
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
    const { data, moved } = this.state;

    if (!data) {
      return null;
    }

    let view = this.state.view;
    const arr = view
      .map(obj => obj.priceInEuro)
      .filter(price => price !== null);
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const step = (max - min) / 100;

    const tempOldHeights = this.oldHeights;
    this.oldHeights = {};

    view = view.map(obj => {
      obj.cheapestInView = false;
      obj.inRange = false;

      const depDate = obj.departureDate;

      if (tempOldHeights[depDate]) {
        this.oldHeights[depDate] = tempOldHeights[depDate];
      }

      if (obj.loading) {
        obj.className = styles.bar_loading;
      } else if (obj.priceInEuro === min) {
        obj.className = styles.bar_cheapest;
        obj.cheapestInView = true;
        if (this.inDateRange(obj)) {
          obj.inRange = true;
        }
      } else if (!this.inDateRange(obj)) {
        obj.className = styles.bar_notInRange;
      } else {
        obj.className = styles.bar;
        obj.inRange = true;
      }

      return obj;
    });

    // trigger bar height transition
    if (moved) {
      setTimeout(() => {
        this.setState({ moved: false });
      }, 128);
    }

    return (
      <div className={styles.container}>
        <h2 className={cx('_styling-h2', styles.bold)}>Preisverlauf</h2>
        <div className={styles.chart}>
          {view.map(
            (
              {
                duration,
                className,
                loading,
                placeholder,
                price,
                priceTotal,
                priceInEuro,
                priceTotalInEuro,
                currency,
                departureDate
              },
              i,
              arr
            ) => {
              const newHeight = Math.floor(140 - (max - priceInEuro) / step);
              const renderResult = placeholder ? (
                <Tooltip
                  showArrow
                  classNameMessage={styles.tooltip}
                  key={departureDate}
                  message="Zu diesem Tag liegen uns leider keine Angebote vor."
                >
                  <div className={className} style={{ height: 31 }}>
                    <strong className={styles.price}>&nbsp;</strong>
                  </div>
                </Tooltip>
              ) : loading ? (
                <div key={departureDate} className={styles.loading_wrapper}>
                  <div className={className}>
                    <Loading />
                  </div>
                </div>
              ) : (
                <Tooltip
                  showArrow
                  onClick={event => {
                    event.persist();
                    this.props.onBarClick(event, arr[i]);
                  }}
                  classNameMessage={styles.tooltip}
                  key={departureDate}
                  message={
                    <div>
                      <NoBreak>
                        ab{' '}
                        <UniversalPrice
                          {...{
                            usePriceTotal: this.props.usePriceTotal,
                            price,
                            priceTotal,
                            priceInEuro,
                            priceTotalInEuro,
                            currency
                          }}
                        />
                        {this.props.usePriceTotal === false && ' p.P.'}
                      </NoBreak>
                      {`${duration} ${duration !== 1 ? 'Tage' : 'Tag'}`}
                    </div>
                  }
                >
                  <div
                    className={className}
                    style={{
                      height: moved
                        ? this.oldHeights[departureDate] || 31
                        : newHeight
                    }}
                  >
                    <strong className={styles.price}>
                      <UniversalPrice
                        {...{
                          usePriceTotal: this.props.usePriceTotal,
                          price,
                          priceTotal,
                          priceInEuro,
                          priceTotalInEuro,
                          currency
                        }}
                      />
                    </strong>
                    <div>
                      {`${duration} ${duration !== 1 ? 'Tage' : 'Tag'}`}
                    </div>
                  </div>
                </Tooltip>
              );

              this.oldHeights[departureDate] = placeholder ? 31 : newHeight;

              return renderResult;
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
            <ArrowLeft />
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
            <ArrowRight />
          </button>
        </div>
      </div>
    );
  }
}
PriceHistory.propTypes = {
  /** Function to run when user clicks a bar of the chart. It receives the object of that bar as second parameter */
  onBarClick: PropTypes.func,
  /** Function that must return a object of all the paramters and values you want to use for the travelservice request it takes a array of needed paramters as only parameter */
  getParameters: PropTypes.func,
  /** Function to check the availability of feautures on AIDU - must return a boolean */
  isFeatureActive: PropTypes.func,
  /** Performs the API request - will receive two parameters: first is a object of `{endpoint: string, parameters: object}` and e second parameter: callback that should run on complete of the request */
  getPricesFromAPI: PropTypes.shape({
    /**
     * { url:string, defaultParameters: object }
     * url: general url of the API endpoint in our case mobileapi.aidu.de/{endpoint}
     * defaultParameters: general parameters that do not change - e.g. agent
     */
    config: PropTypes.shape({
      url: PropTypes.string,
      defaultParameters: PropTypes.object
    }),
    get: PropTypes.func
  }),
  /** Wheter we should show total price or price per person */
  usePriceTotal: PropTypes.bool
};
PriceHistory.defaultProps = {
  onBarClick: noop,
  getParameters: url.getAll,
  isFeatureActive: isActive,
  getPricesFromAPI: travelService,
  usePriceTotal: usePriceTotal
};

export default PriceHistory;

export function renderPriceHistory(props, container, callback) {
  ReactDOM.render(<PriceHistory {...props} />, container, callback);
}
