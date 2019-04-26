```jsx
import mock from './mock.json';
<div style={{ maxWidth: '823px' }}>
  <ServiceBanner
    random={false}
    agents={mock.regions}
    step="regions"
    deviceType="phone"
  />
  <br />
  <br />
  <br />
  <ServiceBanner
    random={false}
    agents={mock.hotels}
    step="hotels"
    regionName="Mallorca"
    hotelName="Iberostar Paradiso"
    deviceType="phone"
  />
  <br />
  <br />
  <br />
  <ServiceBanner
    random={false}
    agents={mock.offers}
    step="offers"
    promotionCode="92829"
    hotelName="Iberostar Paradiso"
    deviceType="phone"
  />
</div>;
```
