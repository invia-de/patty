```jsx
import travelService from '../../utils/travelService';
import response from './mock.json';

{
  travelService.mock('search-pricechart', false, response, 600);
}

<PriceHistory
  defaultParams={{ depDate: '17.10.2019', retDate: '28.10.2019' }}
  onBarClick={(event, data) => console.log('Bar clicked', data)}
/>;
```

You can use `folded` to make the chart foldable and folded by default:

```jsx
<PriceHistory
  defaultParams={{ depDate: '17.10.2019', retDate: '28.10.2019' }}
  onBarClick={(event, data) => console.log('Bar clicked', data)}
  folded
/>
```
