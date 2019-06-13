```jsx
import travelService from '../../utils/travelService';
import response from './mock.json';

{
  travelService.mock('search-pricechart', false, response, 500, '');
}

<PriceHistory
  defaultParams={{ depDate: '17.10.2019', retDate: '28.10.2019' }}
/>;
```
