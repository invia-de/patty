import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { usePriceTotal } from '../../components/atoms/UniversalPrice/UniversalPrice';
import Price from '../../components/utilities/Price/Price';
import NoBreak from '../../components/utilities/NoBreak/NoBreak';
import {
  formatDate,
  DateTime
} from '../../components/utilities/DateTime/DateTime';
import Loading from '../../components/atoms/Loading/Loading';
import styles from './PriceHistory.module.scss';
import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  ArrowUp
} from '../../components/atoms/Icon/Icon';
import Tooltip from '../../components/atoms/Tooltip/Tooltip';
import travelService from '../../utils/travelService';
import cx from '../../utils/classnames';
import url from '../../utils/url';
import isActive from '../../utils/features';
import noop from '../../utils/noop';

import PriceHistoryIcon from './PriceHistoryIcon/PriceHistoryIcon';

const ONE_DAY_IN_MILLISECONDS = 86400000;
const MOBILE_BREAKPOINT = 768;

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
      /**  Whether any of the bars have been selected */
      isPristine: true,
      /** current position inside this.state.data from where we start the view */
      position: 0,
      view: [],
      /** for bar height transition */
      moved: true,
      isMobile: props.forceMobile || window.innerWidth <= MOBILE_BREAKPOINT,
      folded: props.folded,
      foldable: props.folded
    };

    this.oldHeights = {};

    // references for often used dates or timestamps
    this.today = formatDate(new Date(), 'yyyy-mm-dd')[0];
    this.tomorrow = new Date(this.today).getTime() + ONE_DAY_IN_MILLISECONDS;
    this.formattedTomorrow = formatDate(this.tomorrow, 'yyyy-mm-dd')[0];

    this.onClickPrev = this.onClickPrev.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);

    // params we need for the pricechart request
    this.params = {
      ...props.getParameters(
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
        props.defaultParams
      )
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

  getDaysBase() {
    const { isMobile } = this.state;
    return isMobile ? 7 : 14;
  }

  getCurrentDate() {
    const { view } = this.state;
    const days = this.getDaysBase();
    return view[Math.ceil(days / 2) - (days % 2)].departureDate;
  }

  getBarStyle() {
    const barsToDisplay = this.getDaysBase();
    return {
      width: `calc(100% / ${barsToDisplay})`,
      flex: `0 0 calc(100% / ${barsToDisplay})`
    };
  }

  getOriginalDateFrame() {
    let depDate = this.params.depDate;
    let retDate = this.params.retDate;

    if (this.diffOfDateRange < 14) {
      let add = Math.ceil(
        (14 - (this.diffOfDateRange - this.addDaysToRetDate)) / 2
      );

      depDate = formatDate(
        this.addDaysToDate(this.depDate, -add),
        'dd.mm.yyyy'
      )[0];

      retDate = formatDate(
        this.addDaysToDate(this.retDate, add),
        'dd.mm.yyyy'
      )[0];
    } else {
      // always add additional days to the first request
      retDate = formatDate(
        this.addDaysToDate(this.retDate, this.addDaysToRetDate),
        'dd.mm.yyyy'
      )[0];
    }

    return { depDate, retDate };
  }

  updateDimensions() {
    const { forceMobile } = this.props;
    this.setState({
      isMobile: forceMobile || window.innerWidth <= MOBILE_BREAKPOINT
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);

    this.props.getPricesFromAPI.get(
      {
        endpoint: 'search-pricechart',
        parameters: {
          ...this.params,
          ...this.getOriginalDateFrame()
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

          // if we have less than 14 in-range bars
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

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
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
      maxFill = (new Date(departureDate).getTime() - this.tomorrow) / 86400000;
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

    let view = this.state.view.slice(0, this.getDaysBase());
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
        {this.renderHeader()}
        {this.renderContent(view, max, step, moved)}
      </div>
    );
  }

  renderHeader() {
    const { isMobile, folded, foldable } = this.state;

    if (isMobile) {
      return <h2 className="_styling-h2">Preisverlauf</h2>;
    }

    return (
      <h2
        className={cx('_styling-h2', styles.clickable)}
        onClick={() => (foldable ? this.setState({ folded: !folded }) : null)}
      >
        <PriceHistoryIcon />
        <span>Preisverlauf{folded ? ' anzeigen' : ''}</span>
        {foldable ? folded ? <ArrowDown light /> : <ArrowUp light /> : null}
      </h2>
    );
  }

  renderContent(view, max, step, moved) {
    const { folded, foldable } = this.state;

    return folded && foldable ? null : (
      <>
        {this.renderDateHeader()}
        <div className={styles.chart}>
          {view.map(v => this.renderPriceBar(v, max, step, moved))}
        </div>
        {this.renderDateController(view)}
        {this.renderDateReset()}
      </>
    );
  }

  renderDateHeader() {
    const { isMobile } = this.state;

    return isMobile ? (
      <h3 className={styles.dateHeader}>
        {formatDate(this.getCurrentDate(), 'MMMM yyyy')[0]}
      </h3>
    ) : null;
  }

  renderDateController(view) {
    const { isMobile } = this.state;

    return (
      <div className={styles.axisContainer}>
        <button
          disabled={
            this.state.loading ||
            view[0].departureDate === this.formattedTomorrow
          }
          className={styles.button}
          onClick={this.onClickPrev}
        >
          <ArrowLeft light={isMobile} />
        </button>
        <div className={styles.axis}>
          {view.map(obj => {
            return (
              <DateTime
                className={styles.label}
                value={obj.departureDate}
                format={isMobile ? 'dd wd.' : 'wd dd.mm.'}
                style={this.getBarStyle()}
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
          <ArrowRight light={isMobile} />
        </button>
      </div>
    );
  }

  renderPriceBar(barData, max, step, moved) {
    const {
      duration,
      className,
      loading,
      placeholder,
      price,
      priceTotal,
      priceInEuro,
      currency,
      departureDate
    } = barData;
    if (loading && !placeholder) {
      return this.renderLoadingBar(departureDate, className);
    }

    const newHeight = Math.floor(140 - (max - priceInEuro) / step);

    const tooltipMessage = placeholder ? (
      'Zu diesem Tag liegen uns leider keine Angebote vor.'
    ) : (
      <NoBreak>
        <NoBreak>
          ab{' '}
          <Price
            value={this.props.usePriceTotal ? priceTotal : price}
            currency={currency}
          />
          {this.props.usePriceTotal === false && ' p.P.'}
        </NoBreak>
        {`${duration} ${duration !== 1 ? 'Tage' : 'Tag'}`}
      </NoBreak>
    );

    const priceBar = placeholder ? (
      <div className={className} style={{ height: 31 }}>
        <strong className={styles.price}>&nbsp;</strong>
      </div>
    ) : (
      this.renderPriceBarBase(barData, moved, newHeight)
    );

    this.oldHeights[departureDate] = placeholder ? 31 : newHeight;

    return (
      <Tooltip
        showArrow
        classNameMessage={styles.tooltip}
        key={departureDate}
        message={tooltipMessage}
        style={this.getBarStyle()}
        onClick={
          placeholder
            ? noop
            : event => {
                event.persist();
                this.setState({ isPristine: false });
                this.props.onBarClick(event, barData);
              }
        }
      >
        {priceBar}
      </Tooltip>
    );
  }

  renderPriceBarBase(
    { duration, className, price, priceTotal, currency, departureDate },
    moved,
    newHeight
  ) {
    const { isMobile } = this.state;

    const bar = (
      <div
        className={className}
        style={{
          height: moved ? this.oldHeights[departureDate] || 31 : newHeight
        }}
      >
        {!isMobile && (
          <strong className={styles.price}>
            <Price
              value={this.props.usePriceTotal ? priceTotal : price}
              currency={currency}
            />
          </strong>
        )}
        {!isMobile && (
          <div>{`${duration} ${duration !== 1 ? 'Tage' : 'Tag'}`}</div>
        )}
      </div>
    );

    return isMobile ? (
      <div className={styles.mobileBarWrapper}>
        <strong className={styles.price}>
          <Price
            value={this.props.usePriceTotal ? priceTotal : price}
            currency={currency}
          />
        </strong>
        {bar}
      </div>
    ) : (
      bar
    );
  }

  renderLoadingBar(departureDate, className) {
    return (
      <div
        key={departureDate}
        className={styles.loading_wrapper}
        style={this.getBarStyle()}
      >
        <div className={className}>
          <Loading />
        </div>
      </div>
    );
  }

  renderDateReset() {
    const { onBarClick } = this.props;
    const { isMobile, isPristine } = this.state;
    const { duration } = this.params;

    if (!isMobile || isPristine) {
      return null;
    }

    return (
      <div
        className={styles.dateReset}
        onClick={event => {
          this.setState({ isPristine: true });
          onBarClick(event, {
            departureDate: this.depDate,
            returnDate: this.retDate,
            duration: duration || 14
          });
        }}
      >
        Hinreise&nbsp;
        <DateTime value={this.depDate} />
        &nbsp;
        <strong>zurücksetzen</strong>
      </div>
    );
  }
}
PriceHistory.propTypes = {
  /** Function to run when user clicks a bar of the chart. It receives the object of that bar as second parameter */
  onBarClick: PropTypes.func,
  /** Function that must return a object of all the paramters and values you want to use for the travelservice request it takes a array of needed paramters as only parameter */
  getParameters: PropTypes.func,
  /** Function to check the availability of features on AIDU - must return a boolean */
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
    get: PropTypes.func,
    /* Forces mobile view of the */
    forceMobile: PropTypes.bool
  }),
  /** Whether we should show total price or price per person */
  usePriceTotal: PropTypes.bool,
  /** folded makes the price chart foldable AND folded by default. Ignored on mobile */
  folded: PropTypes.bool
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
